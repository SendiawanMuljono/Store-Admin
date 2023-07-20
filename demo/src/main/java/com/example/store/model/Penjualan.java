package com.example.store.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "penjualan")
public class Penjualan implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sales_id", referencedColumnName = "id")
	@JsonIgnoreProperties({"hibernateLazyInitializer"})
    private Sales sales;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kota_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    private Kota kota;
    
    private Integer penghasilan;
    
    private Integer jumlahBarang;
    
    private Date tanggalPenjualan;
    
    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Sales getSales() {
		return sales;
	}

	public void setSales(Sales sales) {
		this.sales = sales;
	}

	public Kota getKota() {
		return kota;
	}

	public void setKota(Kota kota) {
		this.kota = kota;
	}

	public Integer getPenghasilan() {
		return penghasilan;
	}

	public void setPenghasilan(Integer penghasilan) {
		this.penghasilan = penghasilan;
	}

	public Integer getJumlahBarang() {
		return jumlahBarang;
	}

	public void setJumlahBarang(Integer jumlahBarang) {
		this.jumlahBarang = jumlahBarang;
	}

	public Date getTanggalPenjualan() {
		return tanggalPenjualan;
	}

	public void setTanggalPenjualan(Date tanggalPenjualan) {
		this.tanggalPenjualan = tanggalPenjualan;
	}

}






