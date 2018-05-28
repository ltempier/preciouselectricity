import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from "lodash";
import {Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardBody} from 'reactstrap';

import {deviceTypes} from '../constants/deviceConfigs';
import DeviceList from './DeviceList';
import AddDevice from "./AddDevice";

const mapStateToProps = state => {
    return {devices: state.devices};
};

class ConnectedDeviceCommand extends Component {


    constructor(props) {
        super(props);
        this.state = {
            activeType: deviceTypes.consumer
        };

        this.onChangeActiveTab = this.onChangeActiveTab.bind(this)
    }

    onChangeActiveTab(activeType) {
        if (activeType === this.state.activeType)
            return;
        this.setState({activeType})
    }

    render() {

        return (

            <div>
                <Nav tabs fill justified>
                    <NavItem>
                        <NavLink
                            href="#"
                            active={this.state.activeType === deviceTypes.consumer}
                            onClick={() => {
                                this.onChangeActiveTab(deviceTypes.consumer)
                            }}
                        >
                            Consumer
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            href="#"
                            active={this.state.activeType === deviceTypes.producer}
                            onClick={() => {
                                this.onChangeActiveTab(deviceTypes.producer)
                            }}
                        >
                            Producer
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            href="#"
                            active={this.state.activeType === deviceTypes.battery}
                            onClick={() => {
                                this.onChangeActiveTab(deviceTypes.battery)
                            }}
                        >
                            Battery
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeType}>

                    {
                        [deviceTypes.consumer, deviceTypes.producer].map((type) => {
                            return (


                                <TabPane tabId={type} key={type}>

                                    <Row>
                                        <Col>
                                            <AddDevice type={type}/>
                                        </Col>
                                    </Row>

                                    <DeviceList devices={_.filter(this.props.devices, {type})}/>

                                </TabPane>

                            )
                        })
                    }

                    <TabPane tabId={deviceTypes.battery}>
                        TODO
                    </TabPane>
                </TabContent>
            </div>
        )

    }
}


const DeviceCommand = connect(mapStateToProps)(ConnectedDeviceCommand);
export default DeviceCommand;