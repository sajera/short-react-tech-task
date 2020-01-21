
// outsource dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// STYLES inject ...
import './style';
// polyfill
import './polyfill';
//
import registerServiceWorker from './registerServiceWorker';

// local dependencies
import { store } from './store';

import Chart from './chat';

ReactDOM.render(
    <Provider store={store}>
        <Chart />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
