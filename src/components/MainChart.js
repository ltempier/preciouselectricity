import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import _ from "lodash";
import {formatHour, stringFormatLargeNumber} from '../tools/format'
import {deviceTypes} from '../constants/deviceConfigs'
import {Card, CardBody} from 'reactstrap';
import store from "../store/index";

class MainChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: 1
        };

        this.chartConfig = {
            chart: {
                type: 'area',
                height: 400
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: _.range(0, 24).map(formatHour),
                min: 0,
                max: 23,
                tickInterval: 2
            },
            yAxis: {
                title: {
                    text: 'Watt'
                },
                minorTicks: true,
                minorGridLineDashStyle: 'Dash'
            },
            series: [{
                name: 'day',
                showInLegend: false,
                data: []
            }, ..._.map(deviceTypes, function (type, name) {
                return {
                    type: 'line',
                    name: name,
                    data: []
                }
            })
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

        let sumData = [];

        let typeData = {};
        _.each(deviceTypes, (type) => typeData[type] = []);

        for (let h = 0; h < 24; h++) {

            sumData[h] = 0;
            _.each(deviceTypes, (type) => typeData[type][h] = 0);

            devices.forEach(function (device) {
                if (device.data.length === 0)
                    return;

                let value = device.quantity * device.power * (device.data[h] / 100);
                typeData[device.type][h] += value;

                let coef = 0;
                switch (device.type) {
                    case deviceTypes.producer:
                        coef = -1;
                        break;
                    case deviceTypes.consumer:
                    case deviceTypes.battery:
                    default:
                        coef = 1;
                        break
                }

                sumData[h] += coef * value
            });
        }


        _.each(deviceTypes, function (type, name) {
            let idx = _.findIndex(chart.series, {name: name});
            chart.series[idx].setData(typeData[type]);
        });
        chart.series[0].setData(sumData);


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
