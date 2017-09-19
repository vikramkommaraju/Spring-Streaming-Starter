"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var PubSub = require('pubsub-js');
var StreamingChart  =require('./streaming-chart');
var ConnectionService = require('./connectionService');
var topic = "/topic/subscription";
//backgroundColor : Array.from(this.state.entityNameToColorMap.values()), 
    												 				
const ConnectionStatusLabel = (props) => {
	return(
		<span className={props.status == 'Connected' ? "connected" : "disconnected"}>{props.status}<i className={props.status == 'Connected' ? "fa fa-circle connected blink_me status-icon" : "fa fa-circle disconnected status-icon"} aria-hidden="true"> </i></span>
	);
};

const ConnectionButton = (props) => {
	return(
		<button className={"btn btn-xs btn-" + props.style} role="button" disabled={props.disabled} onClick={ props.label == 'Subscribe' ? () => props.connectToServer() : props.disconnectFromServer}>{props.label}</button>
	);
};


var chartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
};

var StreamingPanel = React.createClass({

	getInitialState: function() {
		return {
			status: "Disconnected",
			label: "Subscribe",
			style: "success",
			disabled : false,
			entityNames: new Set(),
			entityNameToColorMap : new Map(),
			entityNameToRowsMap : new Map(),
			chartData: {labels: [], datasets: []},
			entityNameToDataSet: new Map()		
		};

	},

	getNextColor : function() {
		  var letters = '0123456789ABCDEF';
		  var color = '#';
		  for (var i = 0; i < 6; i++) {
		    color += letters[Math.floor(Math.random() * 16)];
		  }
		  return color;
	},

	createNewDatatSet : function(rowsProcessed) {

		var dataset = {};

		dataset.backgroundColor = this.getNextColor();
		dataset.data = [21];

		return dataset;

	},

	getUpdatedDataset : function(entityName, rowsProcessed) {

		var dataset = this.state.entityNameToDataSet.get(entityName);
		console.log('Set rows processed from ' + dataset.data + ' to ' + rowsProcessed);
		dataset.data = rowsProcessed;

		return dataset;
	},


	eventStreamListener : function(response) {
		var entityName = JSON.parse(response.body).entityName;
	    var rowsProcessed = JSON.parse(response.body).rowsProcessed;
	    
	    this.setState(prevState => ({
    									entityNameToColorMap: prevState.entityNameToColorMap.has(entityName) ? prevState.entityNameToColorMap : this.state.entityNameToColorMap.set(entityName, this.getNextColor()),
    									entityNameToRowsMap: prevState.entityNameToRowsMap.set(entityName, rowsProcessed),

    									entityNameToDataSet: prevState.entityNameToDataSet.has(entityName) ? 
    											prevState.entityNameToDataSet.set(entityName, this.getUpdatedDataset(entityName, rowsProcessed)) : this.state.entityNameToDataSet.set(entityName, this.createNewDatatSet(rowsProcessed)),
    									chartData: { labels: Array.from(this.state.entityNameToDataSet.keys()), 
    												 datasets: [{
    												 				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "red"],
          															data : Array.from(this.state.entityNameToRowsMap.values())
    												 			}]
    												}
    								})
	    );

	    console.log('Labels: ' + Array.from(this.state.entityNameToDataSet.keys()));
	    
	},

	responseHandler : function(response) {
		var self=this;
		var result = JSON.parse(response.body).content;
		
		if(result == 'subscribe-success') {
			self.setState({status: "Connected", label: "Disconnect", style: "warning", disabled: false});
			ConnectionService.register("/topic/events", self.eventStreamListener);
			PubSub.publishSync( 'Subsription-Status', 'Success' );			
		} 
		else if(result == 'subscribe-failed') {
			self.setState({status: "Failed", label: "Subscribe", style: "success", disabled: false});
		} 
			
	},

	subscribeToEvents : function() {
		ConnectionService.send("subscribe");
	},

	unSubscribeEvents : function() {
		ConnectionService.send("unsubscribe");
	},

	connectToServer : function() {

		var self=this;

		self.setState({status: "Connecting...", label: "Disconnect", style: "warning", disabled: true});

		var callback = function() {
			ConnectionService.register(topic, self.responseHandler);
			self.subscribeToEvents();
		};

		ConnectionService.connect(callback);

	},


	disconnectFromServer : function() {
		var self=this;

		self.setState({status: "Disconnected", label: "Subscribe", style: "success", disabled: false});

		self.unSubscribeEvents();
		ConnectionService.disconnect();
	},
     
	render: function() {
		return (
				<div className="col-lg-8">
		            <div className="panel panel-default">
		                <div className="panel-heading">
		                    <i className="fa fa-bar-chart-o fa-fw"></i> Live Streaming View
		                    <div className="pull-right">
		                    	<ConnectionStatusLabel status={this.state.status}/>
		                        <ConnectionButton style={this.state.style} 
		                        				  label={this.state.label} 
		                        				  disabled={this.state.disabled}
		                        				  connectToServer={this.connectToServer} 
		                        				  disconnectFromServer={this.disconnectFromServer}/>
		                    </div>
		                </div>
		                <div className="panel-body">
		                    <StreamingChart chartData={ this.state.chartData } />
		                </div>
		            </div>
        		</div>
		);
	}
});


module.exports = StreamingPanel;