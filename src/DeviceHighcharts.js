import React, {Component} from 'react';
import './DeviceCharts.css'
import _ from 'lodash';

import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more'
import DraggablePoints from 'highcharts-draggable-points'

HighchartsMore(ReactHighcharts.Highcharts);
DraggablePoints(ReactHighcharts.Highcharts);


class DeviceCharts extends Component {

    constructor(props) {

        console.log(props);

        super(props);


        this.state = {
            devicePower: 0,
            deviceName: '',
            deviceType: '',

            season: 0, // 0:summer 1:winter
        };


        this.serieIdx = 0;


        this.chartConfig = {
            chart: {
                type: 'area',
                className: 'pointer-chart',
                events: {
                    click: function (e) {

                        let chart = this.refs.chart.getChart();
                        let serie = chart.series[this.serieIdx];

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

                        this.alignStartWithEnd(x, y);

                    }.bind(this)
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Day consumption'
            },
            xAxis: {
                categories: ['0-1', '2-3', '4-5', '6-7', '8-9', '10-11', '12-13', '14-15', '16-17', '18-19', '20-21', '22-23', '0-1'],
                min: 0,
                max: 12
            },
            yAxis: {
                max: 100,
                min: 0,
                title: {
                    text: ''
                },
                labels: {
                    format: '{value}%'
                }
            },

            series: [
                {
                    name: 'summer',
                    showInLegend: false,
                    // color: 'green',
                    data: [
                        {
                            x: 0,
                            y: 100
                        },
                        {
                            x: 12,
                            y: 100
                        },
                    ],

                    draggableX: false,

                    draggableY: true,
                    dragMinY: 0,
                    dragMaxY: 100,
                    dragPrecisionY: 5,

                },
                {
                    zIndex: -1,
                    name: 'winter',
                    showInLegend: false,
                    // color: 'red',
                    data: [
                        {
                            x: 0,
                            y: 100
                        },
                        {
                            x: 12,
                            y: 100
                        },
                    ],

                    draggableX: false,

                    draggableY: true,
                    dragMinY: 0,
                    dragMaxY: 100,
                    dragPrecisionY: 5,
                },
            ],
            tooltip: {
                enabled: false
            },
            plotOptions: {
                series: {
                    cursor: 'move',
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
                            // }.bind(this),
                            drop: function (e) {
                                this.alignStartWithEnd(e.x, e.y);
                            }.bind(this)
                        }
                    }
                }
            }
        };
        // this.calculateRatio = this.calculateRatio.bind(this);
        this.switchSeason = this.switchSeason.bind(this)
    }

    checkChartPoints(e) {
        if (e.dragStart.x === e.x)
            return;

        let chart = this.refs.chart.getChart();
        let data = chart.series[this.serieIdx].data;

        let pointIdx = _.findIndex(data, {'category': e.target.category});

        console.log('io')


        // let dragMinX = 0;
        // data.forEach(function (point, idx) {
        //     let dragMaxX = 11;
        //
        //     let nextData = data[idx + 1];
        //     if (nextData)
        //         dragMaxX = nextData.x;
        //
        //     if (point.dragMinX !== dragMinX || point.dragMaxX !== dragMaxX) {
        //         point.update({
        //             dragMinX: dragMinX,
        //             dragMaxX: dragMaxX
        //         });
        //     }
        //
        //     dragMinX = (dragMaxX + 1);
        // });

    }

    alignStartWithEnd(x, y) {

        if (x > 0 && x < 12)
            return;

        let chart = this.refs.chart.getChart();
        let serie = chart.series[this.serieIdx];
        let data = serie.data;

        if (x === 0)
            data[data.length - 1].update(y);

        if (x === 12)
            data[0].update(y);
    }

    switchSeason(idx) {

        if (this.serieIdx === idx)
            return;

        this.serieIdx = idx;

        let chart = this.refs.chart.getChart();
        chart.series.forEach((serie, idx) => {

            let select = (idx === this.serieIdx);
            serie.update({
                zIndex: select ? 1 : -1,
                draggableY: select
            })
        });
        chart.reflow()
        // this.setState({season: idx})
    }

    render() {

        return (
            <div className="device-charts-container">


                <button onClick={() => this.switchSeason(0)}>summer</button>
                <button onClick={() => this.switchSeason(1)}>winter</button>
                <p>{this.state.season === 0 ? 'summer' : 'winter'}</p>

                <div className="day-charts-container">
                    <ReactHighcharts config={this.chartConfig} ref="chart"/>
                </div>
            </div>
        );
    }
}

export default DeviceCharts;
