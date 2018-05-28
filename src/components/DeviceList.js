import React, {Component} from 'react';
import PropTypes from 'prop-types'

import DeviceRow from "./DeviceRow";
import {ListGroup, ListGroupItem, Row, Col} from 'reactstrap';


class ConnectedList extends Component {

    render() {
        return (
            <div>
                {
                    this.props.devices.map((device, idx) => {
                        return (
                            <Row key={device.id} className={idx > 0 ? 'border-top' : ''}>
                                <Col>
                                    <DeviceRow {...device}/>
                                </Col>
                            </Row>
                        )
                    })
                }
            </div>
        )
    }
}

ConnectedList.propTypes = {
    devices: PropTypes.array.isRequired
};

export default ConnectedList;