package com.streaming.demo.component;

public class WebSocketMessageResponse {

    private String content;
    
    public WebSocketMessageResponse() {
    }

    public WebSocketMessageResponse(String content) {
    		this.content = content;
    }

    public String getContent() {
        return content;
    }
    

}
