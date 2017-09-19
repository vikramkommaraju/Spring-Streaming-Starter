"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Doughnut = require('react-chartjs-2').Doughnut;
var PubSub = require('pubsub-js');

var ConnectionService = require('./connectionService');
var topic = "/topic/events";

var chartOptions = {
	responsive: true,
	legend : {
		display : false,
		position : 'bottom',
		labels : []
	}
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

const MetricChart = (props) => {

	return(
			<div className="col-md-3">
	            <div className="panel panel-default">
	                <div className="panel-heading">
	                    <i className="fa fa-bar-chart-o fa-fw"></i> {props.label}
	                </div>
	                <div className="panel-body">
	                    <Doughnut data={props.data}/>
	                </div>
	            </div>
			</div>
	);

};

var MetricCharts = React.createClass({

	getInitialState: function() {
		return {
			apiEventToTotalCount: new Map(),
			apiEventToQueryCount : new Map(),
			apiEventToRowsProcessed : new Map(),
			apiEventToAnomalies : new Map(),
			eventCountChart : {labels: [], datasets: []},
			rowsCountChart : {labels: [], datasets: []},
			queryCountChart : {labels: [], datasets: []},
			anomaliesCountChart : {labels: [], datasets: []},
				
		};

	},

	eventStreamListener : function(response) {
		var entityName = JSON.parse(response.body).entityName;
	    var rowsProcessed = JSON.parse(response.body).rowsProcessed;

	    

	    if(rowsProcessed >= 400) {
			this.setState(prevState => {

											return ({

													apiEventToQueryCount: prevState.apiEventToQueryCount.has(entityName) ? this.state.apiEventToQueryCount.set(entityName, parseInt(this.state.apiEventToQueryCount.get(entityName)) + parseInt(1) ) : this.state.apiEventToQueryCount.set(entityName, parseInt(1)),
													

											});

    								}
	    	);	    	
	    } 

	    if(rowsProcessed >= 800) {
			this.setState(prevState => {

														return ({

																apiEventToAnomalies: prevState.apiEventToAnomalies.has(entityName) ? this.state.apiEventToAnomalies.set(entityName, parseInt(this.state.apiEventToAnomalies.get(entityName)) + parseInt(1) ) : this.state.apiEventToAnomalies.set(entityName, parseInt(1)),
													

														});

			    								}
				    	);	 


	    } 


	    this.setState(prevState => {

											return ({

													apiEventToTotalCount: prevState.apiEventToTotalCount.has(entityName) ? this.state.apiEventToTotalCount.set(entityName, parseInt(this.state.apiEventToTotalCount.get(entityName)) + parseInt(1) ) : this.state.apiEventToTotalCount.set(entityName, parseInt(1)),
													apiEventToRowsProcessed: prevState.apiEventToRowsProcessed.has(entityName) ? this.state.apiEventToRowsProcessed.set(entityName, parseInt(this.state.apiEventToRowsProcessed.get(entityName)) + parseInt(rowsProcessed) ) : this.state.apiEventToRowsProcessed.set(entityName, parseInt(rowsProcessed)),
													eventCountChart : { labels: Array.from(this.state.apiEventToTotalCount.keys()), 
					    												 datasets: [{
					    												 				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "red"],
					          															data : Array.from(this.state.apiEventToTotalCount.values())
					    												 			}]
    																	},
    												rowsCountChart : { labels: Array.from(this.state.apiEventToRowsProcessed.keys()), 
					    												 datasets: [{
					    												 				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "red"],
					          															data : Array.from(this.state.apiEventToRowsProcessed.values())
					    												 			}]
    																	},
    												queryCountChart : { labels: Array.from(this.state.apiEventToQueryCount.keys()), 
					    												 datasets: [{
					    												 				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "red"],
					          															data : Array.from(this.state.apiEventToQueryCount.values())
					    												 			}]
    																	},
    												anomaliesCountChart : { labels: Array.from(this.state.apiEventToAnomalies.keys()), 
					    												 datasets: [{
					    												 				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "red"],
					          															data : Array.from(this.state.apiEventToAnomalies.values())
					    												 			}]
    																	},

											});

    								}
	    	);	

	  

	    // this.setState(prevState => {

					// 						return ({

					// 								apiEventToTotalCount: prevState.apiEventToTotalCount.has(entityName) ? this.state.apiEventToTotalCount.set(entityName, parseInt(this.state.apiEventToTotalCount.get(entityName)) + parseInt(1) ) : this.state.apiEventToTotalCount.set(entityName, parseInt(1)),
					// 								apiEventToRowsProcessed: prevState.apiEventToRowsProcessed.has(entityName) ? this.state.apiEventToRowsProcessed.set(entityName, parseInt(this.state.apiEventToRowsProcessed.get(entityName)) + parseInt(rowsProcessed) ) : this.state.apiEventToRowsProcessed.set(entityName, parseInt(rowsProcessed)),
					// 								eventCountChart : chartData,
					// 								rowsCountChart : { labels: Array.from(this.state.apiEventToRowsProcessed.keys()), 
					//     												 datasets: [{
					//     												 				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "red"],
					//           															data : Array.from(this.state.apiEventToRowsProcessed.values())
					//     												 			}]
    	// 																},
    	// 											queryCountChart : { labels: Array.from(this.state.apiEventToQueryCount.keys()), 
					//     												 datasets: [{
					//     												 				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "red"],
					//           															data : Array.from(this.state.apiEventToQueryCount.values())
					//     												 			}]
    	// 																},
    	// 											anomaliesCountChart : { labels: Array.from(this.state.anomaliesCountChart.keys()), 
					//     												 datasets: [{
					//     												 				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "red"],
					//           															data : Array.from(this.state.anomaliesCountChart.values())
					//     												 			}]
    	// 																},


					// 						});

    	// 							}
	    // 	);	 
	   


	    //Set chart states
	    console.log("Event query labels: " + Array.from(this.state.apiEventToRowsProcessed.keys()));
	   // console.log("Event chart data: " + this.state.eventCountChart.datasets);
	    
	      
	},

	pubSubCallback : function() {
		ConnectionService.register(topic, this.eventStreamListener);
	},

	componentWillMount: function() {
		PubSub.subscribe( 'Subsription-Status', this.pubSubCallback );
	},

	render: function() {
		return (
				<div>
					<MetricChart label="Entities Queried" data={this.state.eventCountChart} options={chartOptions}/>
					<MetricChart label="Rows Processed" data={this.state.rowsCountChart} options={chartOptions}/>
					<MetricChart label="Query Alerts" data={this.state.queryCountChart} options={chartOptions}/>
					<MetricChart label="High Volume Queries" data={this.state.anomaliesCountChart} options={chartOptions}/>					
				</div>
		);
	}
});

module.exports = MetricCharts;
