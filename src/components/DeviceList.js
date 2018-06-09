import React, {Component} from 'react';
import PropTypes from 'prop-types'

import DeviceRow from "./DeviceRow";
import {Row, Col, Card, CardBody} from 'reactstrap';

class ConnectedList extends Component {

    render() {
        return (
            <div>
                {
                    this.props.devices.map((device) => {
                        return (
                            <Row key={device.id} className="mb-3">
                                <Col>
                                    <Card>
                                        <CardBody>
                                            <DeviceRow {...device}/>
                                        </CardBody>
                                    </Card>
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