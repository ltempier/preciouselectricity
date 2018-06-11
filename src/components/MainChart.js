import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import _ from "lodash";
import {Card, CardBody} from 'reactstrap';


import {black, grayLight, green} from '../constants/colors'
import {formatHourInterval, stringFormatLargeNumber} from '../tools/format'
import {dataProcess} from '../tools/dataProcess'

import store from "../store/index";

class MainChart extends Component {
    constructor(props) {
        super(props);

        this.chartConfig = {
            chart: {
                type: 'areaspline',
                height: 400
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: _.range(0, 24).map(formatHourInterval),
                min: 0,
                max: 23,
                tickInterval: 1,
                crosshair: {
                    color: grayLight
                }
            },
            yAxis: {
                title: {
                    text: 'Watt'
                },
                minorTicks: true,
                minorGridLineDashStyle: 'Dash'
            },
            series: [
                {
                    name: 'current',
                    color: green,
                    data: []
                },
                {
                    name: 'with simulation',
                    type: 'spline',
                    color: black,
                    data: []
                }
            ],
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                formatter: function () {
                    return [
                        `<b>Consumption H${this.x}</b>`,
                        ...this.points.map(function (point) {
                            return `<span style="color:${point.color}">\u25CF</span><b> ${point.series.name}</b>: ${stringFormatLargeNumber(point.y)}Watt`
                        })
                    ].join('<br>')
                }
            }
        };

    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(this.fillChart.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    fillChart() {
        let chart = this.refs.chart.getChart();
        let devices = store.getState().devices;

        let res = dataProcess(devices);

        chart.series[0].setData(res.sumDataWithoutSimulation);
        chart.series[1].setData(res.sumData);
    }


    render() {
        return (
            <Card>
                <CardBody>
                    <ReactHighcharts config={this.chartConfig} ref="chart" isPureConfig={true}/>
                </CardBody>
            </Card>
        )
    }
}

export default MainChart;
