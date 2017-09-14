/*eslint-disable strict */ //Disabling check because we can't run strict mode. Need global vars.
$ = jQuery = require('jquery');
var React = require('react');
var Header = require('./common/header');
var Footer = require('./common/footer');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Header />

			 	<div className="container-fluid">
					<RouteHandler />
				</div>
				
				<Footer />
			</div>
		);

		}
});

module.exports = App;