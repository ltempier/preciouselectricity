import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'

import {updBattery} from "../actions/index";

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
    return state.battery;
};

const mapDispatchToProps = dispatch => {
    return {
        updBattery: (battery) => dispatch(updBattery(battery)),
    };
};

class ConnectedBatteryForm extends Component {

    constructor(props) {
        super(props);
        this.onInputNumberChange = this.onInputNumberChange.bind(this)
    }


    onInputNumberChange(e) {
        this.props.updBattery({[e.target.name]: parseInt(e.target.value, 10)})
    }

    render() {


        return (
            <Row>

                <Col md="2" xs="12">
                    <Label>Capacity</Label>
                    <Input type="number" min={0} step={1000}
                           name="capacity"
                           value={this.props.capacity}
                           onChange={this.onInputNumberChange}
                    />
                </Col>


            </Row>
        )
    }
}


ConnectedBatteryForm.propTypes = {
    capacity: PropTypes.number
};


const BatteryForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedBatteryForm);

export default BatteryForm;