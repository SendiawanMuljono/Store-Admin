package com.example.store.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import com.example.store.model.ResponseHandler;
import com.example.store.model.ResponseHandlerPagination;
import com.example.store.repository.KotaRepository;

@RestController
@RequestMapping("/kota")
@CrossOrigin(origins = "http://localhost:3000")
public class KotaController {
	
    private final KotaRepository kotaRepository;

    public KotaController(KotaRepository kotaRepository) {
        this.kotaRepository = kotaRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseHandler> getAllKota(@RequestParam(defaultValue = "0") Integer page,
                                                       @RequestParam(defaultValue = "10") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Kota> kotaPage = kotaRepository.findAll(pageable);
        List<Kota> kotaList = kotaPage.getContent();

        ResponseHandler responseHandlerPagination = response("Success", kotaList, Optional.of(kotaPage.getTotalElements()), Optional.of(kotaPage.getTotalPages()));

        return ResponseEntity.ok(responseHandlerPagination);
    }
    
    @GetMapping("/allWithoutPagination")
    public ResponseEntity<ResponseHandler> getAllKotaWithoutPagination() {
        List<Kota> kotaList = kotaRepository.findAll();

        ResponseHandler responseHandler = response("Success", kotaList, Optional.empty(), Optional.empty());

        return ResponseEntity.ok(responseHandler);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseHandler> getKotaById(@PathVariable String id){
    	Optional<Kota> kota = kotaRepository.findById(id);
    	if(kota.isEmpty()) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response("Failed", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    	}
    	return ResponseEntity.ok(response("Success", List.of(kota.get()), Optional.empty(), Optional.empty()));
    }
    
    @PostMapping("/add")
    public ResponseEntity<ResponseHandler> addKota(@RequestBody Kota kota){
    	Kota createdKota = kotaRepository.save(kota);
    	return ResponseEntity.status(HttpStatus.CREATED).body(response("Success", List.of(createdKota), Optional.empty(), Optional.empty()));
    }
    
    @PostMapping("/update/{id}")
    public ResponseEntity<ResponseHandler> updateKota(@PathVariable String id, @RequestBody Kota updatedKota) {
        Optional<Kota> existingKota = kotaRepository.findById(id);
        
        if (existingKota.isEmpty()) {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response("Failed", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
        }
        
        Kota kotaToUpdate = existingKota.get();
        
        kotaToUpdate.setNama(updatedKota.getNama());
        kotaToUpdate.setKodePos(updatedKota.getKodePos());
        kotaToUpdate.setProvinsi(updatedKota.getProvinsi());

        Kota updatedKotaEntity = kotaRepository.save(kotaToUpdate);
        return ResponseEntity.ok(response("Success", List.of(updatedKotaEntity), Optional.empty(), Optional.empty()));
    }
    
    @PostMapping("/delete/{id}")
    public ResponseEntity<ResponseHandler> deleteKota(@PathVariable String id) {
        Optional<Kota> existingKota = kotaRepository.findById(id);
        
        if (existingKota.isEmpty()) {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response("Failed", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
        }
        
        kotaRepository.delete(existingKota.get());
        
        return ResponseEntity.ok(response("Success", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    }
    
    @GetMapping("/checkUnique")
    public ResponseEntity<ResponseHandler> checkUnique(@RequestParam Optional<String> kodePos) {
    	if(!kodePos.isEmpty()) {
    		String kodePosValue = kodePos.orElse("");
    		Kota kotaByKodePos = kotaRepository.findByKodePos(kodePosValue);

    		if (kotaByKodePos == null) {
    			return ResponseEntity.ok(response("Success", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    		}
    		else {
    			return ResponseEntity.ok(response("Success", List.of(kotaByKodePos), Optional.empty(), Optional.empty()));    			
    		}
    	}

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response("Failed", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    }
    
    public ResponseHandler response(String message, List<?> data, Optional<Long> totalElements, Optional<Integer> totalPages) {
    	if(totalElements.isPresent() && totalPages.isPresent()) {
    		return new ResponseHandlerPagination(message, data, totalElements.orElse(null), totalPages.orElse(null));
    	}
    	return new ResponseHandler(message, data);
    }
}