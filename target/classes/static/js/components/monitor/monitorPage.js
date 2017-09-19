"use strict";

var React = require('react');
var Dashboard = require('./dashboard');
var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
var NotifService = require('./notifService');
var stompClient = null;
var entityData = {"Account" : 0, "Lead" : 0, "Contact" : 0, "Opportunity" : 0, "Report" : 0};
var barColors = [ "#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"];			
var labels = ['Account', 'Lead', 'Contact', 'Opportunity', 'Report'];


const StatsBoard = (props) => {

	return(
			<div>
				<h2><span className="label label-default">Account</span>   <span className="badge">5</span></h2>
				<h2><span className="label label-default">Lead</span>  <span className="badge">10</span></h2>
				<h2><span className="label label-default">Contact</span>  <span className="badge">25</span></h2>
				<h2><span className="label label-default">Opportunity</span>  <span className="badge">3</span></h2>
				<h2><span className="label label-default">Report</span>  <span className="badge">12</span></h2>
				
			</div>
		);
}

const ConnectionButton = (props) => {
	let button;
	  
	  switch(props.isConnected) {
	  	case true:
	    button = 
	    	<button className="btn btn-lg btn-warning" role="button" onClick={() => props.disconnectFromServer()}>Disconnect</button>
	    break;
	    
	  	default:
	    	button = 
		    	<button className="btn btn-lg btn-success" disabled={props.status == 'Subscribing to channel...'} role="button" onClick={() => props.connectToServer()}>Subscribe</button>
	    break;
	    
	  }
	return (<div>{button}</div>);
};

const ConnectionStatus = (props) => {
	return (
			<div><p className="lead">Connection status: {props.status}</p></div>
			);
	
};

var Monitor = React.createClass({
	getInitialState: function() {
		return {
			isConnected: false,
			connectionStatus: "Disconnected",
			chartData: { labels: labels, datasets: [{ data: Object.values(entityData), backgroundColor: barColors,  }]  } 
		};

	},
	
	componentDidMount: function() {
		this.setState({isConnected: false, connectionStatus: "Disconnected"});
	},
	
	sendSubscribeMessage : function(message) {
		console.log('Sending message...');
		stompClient.send("/app/connect", {}, '{"command" : "'+message+'"}');
	},
	
	handleConnect : function() {
		console.log('Connecting to server...');
		var self=this;
		self.setState({connectionStatus: "Connecting..."});
		var socket = new SockJS('/gs-guide-websocket');
		stompClient = Stomp.over(socket);
		
	    stompClient.connect({}, function (frame) {
	        console.log('Connected: ' + frame);
	        self.setState({connectionStatus: "Connected"});
			self.setState({connectionStatus: "Subscribing to channel..."});
	        stompClient.send("/app/connect", {}, '{"command" : "subscribe"}');
	        stompClient.subscribe('/topic/responses', self.processConnectResponse);	        
	    });
	},
	
	handleDisconnect : function() {
	    
	    this.setState({connectionStatus: "Un-Subscribing from /event/ApiEventStream ..."});
	    this.sendSubscribeMessage("unsubscribe");
	       
	},
	
	connectToServer: function() {
		console.log('Connecting!');
		if(this.state.isConnected) {
			console.log('Already connected to server!');
			return;
		}
		
		this.handleConnect();
	},
	
	disconnectFromServer: function() {
		console.log('Disconnecting!');
		if(!this.state.isConnected) {
			console.log('Already disconnected from server!');
			return;
		}
		
		
		this.handleDisconnect();
		
	},
	
	processSubscription : function(result) {

		if(result == "subscribe-success") {
			this.setState({connectionStatus: "Subscribed to /event/ApiEventStream",  isConnected: true});
		} else {
			this.setState({isConnected: false});
		} 
		
		if(result == "subscribe-failed") {
			this.setState({connectionStatus: "Subscribe Failed"});
		}
		
		if(result == "unsubscribe-success") {
			this.setState({connectionStatus: "Un-Subscribed from /event/ApiEventStream Success"});
			
			if (stompClient !== null) {
	        		stompClient.disconnect();
	    		}
	    
	    		this.setState({connectionStatus: "Disconnected"});
	    		console.log("Disconnected");
			
		}

	},

	processNotification : function(entityName, rowsProcessed) {
		console.log('Got Notification for: ' + entityName);
		entityData[entityName] = rowsProcessed;
		this.setState( {chartData: { labels: labels, 
									 datasets: [{ data: Object.values(entityData), backgroundColor: barColors,  }] }} );

	},
	
	processConnectResponse : function(response) {
		var messageType = JSON.parse(response.body).type;
		var self = this;
	     console.log("Recieved message Type: " + messageType);
	    
	    if(messageType == 'Subscription') {
	    	var result = JSON.parse(response.body).content;
	    	self.processSubscription(result);
	    }

		if(messageType == 'Notification') {
	    	var entityName = JSON.parse(response.body).entityName;
	    	var rowsProcessed = JSON.parse(response.body).rowsProcessed;
	    	
	    	if(rowsProcessed > 40) {
	    		self.notifService.sendNotif(entityName, rowsProcessed);
	    	}
	    	self.processNotification(entityName, rowsProcessed);
	    }	    
	    
	},
	
	
	
	
	render: function() {
		return (
				
				<div>
					<div className="jumbotron">
					<div className="row">
					<div className="col-md-10">
						<ConnectionStatus status={this.state.connectionStatus} />
						<ConnectionButton isConnected={this.state.isConnected} status={this.state.connectionStatus} connectToServer={this.connectToServer} disconnectFromServer={this.disconnectFromServer}/>
					</div>
					<div className="col-md-2">
											
					</div>
					</div>
						<Dashboard chartData={this.state.chartData}/>
						<NotifService ref={(notifService) => { this.notifService = notifService; }}/>
					</div>
				</div>
			
		);
	}
});

module.exports = Monitor;