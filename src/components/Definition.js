import React, { Component } from 'react';
import './Definition.css';

var PLN = 4.22;

export default class Definition extends Component{
    render(){
        return(
        
            
                <h3 className="definitionchoose">
                    1 EURO = { PLN } PLN, CHANGE<button onClick="showChanger();">(click)</button>
                </h3>
            
           
        )
    }
}
