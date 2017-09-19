package com.streaming.demo.component;

import org.springframework.stereotype.Component;

@Component
public class WebSocketMessageRequest {

	private String command;

    public WebSocketMessageRequest() {
    }

    public WebSocketMessageRequest(String command) {
        this.command = command;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }
	
	
}
