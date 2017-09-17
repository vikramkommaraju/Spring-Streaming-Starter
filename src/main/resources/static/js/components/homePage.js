"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var StreamingPanel = require('./streamingPanel');
var MetricsDashboard = require('./metrics-dashboard');

const PageHeader = (props) => {
	return (
			<div className="col-lg-12">
                <h1 className="display-3">API Events Streaming Demo</h1>
                <hr />
			</div>
		);
};


const NotificationsPanel = (props) => {
	return(
		<div className="col-lg-4">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <i className="fa fa-bell fa-fw"></i> Query Alerts
                </div>
                <div className="panel-body">
                    <div className="list-group">
                        <a href="#" className="list-group-item">
                            <i className="fa fa-comment fa-fw"></i> New Comment
                            <span className="pull-right text-muted small"><em>4 minutes ago</em>
                            </span>
                        </a>
                        <a href="#" className="list-group-item">
                            <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                            <span className="pull-right text-muted small"><em>12 minutes ago</em>
                            </span>
                        </a>
                        
                    </div>
                </div>
            </div>
            
            
        </div>
	);
};

var Home = React.createClass({
	 
	render: function(){
		return (
				<div id="page-wrapper">
		            
		            
		            <div className="row">
		            	<PageHeader />
		            </div>

		            <div className="row">
		            	<MetricsDashboard />
		            </div>
		            
		            <div className="row">
		                <StreamingPanel />
		                <NotificationsPanel />
		            </div>
		        </div>
		);
	}
});

module.exports = Home;