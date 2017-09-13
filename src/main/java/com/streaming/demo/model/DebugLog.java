package com.streaming.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DebugLog {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String message;

	public DebugLog() {}
	
	public DebugLog(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}	
	
}
