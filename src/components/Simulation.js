import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col, Button} from 'reactstrap';

import MainChart from "./MainChart";
import DeviceList from "./DeviceList";
import AddDevice from "./AddDevice";

import {deviceTypes} from "../constants/deviceConfigs"

const mapStateToProps = state => {
    return {devices: state.devices};
};

class ConnectedSimulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterIndexes: []
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
                <Container>
                    <Row className="mt-3">
                        <Col>
                            <MainChart/>
                        </Col>
                    </Row>

                    <Row className="mb-4 mt-3">

                        <Col sm={{size: 3, order: 1, offset: 0}}>
                            <h2>Electrical Devices</h2>
                        </Col>

                        <Col sm={{size: 6, order: 2, offset: 0}}>

                            {
                                this.props.filters.map((filter, idx) => {
                                    return (
                                        <Button key={idx}
                                                outline
                                                color="primary"
                                                active={this.state.filterIndexes.indexOf(idx) >= 0}
                                                onClick={() => this.onFilterClick(idx)}
                                                className="mr-2"
                                        >
                                            {filter.name}
                                        </Button>
                                    )
                                })
                            }
                        </Col>

                        <Col sm={{size: 3, order: 3, offset: 0}}>
                            <AddDevice/>
                        </Col>

                    </Row>

                    <Row>
                        <Col>
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
                        </Col>
                    </Row>

                </Container>
            </div>

        )

    }
}


ConnectedSimulation.defaultProps = {
    filters: [
        {
            field: 'type',
            value: deviceTypes.consumer,
            name: 'Consumer'
        },
        {
            field: 'type',
            value: deviceTypes.producer,
            name: 'Producer'
        },
        {
            field: 'type',
            value: deviceTypes.battery,
            name: 'Battery'
        },
        {
            field: 'simulation',
            value: true,
            name: 'Only simulation'
        },
    ]
};


const Simulation = connect(mapStateToProps)(ConnectedSimulation);
export default Simulation