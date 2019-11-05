import React, { Component } from 'react';
import './Transactions.css';
import { Table,Button } from 'reactstrap';


        const Transactions = (props) => {
        return(      
                <div className="TransactionsWrapper">
                    {/* Add new Transaction &nbsp; 
                    {props.PLNdefinition}
                    <button> <i className="fas fa-plus"/></button> */}
                    <Table className="table">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Order Title</th>
                                <th>Price (PLN)</th>
                                <th>Price (EURO)</th>
                                <th>Price (EURO)</th>
                                <th><i class="fa fa-trash" aria-hidden="true"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>asd</td>
                                <td>asdasd</td>
                                <td>asdadadasd</td>
                                <td>asdadadasd</td>
                                <td><Button color="danger" size="sm">Delete</Button></td>
                            </tr>
                        </tbody>
                    </Table>


                </div>
        )
        
    }



export default Transactions;