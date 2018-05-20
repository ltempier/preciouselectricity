import ReactHighcharts from 'react-highcharts';


ReactHighcharts.Highcharts.theme = {
    colors: ['black'],
    chart: {
        backgroundColor: {},
        borderWidth: 0,
        borderRadius: 0,
        plotBackgroundColor: null,
        plotShadow: false,
        plotBorderWidth: 0
    },
    title: {
        style: {
            color: 'black'
        }
    },
    subtitle: {
        style: {
            color: '#999'
        }
    },
    xAxis: {
        gridLineWidth: 0,
        lineColor: '#999',
        tickColor: '#999',
        labels: {
            style: {
                color: '#999',
                fontWeight: 'bold'
            }
        },
        title: {
            style: {
                color: '#AAA',
                font: 'bold 12px Lucida Grande, Lucida Sans Unicode,' +
                ' Verdana, Arial, Helvetica, sans-serif'
            }
        }
    },
    yAxis: {
        // alternateGridColor: null,
        // minorTickInterval: null,
        // gridLineColor: 'rgba(255, 255, 255, .1)',
        // minorGridLineColor: 'rgba(255,255,255,0.07)',
        lineWidth: 0,
        tickWidth: 0,
        labels: {
            style: {color: '#999'}
        },
        title: {
            style: {
                color: '#AAA',
                font: 'bold 12px Lucida Grande, Lucida Sans Unicode,' +
                ' Verdana, Arial, Helvetica, sans-serif'
            }
        }
    },
    labels: {
        style: {
            color: '#CCC'
        }
    },

    tooltip: {
        backgroundColor: 'white',
        borderWidth: 1,
        style: {
            color: 'black'
        }
    },

    // special colors for some of the demo examples
    legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
    background2: 'rgb(70, 70, 70)',
    dataLabelsColor: '#444',
    textColor: '#E0E0E0',
    maskColor: 'rgba(255,255,255,0.3)'
};

ReactHighcharts.Highcharts.setOptions(ReactHighcharts.Highcharts.theme);
