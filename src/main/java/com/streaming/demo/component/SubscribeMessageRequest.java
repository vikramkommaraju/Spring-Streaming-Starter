package com.streaming.demo.component;

import org.springframework.stereotype.Component;

@Component
public class SubscribeMessageRequest {

	private String command;

    public SubscribeMessageRequest() {
    }

    public SubscribeMessageRequest(String command) {
        this.command = command;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }
	
	
}
