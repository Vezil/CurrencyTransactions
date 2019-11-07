import React, { Component } from 'react';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class Footer extends Component {

    render(){
        return(
            <div className="Footer page-footer text-center p-2">© 2019 Copyright: Szymon Wojaczek&nbsp;&nbsp;
            <a href="https://github.com/Vezil/" target="_blank">Github</a></div>
        );
    }
}

