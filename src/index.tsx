import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { defineCustomElements } from 'kws-weather-widgets/loader';

ReactDOM.render(<App />, document.getElementById('root'));
defineCustomElements(window);
