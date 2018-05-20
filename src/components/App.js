import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import DeviceRow from "./components/DeviceRow";
import {
    Navbar,
    NavbarBrand,
    ListGroup,
    ListGroupItem,
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody
} from 'reactstrap';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            devices: []
        };

        this.chartConfig = {
            chart: {
                type: 'column',
                height: 400
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            series: [
                {
                    name: 'day',
                    showInLegend: false,
                    data: []
                }
            ],
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            }
        };

        this.addDevice = this.addDevice.bind(this);
        this.onDeviceUpdate = this.onDeviceUpdate.bind(this)
    }

    addDevice(device) {
        let devices = this.state.devices;
        devices.push(device);
        this.setState({
            devices: devices
        })
    }

    onDeviceUpdate(idx, data) {
        console.log('onDataChange', data);

        this.state.devices[idx].data = data;
        this.setState({devices: this.state.devices}, () => {
            let chartData = [];
            for (let h = 0; h < 24; h++) {
                let point = {
                    x: h,
                    y: 0
                };
                this.state.devices.forEach(function (device) {
                    point.y += device.data[h]
                });
                chartData.push(point)
            }

            let chart = this.refs.chart.getChart();
            chart.series[0].setData(chartData);
        });
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
                            <Card>
                                <CardBody>
                                    <ReactHighcharts config={this.chartConfig} ref="chart" isPureConfig={true}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                    <Row className="mt-4">
                        <Col>
                            <h3>My devices</h3>
                        </Col>
                        <Col>
                            <Button outline color="primary" className="float-right" onClick={this.addDevice}>+ add
                                device</Button>
                        </Col>
                    </Row>

                    <Row className="mt-3 mb-5">
                        <Col>
                            <ListGroup>
                                {
                                    this.state.devices.map((device, idx) => {
                                        return (
                                            <ListGroupItem key={idx}>
                                                <DeviceRow device={device}
                                                           onDeviceUpdate={(data) => this.onDeviceUpdate(idx, data)}/>
                                            </ListGroupItem>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Col>
                    </Row>

                </Container>

            </div>
        );
    }
}


export default App;
