import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from 'react-router-dom';
import './index.css';
import App from './app/App';
import { Provider } from 'react-redux';
import { createStore } from './app/store/createStore';
// import reportWebVitals from './reportWebVitals';
import history from './app/utils/history';

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <Provider store={store}>
      <Router history={history}>
         <App />
      </Router>
   </Provider>
);

// reportWebVitals();
