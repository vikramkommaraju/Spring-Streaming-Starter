"use strict";

var React = require('react');
var Doughnut = require('react-chartjs-2').Doughnut;
var BarChart = require("react-chartjs-2").Bar;

var chartOptions = {
	responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'API Events on Entities'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
};

//{ labels: Object.keys({props.entityData}), datasets: [{ data: Object.values({props.entityData})}] } 

const Dashboard = (props) => {
	return (
		<div>
			<Doughnut data={props.chartData} options={chartOptions} />
		</div>
		
	);
};


module.exports = Dashboard;