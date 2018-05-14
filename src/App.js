import React, {Component} from 'react';

import './App.css';

import DeviceCharts from "./DeviceHighcharts";
// import DeviceCharts from "./DeviceCharts";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            devices: [
                {name: 'yolo'},
                // {name: 'yolo1'},
                // {name: 'yolo2'},
            ]
        };
    }

    render() {
        return (
            <div className="App">

                {
                    this.state.devices.map((device, idx) => {

                        return <DeviceCharts device={device} key={idx}/>
                    })
                }

            </div>
        );
    }
}


export default App;
