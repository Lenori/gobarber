import React from 'react';
import {Router} from'react-router-dom';
import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';

import {ToastContainer} from 'react-toastify';

function App() {
  return(
    <Router history={history}>
      <Routes />
      <GlobalStyle />
      <ToastContainer autoClose={2500} />
    </Router>
  );
}

export default App;
