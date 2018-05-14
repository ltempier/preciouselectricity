import React, {Component} from 'react';
import {VictoryChart, VictoryBar, Bar, VictoryAxis, VictoryTheme} from 'victory';

import './DeviceCharts.css'

class DeviceCharts extends Component {

    constructor(props) {

        console.log(props);

        super(props);

        this.state = {
            day: [
                {x: '0-1', y: 100},
                {x: '2-3', y: 100},
                {x: '4-5', y: 100},
                {x: '6-7', y: 100},
                {x: '8-9', y: 100},
                {x: '10-11', y: 100},
                {x: '12-13', y: 100},
                {x: '14-15', y: 100},
                {x: '16-17', y: 100},
                {x: '18-19', y: 100},
                {x: '20-21', y: 100},
                {x: '22-23', y: 100}
            ],
            week: [
                {x: 'L', y: 100},
                {x: 'M', y: 100},
                {x: 'M', y: 100},
                {x: 'J', y: 100},
                {x: 'V', y: 100},
                {x: 'S', y: 100},
                {x: 'D', y: 100}
            ],
            year: [
                {x: 'J', y: 100},
                {x: 'F', y: 100},
                {x: 'M', y: 100},
                {x: 'A', y: 100},
                {x: 'M', y: 100},
                {x: 'J', y: 100},
                {x: 'J', y: 100},
                {x: 'A', y: 100},
                {x: 'S', y: 100},
                {x: 'O', y: 100},
                {x: 'N', y: 100},
                {x: 'D', y: 100}
            ]
        };


        this.chartConfig = {
            theme: VictoryTheme.grayscale,
            height: 400,
            width: 700,
            domainPadding: {x: 30, y: 0}
        };

        this.dayValueChange = this.dayValueChange.bind(this)
    }


    dayValueChange(e) {

        console.log(e)
        console.log(e.scale.y(e.y))

        let day = [...this.state.day];

        if (e.y0 = 0) {

        }

        let y = e.y * e.datum.y / e.y0;

        if (y < 0)
            y = 0;
        if (y > 100)
            y = 100;

        day[e.index] = {...day[e.index], y: y};
        this.setState({day});
    }


    render() {


        // const dayValueChange = (e) => {
        //     console.log(e)
        //
        //     // let day = [...this.state.day];
        //     // day[index] = {...day[index], key: ''};
        //     // this.setState({day});
        //
        //     // this.setState({
        //     //     day: update(this.state.day, {1: {name: {$set: 'updated field name'}}})
        //     // })
        // }

        return (
            <div className="device-charts-container">

                <div className="day-charts-container">
                    <VictoryChart {...this.chartConfig}>
                        <VictoryBar data={this.state.day}
                                    dataComponent={
                                        <Bar events={{onMouseMove: this.dayValueChange}}/>
                                    }

                                    // events={[
                                    //     {
                                    //         target: "data",
                                    //         eventHandlers: {
                                    //             onClick: () => ({
                                    //                 target: "data",
                                    //                 mutation: (e) => this.dayValueChange(e)
                                    //             })
                                    //         }
                                    //     }
                                    // ]}


                        />
                        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`}/>
                        <VictoryAxis tickFormat={(tick) => `${tick}`}/>
                    </VictoryChart>
                </div>
                <div className="week-charts-container">
                    <VictoryChart {...this.chartConfig}>
                        <VictoryBar data={this.state.week}/>
                        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`}/>
                        <VictoryAxis tickFormat={(tick) => `${tick}`}/>
                    </VictoryChart>
                </div>

                <div className="year-charts-container">
                    <VictoryChart {...this.chartConfig}>
                        <VictoryBar data={this.state.year}/>
                        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`}/>
                        <VictoryAxis tickFormat={(tick) => `${tick}`}/>
                    </VictoryChart>
                </div>


            </div>
        );
    }
}


export default DeviceCharts;
