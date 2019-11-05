import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Transactions from './components/Transactions';


class App extends Component {
  
state = {
  PLNdefinition:'4.27',
}
render(){
  return (
    <div className="App">
        <Header/>
        <div className="definitionchoose">
                    1 EURO = <b>{ this.state.PLNdefinition }</b> PLN, CHANGE:
                    <div class="inputfield">
                        <input type="number" placeholder="4.27" onChange={(e) => this.setState({PLNdefinition: e.target.value})}/>

                    </div>
                </div>
        <Transactions PLNdefinition={this.state.PLNdefinition}/>
      </div>
  );
}

}
export default App;
