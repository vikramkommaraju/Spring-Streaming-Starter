"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
var stompClient = null;
	
const server = "/events-streaming";
const channel = "/app/messages";

var ConnectionService = {

	connect : function(callback) {

		var socket = new SockJS(server);
		stompClient = Stomp.over(socket);
		
	    stompClient.connect({}, callback);
	},

	disconnect : function() {
		if (stompClient !== null) {
	        stompClient.disconnect();
	    }
	},

	send : function(msg, callback) {
		var message = '{"command" : "'+msg+'"}';
		stompClient.send(channel, {}, message);
	},

	register : function(topic, callback) {
		stompClient.subscribe(topic, callback);
	}



};

module.exports = ConnectionService;