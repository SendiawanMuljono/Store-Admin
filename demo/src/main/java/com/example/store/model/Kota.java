package com.example.store.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "kota")
public class Kota implements Serializable{
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

	@Column(name = "nama")
    private String nama;
    
    @Column(name = "kode_pos")
    private String kodePos;
    
    @Column(name = "provinsi")
    private String provinsi;
    
    public String getId() {
    	return id;
    }
    
    public void setId(String id) {
    	this.id = id;
    }
    
    public String getNama() {
    	return nama;
    }
    
    public void setNama(String nama) {
    	this.nama = nama;
    }
    
    public String getKodePos() {
    	return kodePos;
    }
    
    public void setKodePos(String kodePos) {
    	this.kodePos = kodePos;
    }
    
    public String getProvinsi() {
    	return provinsi;
    }
    
    public void setProvinsi(String provinsi) {
    	this.provinsi = provinsi;
    }
}