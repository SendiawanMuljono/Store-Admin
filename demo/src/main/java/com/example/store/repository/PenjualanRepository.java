package com.example.store.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.store.model.Kota;
import com.example.store.model.Penjualan;
import com.example.store.model.Sales;

@Repository
public interface PenjualanRepository extends JpaRepository<Penjualan, String> {
	Penjualan findBySalesAndKotaAndTanggalPenjualan(Sales sales, Kota kota, Date tanggalPenjualan);
}