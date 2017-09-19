"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var PubSub = require('pubsub-js');

var ConnectionService = require('./connectionService');
var topic = "/topic/events";

const MetricCounter = (props) => {
	return (

			<div className="col-lg-3 col-md-6">
                    <div className={ "panel " + props.style}>
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className={ "fa "+ props.icon + " fa-5x" }></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="huge">{props.metric}</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div className="panel-footer">
                                <span className="pull-left">{props.label}</span>
                                <div className="clearfix"></div>
                            </div>
                        </a>
                    </div>
		    </div>
	);
};

var MetricsDashboard = React.createClass({

	getInitialState: function() {
		return {
			totalRowsProcessed: 0,
			totalEvents : 0,
			queryAlerts : 0,
			anomalies : 0		
		};

	},

	eventStreamListener : function(response) {
		var entityName = JSON.parse(response.body).entityName;
	    var rowsProcessed = JSON.parse(response.body).rowsProcessed;

	    PubSub.publish('Event-Notification', {'entityName' : entityName, 'rowsProcessed' : rowsProcessed});
	    
	    this.setState(prevState => ({
    									totalRowsProcessed : parseInt(prevState.totalRowsProcessed) + parseInt(rowsProcessed),
    									totalEvents : parseInt(prevState.totalEvents) + 1,
    									queryAlerts : parseInt(rowsProcessed) > 400 ? parseInt(prevState.queryAlerts) + 1 : parseInt(prevState.queryAlerts),
    									anomalies : parseInt(rowsProcessed) > 490 ? parseInt(prevState.anomalies) + 1 : parseInt(prevState.anomalies)
    								})
	    );
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
		            <MetricCounter label="Total Number of API Events" style="panel-primary" icon="fa-tasks" metric={this.state.totalEvents} />
		            <MetricCounter label="Avg Number of Rows Queried" style="panel-green" icon="fa-bar-chart" metric={ this.state.totalEvents == 0 ? 0 : ( this.state.totalRowsProcessed / this.state.totalEvents).toFixed(2) } />
		            <MetricCounter label="Number Query Alerts" style="panel-yellow" icon="fa-warning" metric={this.state.queryAlerts}/>
		            <MetricCounter label="High Volume Queries" style="panel-red" icon="fa-question-circle" metric={this.state.anomalies} />		             
				</div>
		);
	}
});

module.exports = MetricsDashboard;
