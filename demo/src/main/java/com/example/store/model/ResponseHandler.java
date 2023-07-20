package com.example.store.model;

import java.util.List;

public class ResponseHandler {
	private String message;
	private List<?> data;
	
	public ResponseHandler(String message, List<?> data) {
		this.message = message;
		this.data = data;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public List<?> getData() {
		return data;
	}
	
	public void setData(List<?> data) {
		this.data = data;
	}
	
}
