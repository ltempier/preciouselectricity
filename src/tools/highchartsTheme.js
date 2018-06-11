import {white, green, grayLight, black} from '../constants/colors'

import ReactHighcharts from 'react-highcharts';


export default function highchartsTheme() {

    ReactHighcharts.Highcharts.theme = {
        colors: ['black', '#dc3545', '#28a745', '#007bff'],
        chart: {},
        title: {},
        subtitle: {},
        xAxis: {
            tickLength: 0,
            lineWidth: 0,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            labels: {
                enabled: false
            }
        },
        yAxis: {
            gridLineWidth: 0,
            minorGridLineWidth: 0
        },
        labels: {},

        tooltip: {
            backgroundColor: 'white',
            borderWidth: 1,
            style: {
                color: 'black'
            }
        },

        plotOptions: {
            series: {
                marker: {
                    symbol: 'circle',
                    fillColor: white,
                    lineWidth: 2,
                    lineColor: black
                }
            },


            spline: {
                lineWidth: 3
            },


            areaspline: {
                fillOpacity: 1,
                lineWidth: 0
            }
        }

    };

    ReactHighcharts.Highcharts.setOptions(ReactHighcharts.Highcharts.theme);


}
