import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import highchartsTheme from './highchartsTheme';

highchartsTheme();
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
