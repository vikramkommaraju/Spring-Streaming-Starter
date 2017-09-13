package com.streaming.demo.component;

import java.util.Date;

public class QueryAlert__C {

	private double rowsProcessed;
	private String queriedEntity;
	private String queryDate;
	private String userName;

	private QueryAlert__C(QueryAlertBuilder builder) {
		this.rowsProcessed = builder.rowsProcessed;
		this.queriedEntity = builder.queriedEntity;
		this.queryDate = builder.queryDate;
		this.userName = builder.userName;
	}
	
	public double getRowsProcessed() {
		return rowsProcessed;
	}


	public String getQueriedEntity() {
		return queriedEntity;
	}


	public String getQueryDate() {
		return queryDate;
	}


	public String getUserName() {
		return userName;
	}

	public static class QueryAlertBuilder {
		private double rowsProcessed;
		private String queriedEntity;
		private String queryDate;
		private String userName;
		
		private QueryAlertBuilder() {}
		
		public static QueryAlertBuilder newBuilder() {
			return new QueryAlertBuilder();
		}
		
		public QueryAlertBuilder rowsProcessed(double rowsProcessed) {
			this.rowsProcessed = rowsProcessed;
			return this;
		}
		
		public QueryAlertBuilder queriedEntity(String queriedEntity) {
			this.queriedEntity = queriedEntity;
			return this;
		}
		
		public QueryAlertBuilder queryDate(String queryDate) {
			this.queryDate = queryDate;
			return this;
		}
		
		public QueryAlertBuilder userName(String userName) {
			this.userName = userName;
			return this;
		}
		
		public QueryAlert__C build() {
			return new QueryAlert__C(this);
		}
		
	}
}
