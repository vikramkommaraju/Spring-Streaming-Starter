package com.streaming.demo.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.streaming.demo.model.DebugLog;
import com.streaming.demo.repository.DebugLogRepository;

@Service
public class DebugLogger {

	@Autowired
	DebugLogRepository repository;
	
	public void log(String message) {
		repository.save(new DebugLog(message));
	}
}
