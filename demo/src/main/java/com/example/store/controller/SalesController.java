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

import com.example.store.model.ResponseHandler;
import com.example.store.model.ResponseHandlerPagination;
import com.example.store.model.Sales;
import com.example.store.repository.SalesRepository;

@RestController
@RequestMapping("/sales")
@CrossOrigin(origins = "http://localhost:3000")
public class SalesController {
	
    private final SalesRepository salesRepository;

    public SalesController(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseHandler> getAllSales(@RequestParam(defaultValue = "0") Integer page,
                                                       @RequestParam(defaultValue = "10") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Sales> salesPage = salesRepository.findAll(pageable);
        List<Sales> salesList = salesPage.getContent();

        ResponseHandler responseHandlerPagination = response("Success", salesList, Optional.of(salesPage.getTotalElements()), Optional.of(salesPage.getTotalPages()));

        return ResponseEntity.ok(responseHandlerPagination);
    }
    
    @GetMapping("/allWithoutPagination")
    public ResponseEntity<ResponseHandler> getAllSalesWithoutPagination() {
        List<Sales> salesList = salesRepository.findAll();

        ResponseHandler responseHandler = response("Success", salesList, Optional.empty(), Optional.empty());

        return ResponseEntity.ok(responseHandler);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseHandler> getSalesById(@PathVariable String id){
    	Optional<Sales> sales = salesRepository.findById(id);
    	if(sales.isEmpty()) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response("Failed", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    	}
    	return ResponseEntity.ok(response("Success", List.of(sales.get()), Optional.empty(), Optional.empty()));
    }
    
    @PostMapping("/add")
    public ResponseEntity<ResponseHandler> addSales(@RequestBody Sales sales){
    	Sales createdSales = salesRepository.save(sales);
    	return ResponseEntity.status(HttpStatus.CREATED).body(response("Success", List.of(createdSales), Optional.empty(), Optional.empty()));
    }
    
    @PostMapping("/update/{id}")
    public ResponseEntity<ResponseHandler> updateSales(@PathVariable String id, @RequestBody Sales updatedSales) {
        Optional<Sales> existingSales = salesRepository.findById(id);
        
        if (existingSales.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response("Failed", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
        }
        
        Sales salesToUpdate = existingSales.get();
        
        salesToUpdate.setNama(updatedSales.getNama());
        salesToUpdate.setGrup(updatedSales.getGrup());
        salesToUpdate.setEmail(updatedSales.getEmail());
        salesToUpdate.setTelepon(updatedSales.getTelepon());

        Sales updatedSalesEntity = salesRepository.save(salesToUpdate);
        return ResponseEntity.ok(response("Success", List.of(updatedSalesEntity), Optional.empty(), Optional.empty()));
    }
    
    @PostMapping("/delete/{id}")
    public ResponseEntity<ResponseHandler> deleteSales(@PathVariable String id) {
        Optional<Sales> existingSales = salesRepository.findById(id);
        
        if (existingSales.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response("Failed", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
        }
        
        salesRepository.delete(existingSales.get());
        
        return ResponseEntity.ok(response("Success", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    }
    
    @GetMapping("/checkUnique")
    public ResponseEntity<ResponseHandler> checkUnique(@RequestParam Optional<String> email, @RequestParam Optional<String> telepon) {
    	if(!email.isEmpty()) {
    		String emailValue = email.orElse("");
    		Sales salesByEmail = salesRepository.findByEmail(emailValue);
    		
    		if (salesByEmail == null) {
    			return ResponseEntity.ok(response("Success", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    		}
    		else {
    			return ResponseEntity.ok(response("Success", List.of(salesByEmail), Optional.empty(), Optional.empty()));    			
    		}
    	}
    	else if(!telepon.isEmpty()) {
    		String teleponValue = telepon.orElse("");
    		Sales salesByTelepon = salesRepository.findByTelepon(teleponValue);
    		
    		if (salesByTelepon == null) {
    			return ResponseEntity.ok(response("Success", Collections.EMPTY_LIST, Optional.empty(), Optional.empty()));
    		}
    		else {
    			return ResponseEntity.ok(response("Success", List.of(salesByTelepon), Optional.empty(), Optional.empty()));
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