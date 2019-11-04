import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Definition from './components/Definition';
import Transactions from './components/Transactions';
import PropTypes from 'prop-types';

function App() {
  return (
    <React.Fragment>
        <Header/>
        <Definition/>
        <Transactions/>
    </React.Fragment>
  );
}

export default App;
