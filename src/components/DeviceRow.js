import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import _ from 'lodash'

import {Sparklines, SparklinesBars, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';
import Toggle from 'react-toggle'

import {
    Collapse,
    Row,
    Col,
    Button,
    ButtonGroup,
    Label,
    Input,
    Form,
    Container
} from 'reactstrap';

import DeviceCharts from './DeviceHighcharts';
import {updDevice, rmvDevice} from "../actions/index";
import {deviceTypes, deviceTypesById} from "../constants/deviceConfigs";
import {green, black, gray} from "../constants/colors";


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
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onQuantityClick = this.onQuantityClick.bind(this);


        console.log(this.props)
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

    onButtonClick(e) {
        console.log('io', e.target.name, e.target.value)
        this.props.updDevice(this.props.id, {[e.target.name]: !this.props[e.target.name]})
    }

    render() {

        let color = green;
        if ((this.props.power * this.props.quantity) === 0)
            color = gray;
        else if (this.props.simulation)
            color = black;


        return (
            <div>
                <Row className="align-items-center justify-content-center">

                    <Col md="auto" xs="2" className="">
                        <div className="badge-type text-uppercase" style={{'backgroundColor': color}}>
                            {(deviceTypesById[this.props.type] || '').charAt(0)}
                        </div>
                    </Col>

                    <Col md="4" xs="10" className="">
                        <h2 className="font-weight-bold text-capitalize">{this.props.name}</h2>
                        <span className="text-muted">{this.props.power * this.props.quantity} Watt</span>
                    </Col>

                    <Col lg="4" md="3" xs="12" className="">
                        <Sparklines data={this.props.data} className="">
                            {/*<SparklinesBars style={{fill: color}}/>*/}
                            <SparklinesLine style={{strokeWidth: 2, stroke: color, fill: "none"}}/>

                        </Sparklines>
                    </Col>



                    <Col md="auto" xs="6">
                        <ButtonGroup className="btn-quantity">
                            <Button outline color="primary" onClick={() => this.onQuantityClick(-1)}
                                    disabled={this.props.quantity <= 0}>-</Button>
                            <Button outline color="primary" disabled>{this.props.quantity}</Button>
                            <Button outline color="primary" onClick={() => this.onQuantityClick(1)}>+</Button>
                        </ButtonGroup>
                    </Col>


                    <Col md="1" xs="6" className="d-flex justify-content-center">
                        <Button outline color="primary"
                                onClick={() => this.setState({collapse: !this.state.collapse})}>
                            {this.state.collapse ? "Hide" : "Edit"}
                        </Button>
                    </Col>

                </Row>

                <Collapse isOpen={this.state.collapse}>

                    <hr/>
                    <Row className="mb-2 align-items-center justify-content-center">

                        <Col md="3" xs="12">
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

                        <Col md="2" xs="12">
                            <Label>Device type</Label>
                            <Input type="select"
                                   name="type"
                                   value={this.props.type}
                                   onChange={this.onInputNumberChange}
                            >
                                {
                                    _.map(deviceTypes, function (value, name) {
                                        return <option key={name} value={value}>{name}</option>
                                    })
                                }
                            </Input>
                        </Col>

                        <Col md="auto" xs="6">
                            <Label>Quantity</Label>
                            <Form inline>
                                <ButtonGroup className="btn-quantity">
                                    <Button outline onClick={() => this.onQuantityClick(-1)}
                                            disabled={this.props.quantity <= 0}>-</Button>
                                    <Button outline disabled>{this.props.quantity}</Button>
                                    <Button outline onClick={() => this.onQuantityClick(1)}>+</Button>
                                </ButtonGroup>
                            </Form>
                        </Col>

                        <Col md="auto" xs="6">
                            <Label>Simulation</Label>
                            <Form inline>
                                <Toggle
                                    name="simulation"
                                    defaultChecked={this.props.simulation}
                                    icons={false}
                                    onChange={this.onButtonClick}/>
                            </Form>

                        </Col>
                    </Row>

                    <Row className="mb-2 mt-5">
                        <Col>
                            <DeviceCharts id={this.props.id} data={this.props.chartData}/>
                        </Col>
                    </Row>

                    <Row className="d-flex justify-content-center">
                        <Col md="2" xs="12">
                            <Button outline color="danger" block
                                    onClick={() => this.props.rmvDevice(this.props.id)}>Delete</Button>

                        </Col>
                    </Row>

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