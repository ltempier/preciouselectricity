import React, {Component} from 'react';
import {Navbar, NavbarBrand, Container, Row, Col} from 'reactstrap';

import MainChart from "./MainChart";
import DeviceCommand from "./DeviceCommand";

class App extends Component {

    constructor(props) {
        super(props);
    }

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
