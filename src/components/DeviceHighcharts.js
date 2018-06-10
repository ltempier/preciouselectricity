import React, {Component} from 'react';
import _ from 'lodash';

import ReactHighcharts from 'react-highcharts';
import DraggablePoints from 'highcharts-draggable-points'

import {formatHourInterval} from '../tools/format'
import {grayLight, green, black} from '../constants/colors'

import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {updDevice} from "../actions/index";


DraggablePoints(ReactHighcharts.Highcharts);


const mapDispatchToProps = dispatch => {
    return {
        updDevice: (id, device) => dispatch(updDevice(id, device)),
    };
};

class ConnectedDeviceCharts extends Component {

    constructor(props) {

        super(props);

        this.lastEvent = {};
        this.chartConfig = {
            chart: {
                type: 'areaspline',
                className: 'pointer',
                events: {
                    click: this.onChartClick.bind(this)
                },
                height: 300
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                // visible: false,
                categories: _.range(0, 24).map(formatHourInterval),
                min: 0,
                max: 23,
                tickInterval: 1,
                plotBands: [
                    {
                        color: grayLight,
                        from: -1, // Start of the plot band
                        to: 7 // End of the plot band
                    },
                    {
                        color: grayLight,
                        from: 12, // Start of the plot band
                        to: 16 // End of the plot band
                    },
                    {
                        color: grayLight,
                        from: 22, // Start of the plot band
                        to: 24 // End of the plot band
                    },
                ],
            },
            yAxis: {
                max: 100,
                min: 0,
                title: {
                    text: ''
                },
                labels: {
                    format: '{value} %'
                },
                tickInterval: 100
            },
            series: [
                {
                    name: 'day',
                    showInLegend: false,
                    data: props.data,

                    draggableX: false,
                    dragPrecisionX: 1,

                    draggableY: true,
                    dragMinY: 0,
                    dragMaxY: 100,
                    dragPrecisionY: 1,
                    color: black
                }
            ],
            tooltip: {
                formatter: function () {
                    return [
                        `<b>${this.x} ${this.y}%</b>`,
                        '<small>double click to remove</small>'
                    ].join('<br>')
                }
            },
            plotOptions: {
                series: {
                    pointPadding: 0,
                    groupPadding: 0,
                    shadow: false,
                    borderWidth: 0,

                    marker: {
                        enabled: true
                    },
                    point: {
                        events: {

                            // drag: function (e) {
                            // console.log(e)
                            // }.bind(this),

                            drop: function (e) {
                                this.lastEvent = {
                                    type: 'drop',
                                    timestamp: Date.now()
                                };
                                this.onDataChange()
                            }.bind(this),

                            click: function (e) {
                                if (this.lastEvent.type === 'pointClick') {
                                    if (this.lastEvent.timestamp > Date.now() - 500) {
                                        this.onPointDblClick(e);
                                        return
                                    }
                                }

                                this.lastEvent = {
                                    type: 'pointClick',
                                    timestamp: Date.now()
                                };
                            }.bind(this)
                        }
                    }
                }
            }
        };
    }

    componentDidMount() {
        this.onDataChange()
    }

    onPointDblClick(e) {
        this.lastEvent = {
            type: 'dblClick',
            timestamp: Date.now()
        };

        if (e.point.x >= 0 && e.point.x < 24) {
            e.point.remove();
            this.onDataChange()
        }
    }

    onChartClick(e) {

        if (this.lastEvent.timestamp && this.lastEvent.timestamp > Date.now() - 100)
            return;

        this.lastEvent = {
            type: 'click',
            timestamp: Date.now()
        };

        let chart = this.refs.chart.getChart();
        let serie = chart.series[0];

        let x = _.round(e.xAxis[0].value),
            y = _.round(e.yAxis[0].value);

        let idx = _.findIndex(serie.data, function (data) {
            return data.x === x
        });

        if (idx < 0) {
            serie.addPoint([x, y]);
        } else {
            let data = serie.data;
            data[idx].update(y);
        }
        this.onDataChange()
    }

    repeatDay() {
        let chart = this.refs.chart.getChart();
        let serie = chart.series[0];

        let firstPoint = _.find(serie.data, function (point) {
            return point.x >= 0 && point.x < 24
        });

        let nextPoint = _.find(serie.data, function (point) {
            return point.x >= 24
        });

        if (firstPoint) {
            if (nextPoint) {
                nextPoint.update({
                    x: firstPoint.x + 24,
                    y: firstPoint.y
                })
            } else {
                serie.addPoint({
                    x: firstPoint.x + 24,
                    y: firstPoint.y
                })
            }
        } else if (nextPoint)
            nextPoint.remove();

        let lastPoint = _.findLast(serie.data, function (point) {
            return point.x < 24 && point.x >= 0
        });

        let previousPoint = _.findLast(serie.data, function (point) {
            return point.x < 0
        });

        if (lastPoint) {
            if (previousPoint) {
                previousPoint.update({
                    x: lastPoint.x - 24,
                    y: lastPoint.y
                })
            } else {
                serie.addPoint({
                    x: lastPoint.x - 24,
                    y: lastPoint.y
                })
            }
        } else if (previousPoint)
            previousPoint.remove()
    }

    onDataChange() {

        this.repeatDay();

        let chart = this.refs.chart.getChart();
        let serie = chart.series[0];
        let chartData = serie.data;

        let data = [];
        for (let h = 0; h < 24; h++) {
            let idx = _.findIndex(chartData, {x: h});
            if (idx >= 0) {
                data.push(chartData[idx].y)
            } else {
                let lastPoint = _.findLast(chartData, function (point) {
                    return point.x < h
                });
                let nextPoint = _.find(chartData, function (point) {
                    return point.x > h
                });

                if (!lastPoint || !nextPoint) {
                    console.log('oh oh')
                } else {

                    let dx = nextPoint.x - lastPoint.x;
                    let dy = nextPoint.y - lastPoint.y;

                    if (dx > 0)
                        data.push(lastPoint.y + (h - lastPoint.x) * dy / dx)

                }

            }
        }

        this.props.updDevice(this.props.id, {
            data: data,
            chartData: chartData.map((point) => {
                return {x: point.x, y: point.y}
            })
        })
    }

    render() {
        return (
            <ReactHighcharts config={this.chartConfig} ref="chart" isPureConfig={true}/>
        );
    }
}

ConnectedDeviceCharts.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array
};

const DeviceCharts = connect(null, mapDispatchToProps)(ConnectedDeviceCharts);

export default DeviceCharts;

