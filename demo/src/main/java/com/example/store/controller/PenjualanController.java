package com.example.store.controller;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.store.model.Kota;
import com.example.store.model.Penjualan;
import com.example.store.model.ResponseHandler;
import com.example.store.model.ResponseHandlerPagination;
import com.example.store.model.Sales;
import com.example.store.repository.KotaRepository;
import com.example.store.repository.PenjualanRepository;
import com.example.store.repository.SalesRepository;

@RestController
@RequestMapping("/penjualan")
@CrossOrigin(origins = "http://localhost:3000")
public class PenjualanController {
	
    private final PenjualanRepository penjualanRepository;
    private final SalesRepository salesRepository;
    private final KotaRepository kotaRepository;

    
    public PenjualanController(PenjualanRepository penjualanRepository, SalesRepository salesRepository, KotaRepository kotaRepository) {
		this.penjualanRepository = penjualanRepository;
		this.salesRepository = salesRepository;
		this.kotaRepository = kotaRepository;
	}

    @GetMapping("/all")
    public ResponseEntity<ResponseHandler> getAllPenjualan(@RequestParam(defaultValue = "0") Integer page,
                                                       @RequestParam(defaultValue = "10") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Penjualan> penjualanPage = penjualanRepository.findAll(pageable);
        List<Penjualan> penjualanList = penjualanPage.getContent();

        ResponseHandler responseHandlerPagination = response("Success", penjualanList, Optional.of(penjualanPage.getTotalElements()), Optional.of(penjualanPage.getTotalPages()));

        return ResponseEntity.ok(responseHandlerPagination);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseHandler> getPenjualanById(@PathVariable String id){
    	Optional<Penjualan> penjualan = penjualanRepository.findById(id);
    	if(penjualan.isEmpty()) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response("Failed", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    	}
    	return ResponseEntity.ok(response("Success", List.of(penjualan.get()), Optional.empty(), Optional.empty()));
    }
    
    @PostMapping("/add")
    public ResponseEntity<ResponseHandler> addPenjualan(@RequestBody Penjualan penjualan){
    	Penjualan createdPenjualan = penjualanRepository.save(penjualan);
    	return ResponseEntity.status(HttpStatus.CREATED).body(response("Success", List.of(createdPenjualan), Optional.empty(), Optional.empty()));
    }
    
    @PostMapping("/update/{id}")
    public ResponseEntity<ResponseHandler> updatePenjualan(@PathVariable String id, @RequestBody Penjualan updatedPenjualan) {
        Optional<Penjualan> existingPenjualan = penjualanRepository.findById(id);
        
        if (existingPenjualan.isEmpty()) {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response("Failed", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
        }
        
        Penjualan penjualanToUpdate = existingPenjualan.get();
        
        penjualanToUpdate.setSales(updatedPenjualan.getSales());
        penjualanToUpdate.setKota(updatedPenjualan.getKota());
        penjualanToUpdate.setPenghasilan(updatedPenjualan.getPenghasilan());
        penjualanToUpdate.setJumlahBarang(updatedPenjualan.getJumlahBarang());
        penjualanToUpdate.setTanggalPenjualan(updatedPenjualan.getTanggalPenjualan());

        Penjualan updatedPenjualanEntity = penjualanRepository.save(penjualanToUpdate);
        return ResponseEntity.ok(response("Success", List.of(updatedPenjualanEntity), Optional.empty(), Optional.empty()));
    }
    
    @PostMapping("/delete/{id}")
    public ResponseEntity<ResponseHandler> deletePenjualan(@PathVariable String id) {
        Optional<Penjualan> existingPenjualan = penjualanRepository.findById(id);
        
        if (existingPenjualan.isEmpty()) {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response("Failed", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
        }
        
        penjualanRepository.delete(existingPenjualan.get());
        
        return ResponseEntity.ok(response("Success", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    }
    
    @GetMapping("/checkUnique")
    public ResponseEntity<ResponseHandler> checkUnique(@RequestParam String salesId, @RequestParam String kotaId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date tanggalPenjualan) {
        Sales sales = salesRepository.findById(salesId).orElse(null);
        Kota kota = kotaRepository.findById(kotaId).orElse(null);
    	Penjualan penjualanBySalesKotaTanggal = penjualanRepository.findBySalesAndKotaAndTanggalPenjualan(sales, kota, tanggalPenjualan);
    	
    	if (penjualanBySalesKotaTanggal == null) {
    		return ResponseEntity.ok(response("Success", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    	}
    	else {
    		return ResponseEntity.ok(response("Success", List.of(penjualanBySalesKotaTanggal), Optional.empty(), Optional.empty()));    			
    	}
    }

    public ResponseHandler response(String message, List<?> data, Optional<Long> totalElements, Optional<Integer> totalPages) {
    	if(totalElements.isPresent() && totalPages.isPresent()) {
    		return new ResponseHandlerPagination(message, data, totalElements.orElse(null), totalPages.orElse(null));
    	}
    	return new ResponseHandler(message, data);
    }
}
