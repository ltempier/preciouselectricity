import React, {Component} from 'react';

// import {BrowserRouter as Router, Route} from "react-router-dom";
// import Navbar from "./Navbar";

import Simulation from "./Simulation";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Simulation/>

        // return (
        //     <Router>
        //         <div className="App">
        //             <Route path="/" component={Navbar}/>
        //             <Route path="/simulation" component={Simulation}/>
        //         </div>
        //     </Router>
        // );
    }
}


export default App;
