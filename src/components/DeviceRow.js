import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import DeviceCharts from './DeviceHighcharts';
import {Sparklines, SparklinesBars} from 'react-sparklines';
import {updDevice, rmvDevice} from "../actions/index";

import {deviceTypes} from "../constants/deviceConfigs";

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


const mapStateToProps = state => {
    return {devices: state.devices};
};


const mapDispatchToProps = dispatch => {
    return {
        updDevice: (id, device) => dispatch(updDevice(id, device)),
        rmvDevice: (id) => dispatch(rmvDevice(id))
    };
};

class ConnectedDeviceRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.onQuantityClick = this.onQuantityClick.bind(this);
    }

    onQuantityClick(delta) {
        this.props.updDevice(this.props.id, {quantity: this.props.quantity + delta})
    }

    onInputNumberChange(e) {
        this.props.updDevice(this.props.id, {[e.target.name]: parseInt(e.target.value, 10)})
    }

    onInputChange(e) {
        this.props.updDevice(this.props.id, {[e.target.name]: e.target.value})
    }

    render() {

        return (
            <div className="pt-2 pb-3">
                <Row className="">
                    <Col md="2" xs="12">
                        <Label>Device name</Label>
                        <Input type="text"
                               name="name"
                               value={this.props.name}
                               onChange={this.onInputChange}
                        />

                    </Col>

                    <Col md="2" xs="12">
                        <Label>Device power</Label>
                        <Input type="number" min={0} step={100}
                               name="power"
                               value={this.props.power}
                               onChange={this.onInputNumberChange}
                        />
                    </Col>

                    <Col md="auto" xs="4">
                        <Label>Quantity</Label>
                        <Form inline>
                            <ButtonGroup>
                                <Button outline color="primary" onClick={() => this.onQuantityClick(-1)}
                                        disabled={this.props.quantity <= 0}>-</Button>
                                <Button outline color="primary" disabled>{this.props.quantity}</Button>
                                <Button outline color="primary" onClick={() => this.onQuantityClick(1)}>+</Button>
                            </ButtonGroup>
                        </Form>
                    </Col>

                    <Col md="4" xs="8" className="">

                        <Sparklines data={this.props.data} min={0} className="">
                            <SparklinesBars style={{fill: "#007bff"}}/>
                        </Sparklines>

                    </Col>

                    <Col md="auto" xs="12">
                        <Button outline color="primary" onClick={() => this.setState({collapse: !this.state.collapse})}>
                            {this.state.collapse ? "Hide" : "Edit"}
                        </Button>
                    </Col>
                </Row>


                <Collapse isOpen={this.state.collapse} className="mt-3">
                    <DeviceCharts id={this.props.id} data={this.props.chartData}/>
                    <Button outline color="danger" onClick={() => this.props.rmvDevice(this.props.id)}>Delete</Button>
                </Collapse>
            </div>
        )
    }
}

ConnectedDeviceRow.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    power: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    data: PropTypes.array,
    chartData: PropTypes.array
};

const DeviceRow = connect(mapStateToProps, mapDispatchToProps)(ConnectedDeviceRow);

export default DeviceRow;