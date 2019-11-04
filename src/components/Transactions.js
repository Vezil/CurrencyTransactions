import React, { Component } from 'react';
import './Transactions.css';
import PropTypes from 'prop-types';


export default class Transactions extends Component{
    
    render(){
        const PLN = this.props.PLN;
        return(
            
                <div className="TransactionsWrapper">
                    Add new Transaction &nbsp; 
                    
                    <div>{ PLN }</div>
                    <button> <i className="fas fa-plus"/> {PLN}</button>
                </div>
                     
        )
    }
}