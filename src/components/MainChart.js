import React, {Component} from 'react';
import {connect} from "react-redux";

import ReactHighcharts from 'react-highcharts';
import _ from "lodash";
import {
    Card,
    CardBody,
    Button,
    ButtonGroup,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import FaCog from 'react-icons/lib/fa/cog'


import {black, grayLight, green} from '../constants/colors'
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

        this.state = {
            display: 1,
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

        this.props.pauseRefreshMainChart();
        // console.log('fillChart');

        let chart = this.refs.chart.getChart();
        let devices = store.getState().devices;

        let res = dataProcess(devices);

        chart.series[0].setData(res.sumDataWithoutSimulation);
        chart.series[1].setData(res.sumData);
    }


    toggleParameter() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeDisplay(display) {
        if (this.state.display === display)
            return;

        this.setState({display});
        this.fillChart(true)
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
                                <DropdownItem active={this.state.display === 1}
                                              onClick={() => this.changeDisplay(1)}>Simulation chart
                                </DropdownItem>

                                <DropdownItem active={this.state.display === 2}
                                              onClick={() => this.changeDisplay(2)}>By type chart
                                </DropdownItem>

                                <DropdownItem active={this.state.display === 3}
                                              onClick={() => this.changeDisplay(3)}>Price chart
                                </DropdownItem>

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
