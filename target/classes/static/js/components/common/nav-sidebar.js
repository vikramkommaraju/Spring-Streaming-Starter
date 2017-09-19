"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NavSidebar = React.createClass({

	render: function() {
		return (
				<div className="navbar-default sidebar" role="navigation">
		                <div className="sidebar-nav navbar-collapse">
		                    <ul className="nav" id="side-menu">
		                        <li className="sidebar-search">
		                            <div className="input-group custom-search-form">
		                                <input type="text" className="form-control no-cursor" placeholder="Search..." />
		                                <span className="input-group-btn">
		                                <button className="btn btn-default" type="button">
		                                    <i className="fa fa-search"></i>
		                                </button>
		                            </span>
		                            </div>
		                        </li>
		                        <li>
		                            <a className="no-cursor"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
		                        </li>
		                        
		                       <li>
		                            <a className="no-cursor"><i className="fa fa-gear fa-fw"></i> Settings</a>
		                        </li>
		                        <li>
		                        </li>
		                    </ul>
		                </div>
		        </div>
		);
	}
});

module.exports = NavSidebar;