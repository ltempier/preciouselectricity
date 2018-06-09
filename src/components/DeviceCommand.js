import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from "lodash";
import {Button, ButtonGroup, Row, Col, Card, CardBody, Nav, NavItem, NavLink} from 'reactstrap';

import {deviceTypes} from '../constants/deviceConfigs';
import DeviceList from './DeviceList';
import AddDevice from "./AddDevice";
import BatteryForm from "./BatteryForm";

const mapStateToProps = state => {
    return {devices: state.devices};
};

class ConnectedDeviceCommand extends Component {


    constructor(props) {
        super(props);
        this.state = {
            filterIndexes: [],
        };

        this.onFilterClick = this.onFilterClick.bind(this)
    }

    onFilterClick(newFilterIdx) {
        let idx = this.state.filterIndexes.indexOf(newFilterIdx);
        let filterIndexes = this.state.filterIndexes;

        if (idx >= 0)
            filterIndexes.splice(idx, 1);
        else {
            const field = this.props.filters[newFilterIdx].field;
            filterIndexes = filterIndexes.filter((filterIdx) => {
                const filter = this.props.filters[filterIdx];
                return filter.field !== field
            });
            filterIndexes.push(newFilterIdx);
        }

        this.setState({filterIndexes})
    }

    render() {

        return (

            <div>
                <Row className="mb-3">
                    <Col>
                        <Nav pills>

                            {

                                this.props.filters.map((filter, idx) => {


                                    return (
                                        <NavItem key={idx}>
                                            <NavLink href="#"
                                                     active={this.state.filterIndexes.indexOf(idx) >= 0}
                                                     onClick={() => this.onFilterClick(idx)}
                                            >
                                                {filter.name}
                                            </NavLink>
                                        </NavItem>
                                    )


                                    return (<Button key={idx}
                                                    outline
                                                    color="primary"
                                                    active={this.state.filterIndexes.indexOf(idx) >= 0}
                                                    onClick={() => this.onFilterClick(idx)}
                                    >
                                        {filter.name}
                                    </Button>)
                                })
                            }


                        </Nav>
                    </Col>
                </Row>


                <DeviceList devices={
                    this.props.devices.filter((device) => {
                        let keep = true;
                        this.state.filterIndexes.every((idx) => {
                            const filter = this.props.filters[idx];
                            keep = device[filter.field] === filter.value;
                            return keep
                        });
                        return keep
                    })
                }/>
            </div>
        )

    }
}

ConnectedDeviceCommand.defaultProps = {
    filters: [
        {
            field: 'type',
            value: deviceTypes.consumer,
            name: 'Consommateur'
        },
        {
            field: 'type',
            value: deviceTypes.producer,
            name: 'Production'
        },
        {
            field: 'type',
            value: deviceTypes.battery,
            name: 'Battery'
        },
        {
            field: 'simulation',
            value: true,
            name: 'Simulation'
        },
    ]
}
;


const DeviceCommand = connect(mapStateToProps)(ConnectedDeviceCommand);
export default DeviceCommand;