package com.streaming.demo.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ApiEventEntity {

	@Id
	private String eventIdentifier;
	
	private String timeStamp;
	private String entityName;
	private String rowsProcessed;
	private boolean isQueryAlert;
	private boolean isAnomaly;
	
	public ApiEventEntity() {}
	
	public ApiEventEntity(String eventIdentifier, String timeStamp, String entityName, String rowsProcessed, boolean isQueryAlert, boolean isAnomaly) {
		this.eventIdentifier = eventIdentifier;
		this.timeStamp = timeStamp;
		this.entityName = entityName;
		this.rowsProcessed = rowsProcessed;
		this.isQueryAlert = isQueryAlert;
		this.isAnomaly = isAnomaly;
	}
	
	public String getEventIdentifier() {
		return eventIdentifier;
	}
	public void setEventIdentifier(String eventIdentifier) {
		this.eventIdentifier = eventIdentifier;
	}
	public String getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}
	public String getEntityName() {
		return entityName;
	}
	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}
	public String getRowsProcessed() {
		return rowsProcessed;
	}
	public void setRowsProcessed(String rowsProcessed) {
		this.rowsProcessed = rowsProcessed;
	}
	public boolean isQueryAlert() {
		return isQueryAlert;
	}
	public void setQueryAlert(boolean isQueryAlert) {
		this.isQueryAlert = isQueryAlert;
	}
	public boolean isAnomaly() {
		return isAnomaly;
	}
	public void setAnomaly(boolean isAnomaly) {
		this.isAnomaly = isAnomaly;
	}
	
}
