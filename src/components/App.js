import React, {Component} from 'react';
import {Navbar, NavbarBrand, Container, Row, Col, TabPane, TabContent} from 'reactstrap';
import _ from 'lodash';

// import DeviceList from "./DeviceList";
import MainChart from "./MainChart";
// import AddDevice from "./AddDevice";
import DeviceCommand from "./DeviceCommand";

// import store from "../store/index";
// import {addDevice, updDevice} from "../actions/index";
// import {deviceTypes} from "../constants/deviceConfigs";

class App extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="App">

                <Navbar>
                    <NavbarBrand href="/">precious electricity</NavbarBrand>
                </Navbar>

                <Container>
                    <Row className="mt-3">
                        <Col>
                            <MainChart/>
                        </Col>
                    </Row>

                    <Row className="mt-3 mb-5">
                        <Col>
                            <DeviceCommand/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default App;
