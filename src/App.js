import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Definition from './components/Definition';

function App() {
  return (
    <React.Fragment>
        <Header/>
        <Definition/>
    </React.Fragment>
  );
}

export default App;
