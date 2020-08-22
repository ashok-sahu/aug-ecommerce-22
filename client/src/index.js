import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import './assets/main.css'
import './assets/index.css'
import 'react-toastify/dist/ReactToastify.css'

//redux
import {Provider} from 'react-redux'
import store from './config/store/store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

