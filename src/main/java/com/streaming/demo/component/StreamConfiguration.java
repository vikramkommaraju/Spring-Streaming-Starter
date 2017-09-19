package com.streaming.demo.component;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StreamConfiguration {
	
	@Value("${username}") 
	private String userName;
	
	@Value("${password}") 
	private String password;
	
	@Value("${apiVersion}") 
	private String apiVersion;
	
	@Value("${serverUrl}") 
	private String serverUrl;
	
	@Value("${clientKey}") 
	private String clientKey;
	
	@Value("${clientSecret}") 
	private String clientSecret;
	
	@Value("${topic}") 
	private String topic;
	

	public String getUserName() {
		return userName;
	}

	public String getPassword() {
		return password;
	}

	public String getApiVersion() {
		return apiVersion;
	}

	public String getServerUrl() {
		return serverUrl;
	}

	public String getClientKey() {
		return clientKey;
	}

	public String getClientSecret() {
		return clientSecret;
	}

	public String getTopic() {
		return topic;
	}

	@Override
	public String toString() {
		return "StreamConfiguration [userName=" + userName + ", password=" + password + ", apiVersion=" + apiVersion
				+ ", serverUrl=" + serverUrl + ", clientKey=" + clientKey + ", clientSecret=" + clientSecret
				+ ", topic=" + topic + "]";
	}
	
}
