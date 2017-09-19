"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var PubSub = require('pubsub-js');

var NotificationEntry = (props) => {
    return(
        <a href="#" className="list-group-item">
            <i className="fa fa-chevron-right"></i> {props.label}
            <span className="pull-right text-muted small"><em>{props.rows} rows exported</em>
            </span>
        </a>
    );
};

var NotificationsPanel = React.createClass({

    getInitialState: function() {
        return {
            entries : [],
            rowsProcessed: 0,
            entityName : '',
        };

    },

    eventNotification: function(msg, data) {

        if(data.rowsProcessed < 40) {
            return;
        }

        this.setState((prevState) => {
                                       prevState.entries.unshift({rowsProcessed: data.rowsProcessed, entityName: data.entityName});
                                       return { entries : prevState.entries };
                                    });

    },

    notificationCleaner : function() {
        
        if(this.state.entries.length > 5) {
            
            this.setState((prevState) => {
                                       prevState.entries.pop();
                                       return { entries : prevState.entries };
                                    });

        }
    },

    componentWillMount: function() {
        PubSub.subscribe( 'Event-Notification', this.eventNotification );
        setInterval(this.notificationCleaner, 100);
    },

    render : function() {

        return(

            <div className="col-lg-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <i className="fa fa-bell fa-fw"></i> Query Alerts
                        </div>
                        <div className="panel-body">
                            <div className="list-group">

                                {this.state.entries.map( (entry, i) => 
                                        <NotificationEntry key={i} label={entry.entityName} rows={entry.rowsProcessed} />
                                )}
                            </div>
                        </div>
                    </div>    
        </div>

        );               
    }
});

module.exports = NotificationsPanel;