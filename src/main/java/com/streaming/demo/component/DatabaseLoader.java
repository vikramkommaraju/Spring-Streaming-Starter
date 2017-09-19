package com.streaming.demo.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.streaming.demo.model.ApiEventEntity;
import com.streaming.demo.repository.ApiEventRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final ApiEventRepository repository;
	
	@Autowired
	public DatabaseLoader(ApiEventRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new ApiEventEntity("1234", "time", "Account", "22", true, false));
		this.repository.save(new ApiEventEntity("23456", "aas", "Contact", "14", true, false));
		this.repository.save(new ApiEventEntity("aasa1", "1212", "Report", "116", true, true));
		this.repository.save(new ApiEventEntity("8787a", "ti343434me", "Lead", "88", true, true));
		
	}
}
