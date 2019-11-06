import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import axios from 'axios';
import { Table,Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { arrowFunctionExpression } from '@babel/types';

class App extends Component {

state = {
  PLNdefinition:'4.27',
  transactionsData: [],
  newTransactionData: {
      name: '',
      pricePLN: "",
      priceEURO: "",
  },

//   editTransactionData: {
//     name: '',
//     pricePLN: "",
//     priceEURO: "",
// },

  newTransactionModal: false,
  //editTransactionModal: false
}

componentWillMount() {

 this._refreshTransactions();

}

toggleNewTransactionModal() {

  this.setState({
    newTransactionModal: !this.state.newTransactionModal
  });
}

// toggleEditTransactionModal() {

//   this.setState({
//     editTransactionModal: !this.state.editTransactionModal
//   });
// }


addTransaction(){
  axios.post('http://localhost:3000/transactions', this.state.newTransactionData).then((response)=>{
    let { transactionsData } = this.state;

    transactionsData.push(response.data);

    this.setState({ transactionsData, newTransactionModal: false, newTransactionData: {
      name: '',
      pricePLN: "",
      priceEURO: ""
  }});
  });
}

// updateTransaction() {

//   let { name, pricePLN, priceEURO } = this.state.editTransactionData;

//    axios.put('http://localhost:3000/transactions' + this.state.editTransactionData.id, {

//     name,pricePLN,priceEURO

//    }).then((response) => {

//         this._refreshTransactions();

//         this.setState({

//           editTransactionData: {
//             name: '',
//             pricePLN: "",
//             priceEURO: "",
//         }
//         });
//    })

// }

// editTransaction(name, pricePLN, priceEURO) {

//   this.setState({

//     editTransactionData: { name, pricePLN, priceEURO }, editTransactionModal: !this.state.editTransactionModal

//   });

// }

_refreshTransactions(){

  axios.get("http://localhost:3000/transactions").then((response) =>{
    this.setState({
      transactionsData: response.data    
    })
});
}

deleteTransaction(id) {
  axios.delete("http://localhost:3000/transactions/" + id).then((response) => {
     this._refreshTransactions();
  });
}

render(){
  let transactionsData = this.state.transactionsData.map((transaction) => {
    return(
      <tr key={transaction.id}>
      <td>{transaction.name}</td>
      <td>{transaction.pricePLN}</td>
      <td>{transaction.priceEURO}</td>
      <td><Button color="danger" size="sm" onClick= { this.deleteTransaction.bind(this, transaction.id) }>Delete</Button></td>
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
      <Modal isOpen={this.state.newTransactionModal} toggle={this.toggleNewTransactionModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewTransactionModal.bind(this)}>Add New Transaction </ModalHeader>
        <ModalBody>
          <FormGroup>
              <Label for="name">Order Title</Label>
              <Input id="name" value={this.state.newTransactionData.name}
              onChange={(e) =>{
                let { newTransactionData } = this.state;
                newTransactionData.name = e.target.value;

                this.setState({ newTransactionData });
              }}
              />
          </FormGroup>
          <FormGroup>
              <Label for="priceEURO">Price (EURO)</Label>
              <Input id="priceEURO" value={this.state.newTransactionData.priceEURO}
              onChange={(e) =>{
                let { newTransactionData } = this.state;
                let PLN = this.state.PLNdefinition;
                
                newTransactionData.priceEURO = e.target.value;
                newTransactionData.pricePLN = e.target.value * PLN;

                this.setState({ newTransactionData });
              }}
              />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addTransaction.bind(this)}>Add Transaction</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewTransactionModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

                <div className="TransactionsWrapper">
                    <Table className="table">
                        <thead>
                            <tr>
                                
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
