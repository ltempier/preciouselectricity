import React, {Component} from 'react';
import {connect} from "react-redux";

import ReactHighcharts from 'react-highcharts';
import _ from "lodash";
import {
    Card,
    CardBody,
    // Button,
    // ButtonGroup,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

// import FaCog from 'react-icons/lib/fa/cog'


import {black, grayLight, gray, green, red} from '../constants/colors'
import {formatHourInterval, stringFormatLargeNumber} from '../tools/format'
import {dataProcess} from '../tools/dataProcess'
import {refreshMainChart} from '../actions/index'

import store from "../store/index";


const mapDispatchToProps = dispatch => {
    return {
        pauseRefreshMainChart: () => dispatch(refreshMainChart(false))
    };
};

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
            series: [],
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
                        `<b>Hour ${this.x}</b>`,
                        ...this.points.map(function (point) {
                            return `<span style="color:${point.color}">\u25CF</span><b> ${point.series.name}</b>: ${stringFormatLargeNumber(point.y)}Watt`
                        })
                    ].join('<br>')
                }
            }
        };


        this.displayOptions = [
            "Consumption vs simulation",
            "Consumption by type",
            "Price chart"
        ];

        this.state = {
            display: 0,
            dropdownOpen: false
        };

        this.toggleParameter = this.toggleParameter.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this)
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(this.fillChart.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    fillChart(force) {

        if (store.getState().refreshMainChart === false && force !== true)
            return;

        console.log('fillChart', force);

        this.props.pauseRefreshMainChart();

        let chart = this.refs.chart.getChart();
        let devices = store.getState().devices;
        let res = dataProcess(devices);

        chart.setTitle({text: this.displayOptions[this.state.display]});

        while (chart.series.length > 0) {
            chart.series[0].remove(false);
        }

        switch (this.state.display) {
            case 0:

                chart.addSeries({
                    name: 'current',
                    color: green,
                    data: res.sumDataWithoutSimulation
                });

                chart.addSeries({
                    name: 'with simulation',
                    type: 'spline',
                    color: black,
                    data: res.sumData
                });

                break;
            case 1:

                chart.addSeries({
                    name: 'Sum',
                    color: gray,
                    data: res.sumData
                });

                chart.addSeries({
                    name: 'Consumer',
                    type: 'spline',
                    color: red,
                    data: res.consumerData
                });

                chart.addSeries({
                    name: 'Producer',
                    type: 'spline',
                    color: green,
                    data: res.producerData.map((v) => -v)
                });


                chart.addSeries({
                    name: 'Battery',
                    type: 'spline',
                    color: black,
                    data: res.batteryData
                    // data: res.batteryData.map((v) => -v)
                });

                break;
            case 2:
                break;

            default:
                break;
        }

    }


    toggleParameter() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeDisplay(display) {

        if (isNaN(display))
            display = this.displayOptions.indexOf(display);

        if (display < 0 || display >= this.displayOptions.length)
            return;

        if (this.state.display === display)
            return;

        console.log('change display', display);

        this.setState({display}, () => this.fillChart(true));

    }

    render() {

        return (
            <Card>
                <CardBody>
                    <div className="float-right">

                        <ButtonDropdown
                            color="primary"
                            isOpen={this.state.dropdownOpen}
                            toggle={this.toggleParameter}>
                            <DropdownToggle caret>Parameter</DropdownToggle>
                            <DropdownMenu>

                                {
                                    this.displayOptions.map((option, optionIdx) => {
                                        return (
                                            <DropdownItem key={optionIdx}
                                                          active={this.state.display === optionIdx}
                                                          onClick={() => this.changeDisplay(optionIdx)}>{option}
                                            </DropdownItem>)
                                    })
                                }

                                <DropdownItem divider/>
                                <DropdownItem>Edit price</DropdownItem>

                            </DropdownMenu>
                        </ButtonDropdown>

                    </div>

                    <ReactHighcharts config={this.chartConfig} ref="chart" isPureConfig={true}/>
                </CardBody>
            </Card>
        )
    }
}

export default connect(null, mapDispatchToProps)(MainChart);
