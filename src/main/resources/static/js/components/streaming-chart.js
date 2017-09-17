"use strict";

var React = require('react');
var BarChart = require("react-chartjs-2").Bar;


var chartOptions = {
	responsive: true,
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

const StreamingChart = (props) => {
	return (
		<div>
			<BarChart data={props.chartData} options={chartOptions} width={200} height={80}/>
		</div>
		
	);
};


module.exports = StreamingChart;