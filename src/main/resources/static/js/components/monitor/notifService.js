"use strict";

var React = require('react');
var Router = require('react-router');
var ToastContainer = require("react-toastify").ToastContainer;
var toast = require("react-toastify").toast;


var NotifService = React.createClass({

	sendNotif : function(entity, rows) {
		//console.log('Send Notif');
		toast.success("Query Alert: " + rows + " exported on " + entity);
	},

	render: function() {
		return (
				<div>
			        <ToastContainer 
			          position="top-right"
			          type="success"
			          autoClose={5000}
			          hideProgressBar={false}
			          newestOnTop={false}
			          closeOnClick
			          pauseOnHover
			        />
        
        		</div>
		);
	}
});

module.exports = NotifService;