"use strict";

var React = require('react');
var Doughnut = require('react-chartjs-2').Doughnut;
var BarChart = require("react-chartjs-2").Bar;
var LineChart = require("react-chartjs-2").Line;


var chartOptions = {
	responsive: true,
    legend: {
    		labels: ['Account', 'Lead', 'Contact', 'Opportunity', 'Report'],
            position: 'bottom',
        }, 
    title: {
            display: true,
            text: 'API Events on Entities'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        },
        scales: {
			        xAxes: [{
	                            display: true,
	                            scaleLabel: {
	                                display: true
	                            }
	                        }],
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                                max: 60
                            }
                        }]
    }
};

//{ labels: Object.keys({props.entityData}), datasets: [{ data: Object.values({props.entityData})}] } 

const Dashboard = (props) => {
	return (
		<div>
			<BarChart data={props.chartData} options={chartOptions} width={200} height={80}/>
		</div>
		
	);
};


module.exports = Dashboard;