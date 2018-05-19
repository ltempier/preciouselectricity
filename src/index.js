import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import highchartsTheme from './highchartsTheme';
import numeralConfig from './numeralConfig';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
