import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import axios from 'axios';
import { Table,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component {

state = {
  PLNdefinition:'4.27',
  transactionsData: [],
  newTransactionModal: false
}

componentWillMount() {

  axios.get("http://localhost:3000/transactions").then((response) =>{
      this.setState({
        transactionsData: response.data    
      })
      
  });
}
toggleNewTransactionModal() {

  this.state.newTransactionModal = true;
}

render(){
  let transactionsData = this.state.transactionsData.map((transaction) => {
    return(
      <tr key={transaction.id}>
      <td>{transaction.id}</td>
      <td>{transaction.pricePLN}</td>
      <td>{transaction.priceEURO}</td>
      <td>{transaction.name}</td>
      <td><Button color="danger" size="sm">Delete</Button></td>
     </tr>

    )
  });
  return (
    <div className="App">
        <Header/>



        <div className="definitionchoose">
                    1 EURO = <b>{ this.state.PLNdefinition }</b> PLN, CHANGE:
                    <div class="inputfield">
                        <input type="number" placeholder="4.27" onChange={(e) => this.setState({PLNdefinition: e.target.value})}/>

                    </div>
        </div>

        <Button color="primary" onClick={this.toggleNewTransactionModal.bind(this)}>Add New Transaction &nbsp; <i className="fas fa-plus"/></Button>
      <Modal isOpen={this.state.NewTransactionModal} toggle={this.toggleNewTransactionModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewTransactionModal.bind(this)}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleNewTransactionModal.bind(this)}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewTransactionModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

                <div className="TransactionsWrapper">
                    <Table className="table">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Order Title</th>
                                <th>Price (PLN)</th>
                                <th>Price (EURO)</th>
                                
                                <th><i class="fa fa-trash" aria-hidden="true"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                          {transactionsData}   
                        </tbody>
                    </Table>


                </div>
        </div>
  );
}

}
export default App;
