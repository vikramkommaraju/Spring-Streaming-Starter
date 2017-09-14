package com.streaming.demo.component;

public class SubscribeMessageResponse {

    private String content;
    private String type = "Subscription";

    public SubscribeMessageResponse() {
    }

    public SubscribeMessageResponse(String content) {
    		this.content = content;
    }

    public String getContent() {
        return content;
    }

	public String getType() {
		return type;
	}
    
    

}
