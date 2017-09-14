package com.streaming.demo.component;

import org.springframework.stereotype.Component;

@Component
public class EventNotificationMessage {

	private String entityName;
	private int rowsProcessed;
	private String type = "Notification";
	
	public EventNotificationMessage() {}
	
	public EventNotificationMessage(String entityName, int rowsProcessed) {
		this.entityName = entityName;
		this.rowsProcessed = rowsProcessed;
	}

	public String getEntityName() {
		return entityName;
	}

	public int getRowsProcessed() {
		return rowsProcessed;
	}

	public String getType() {
		return type;
	}
	
}
