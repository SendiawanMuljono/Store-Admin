package com.example.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.store.model.Kota;

@Repository
public interface KotaRepository extends JpaRepository<Kota, String> {
	Kota findByKodePos(String kodePos);
}