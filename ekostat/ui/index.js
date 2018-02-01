import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './views/app';
import 'normalize.css';
import './index.css';

ReactDOM.render(
	<App />,
	document.querySelector('#root')
);
