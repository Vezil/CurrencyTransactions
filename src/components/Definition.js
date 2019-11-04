import React, { Component } from 'react';
import './Definition.css';

// product provider 1:30:00 ok.


export default class Definition extends Component{

state = {
    PLN:'4.27',
}
    render(){

        return(
        
            
                <div className="definitionchoose">
                    1 EURO = <b>{ this.state.PLN }</b> PLN, CHANGE:
                    <div class="inputfield">
                        <input type="number" placeholder="4.27" onChange={(e) => this.setState({PLN: e.target.value})}/>

                    </div>
                </div>
            
           
        )
        
    }
}
