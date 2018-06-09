import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import _ from "lodash";

import {formatHourInterval, stringFormatLargeNumber} from '../tools/format'
import {getBatteryData} from '../tools/battery'

import {deviceTypes} from '../constants/deviceConfigs'
import {Card, CardBody} from 'reactstrap';
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
                tickInterval: 1
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
                    name: 'day',
                    showInLegend: false,
                    data: []
                },
                {
                    name: 'consumer',
                    type: 'spline',
                    data: []
                },
                {
                    name: 'producer',
                    type: 'spline',
                    data: []
                },
                {
                    name: 'battery capacity',
                    type: 'spline',
                    data: []
                },
                {
                    name: 'battery',
                    type: 'spline',
                    data: []
                },
                {
                    name: 'sum with battery',
                    type: 'spline',
                    data: []
                },
            ],
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return `<b>${this.x} ${stringFormatLargeNumber(this.y)}W</b>`
                }
            }
        };

        store.subscribe(this.fillChart.bind(this));

    }


    fillChart() {
        let chart = this.refs.chart.getChart();
        let devices = store.getState().devices;
        let battery = store.getState().battery;

        let sumData = [];
        let consumerData = [];
        let producerData = [];

        for (let h = 0; h < 24; h++) {

            let consumerValue = 0;
            let producerValue = 0;

            devices.forEach(function (device) {
                if (device.data.length === 0)
                    return;

                let value = device.quantity * device.power * (device.data[h] / 100);
                if (device.type === deviceTypes.consumer)
                    consumerValue += value;
                else if (device.type === deviceTypes.producer)
                    producerValue -= value;
            });

            consumerData[h] = consumerValue;
            producerData[h] = producerValue;
            sumData[h] = consumerValue + producerValue;
        }

        let res = getBatteryData(battery, sumData);

        chart.series[0].setData(sumData);
        chart.series[1].setData(consumerData);
        chart.series[2].setData(producerData);
        chart.series[3].setData(res.batteryCapacityData);
        chart.series[4].setData(res.batteryData);
        chart.series[5].setData(res.sumDataWithBattery);
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
