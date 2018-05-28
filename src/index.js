import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import {Provider} from "react-redux";
import store from "./store/index";

import registerServiceWorker from './registerServiceWorker';

import highchartsTheme from './tools/highchartsTheme';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

highchartsTheme();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
