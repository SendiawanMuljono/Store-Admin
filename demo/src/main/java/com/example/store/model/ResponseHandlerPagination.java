package com.example.store.model;

import java.util.List;

public class ResponseHandlerPagination extends ResponseHandler{
	private Long totalElements;
	private Integer totalPages;
	
	public ResponseHandlerPagination(String message, List<?> data, Long totalElements, Integer totalPages) {
		super(message, data);
		this.totalElements = totalElements;
		this.totalPages = totalPages;
	}

	public Long getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(Long totalElements) {
		this.totalElements = totalElements;
	}

	public Integer getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(Integer totalPages) {
		this.totalPages = totalPages;
	}

}
