import React, { Component } from 'react';
import './Transactions.css';


        const Transactions = (props) => {
        return(      
                <div className="TransactionsWrapper">
                    Add new Transaction &nbsp; 
                    {props.PLNdefinition}
                    <button> <i className="fas fa-plus"/></button>

                </div>
        )
        
    }



export default Transactions;