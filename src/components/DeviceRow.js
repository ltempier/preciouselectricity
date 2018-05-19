import React, {Component} from 'react';
import _ from 'lodash';

import DeviceCharts from './DeviceHighcharts';
import {Sparklines, SparklinesBars} from 'react-sparklines';

import {
    Collapse,
    Row,
    Col,
    Button,
    ButtonGroup,
    Form,
    Label,
    Input
} from 'reactstrap';

class DeviceRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devicePower: 1000,
            deviceName: 'no name',
            deviceType: 1,
            quantity: 1,
            data: [],
            collapse: false
        };

        this.onEditChartClick = this.onEditChartClick.bind(this);
        this.onDeviceNameChange = this.onDeviceTypeChange.bind(this);
        this.onDevicePowerChange = this.onDevicePowerChange.bind(this);
        this.onDeviceTypeChange = this.onDeviceTypeChange.bind(this);
        this.onQuantityClick = this.onQuantityClick.bind(this);
        this.onDataChange = this.onDataChange.bind(this)
    }

    onEditChartClick() {
        this.setState({collapse: !this.state.collapse});
    }

    onDeviceNameChange(e) {
        this.setState({deviceName: e.target.value});
    }

    onDevicePowerChange(e) {
        this.setState({devicePower: e.target.value}, this.onDeviceUpdate);
    }

    onDeviceTypeChange(e) {
        this.setState({deviceType: e.target.value}, this.onDeviceUpdate);
    }

    onQuantityClick(delta) {
        this.setState({quantity: this.state.quantity + delta}, this.onDeviceUpdate);
    }

    onDataChange(data) {
        this.setState({data: data}, this.onDeviceUpdate);
    }

    onDeviceUpdate() {
        this.props.onDeviceUpdate(this.state.data.map((p) => {
            return this.state.quantity * this.state.deviceType * this.state.devicePower * (p / 100)
        }))
    }

    render() {


        return (

            <div>

                <Row className="justify-content-md-center">
                    <Col md="2" xs="12">
                        <Label>Device name</Label>
                        <Input type="text"
                               value={this.state.deviceName}
                               onChange={this.onDeviceNameChange}
                        />

                    </Col>

                    <Col md="2" xs="12">
                        <Label>Device power</Label>
                        <Input type="number" min={0} step={100}
                               value={this.state.devicePower}
                               onChange={this.onDevicePowerChange}
                        />
                    </Col>


                    <Col md="2" xs="12">
                        <Label>Device type</Label>
                        <Input type="select" value={this.state.deviceType} onChange={this.onDeviceTypeChange}>
                            <option value={1}>Consumer</option>
                            <option value={-1}>Producer</option>
                        </Input>
                    </Col>

                    <Col md="auto" xs="12">
                        <Label>Quantity</Label>
                        <Form inline>
                            <ButtonGroup>
                                <Button outline color="primary" onClick={() => this.onQuantityClick(-1)}
                                        disabled={this.state.quantity <= 0}>-</Button>
                                <Button outline color="primary" disabled>{this.state.quantity}</Button>
                                <Button outline color="primary" onClick={() => this.onQuantityClick(1)}>+</Button>
                            </ButtonGroup>
                        </Form>
                    </Col>

                    <Col md="3" xs="8" className="sparklines-container">
                        <Sparklines data={this.state.data} min={0} className="">
                            <SparklinesBars style={{fill: "#007bff"}}/>
                        </Sparklines>
                    </Col>

                    <Col md="auto" xs="4" className="align-self-end">
                        <Button outline color="primary"
                                onClick={this.onEditChartClick}>{this.state.collapse ? "Hide" : "Edit"}</Button>
                    </Col>
                </Row>


                <Collapse isOpen={this.state.collapse} className="mt-3">
                    <DeviceCharts data={this.props.editableChartData} onDataChange={this.onDataChange}/>
                </Collapse>
            </div>
        )
    }
}


DeviceRow.defaultProps = {
    editableChartData: [
        {
            x: 11,
            y: 100
        },
    ],
    onDeviceUpdate: function (data) {
        console.log('onDeviceUpdate not init')
    }
};

export default DeviceRow;