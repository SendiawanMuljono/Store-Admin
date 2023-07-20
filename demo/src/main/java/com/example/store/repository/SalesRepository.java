package com.example.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.store.model.Sales;

@Repository
public interface SalesRepository extends JpaRepository<Sales, String> {
	Sales findByEmail(String email);
	Sales findByTelepon(String telepon);
}