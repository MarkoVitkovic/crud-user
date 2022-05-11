import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import { HashRouter } from "react-router-dom"


if (document.getElementById('app')) {
    ReactDOM.render(<HashRouter><Main /></HashRouter>, document.getElementById('app'));
}
