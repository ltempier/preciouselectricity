import React, {Component} from 'react';
import {connect} from "react-redux";

import {
    CardColumns,
    Card,
    CardBody,
    CardImg,
    CardText,
    Modal,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

import {addDevice} from "../actions/index";
import {deviceConfigs} from "../constants/deviceConfigs";


const mapDispatchToProps = dispatch => {
    return {
        addDevice: (device) => dispatch(addDevice(device))
    };
};

class AddDevice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.onAddDeviceClick = this.onAddDeviceClick.bind(this);
    }


    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onAddDeviceClick(device) {
        this.props.addDevice(device)
        this.setState({modal: false});
    }

    render() {

        return (
            <div>

                <Button outline color="primary" onClick={this.toggleModal} className="float-right">
                    + add device
                </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-lg">
                    <ModalBody>

                        <CardColumns>
                            {
                                deviceConfigs.map((device, idx) => {
                                    return (
                                        <Card key={idx}>
                                            {device.src ? <CardImg top width="100%" src={device.src}/> : ''}
                                            <CardBody>
                                                <CardText>{device.name}</CardText>
                                                <Button
                                                    outline color="primary"
                                                    block
                                                    onClick={() => this.onAddDeviceClick(device)}
                                                >Select</Button>
                                            </CardBody>
                                        </Card>
                                    )
                                })
                            }
                        </CardColumns>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(AddDevice);
