import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import { Table,Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';

class App extends Component {

state = {
  PLNdefinition:'4.27',
  transactionsData: [],
  newTransactionData: {
      name: '',
      pricePLN: "",
      priceEURO: "",
  },

  editTransactionData: {
    id: '',
    name: '',
    pricePLN: "",
    priceEURO: "",
},

  newTransactionModal: false,
  
}

componentWillMount() {

 this._refreshTransactions();

}

toggleNewTransactionModal() {

  this.setState({
    newTransactionModal: !this.state.newTransactionModal
  });
}


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

editTransaction(name, pricePLN, priceEURO, id) {

  
  this.setState({

    editTransactionData: { name, pricePLN, priceEURO, id }
    
  });

}

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

  let x = this.state.transactionsData;
  

  let sumInPLN = 0;
  let sumInEuro = 0;
  let maxInPLN = 0;
  let maxInEuro = 0;

// SUM AND MAX{
  x.forEach((transaction) => {
    sumInEuro += parseFloat(transaction.priceEURO);
    sumInEuro = Number(sumInEuro.toFixed(2));
  });


  x.forEach((transaction) => {
    sumInPLN += parseFloat(transaction.pricePLN);
    sumInPLN = Number(sumInPLN.toFixed(2));
  });

  x.forEach((transaction) => {
    if(maxInEuro <= parseFloat(transaction.priceEURO)){

      maxInEuro = parseFloat(transaction.priceEURO);
      maxInEuro = maxInEuro.toFixed(2);
    }
  });

  x.forEach((transaction) => {
    if(maxInPLN <= parseInt(transaction.pricePLN)){
      maxInPLN = parseInt(transaction.pricePLN);
      maxInPLN = maxInPLN.toFixed(2);
    }
  });
// }SUM AND MAX




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
                    EURO&nbsp;<i className="fas fa-euro-sign"></i> = <b>{ this.state.PLNdefinition }</b> PLN, CHANGE:
                    <div class="inputfield">
                        <input type="number" placeholder="4.27" min="0.01" step="0.01" onChange={(e) => {
                                         
                          let precision = parseFloat(e.target.value);
                          precision = precision.toFixed(2);
                          if(precision<=0) {

                              this.setState({
                                PLNdefinition: precision
      
                                });
                              return(alert("Currency cannot be negative"));                           
                          }
                          else if(precision>0){
                          this.setState({
                          PLNdefinition: precision

                          });

                       let eurobefore = 0;

                       let pricePLN = 0;
                       let priceEURO = 0;
                       let name;

                       let count = 0;
                      
                       

                       this.state.transactionsData.map((transaction) => {
                        eurobefore=0;
                        pricePLN=0;
                        priceEURO=0;
                        count = 0;               

                        let { editTransactionData } = this.state;

                        eurobefore = (transaction.pricePLN/transaction.priceEURO);
                        
                        count = (transaction.pricePLN/eurobefore);
                        pricePLN = parseFloat(count*precision);
                        pricePLN = Number(pricePLN.toFixed(2));                      
                        priceEURO = parseFloat(transaction.priceEURO);
                        priceEURO = priceEURO.toFixed(2);
                        //console.log(eurocount);

                        editTransactionData.id = transaction.id;
                        editTransactionData.name = transaction.name;
                        editTransactionData.pricePLN = pricePLN;
                        editTransactionData.priceEURO = priceEURO;

                        name = editTransactionData.name 
                        this.setState({ editTransactionData });


                        axios.put('http://localhost:3000/transactions/' + this.state.editTransactionData.id, {

                         name,pricePLN,priceEURO
                      
                         }).then((response) => {
                      
                              this._refreshTransactions();
                             // console.log(response.data);
                              
                         });
                        
                                               
                    
                       });
                                   
                                      
                     }
                     else{
                       alert("Error. Enter the correct number");
                     }
                       
                    }}/>

                    </div>
        </div>

      <div className="buttonAdd"><Button color="primary" onClick={this.toggleNewTransactionModal.bind(this)}>Add New Transaction &nbsp; <i className="fas fa-plus"/></Button></div>
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

                newTransactionData.priceEURO = parseFloat(newTransactionData.priceEURO);
                newTransactionData.pricePLN = parseFloat(newTransactionData.pricePLN);

                newTransactionData.priceEURO = Number((newTransactionData.priceEURO).toFixed(2));
                newTransactionData.pricePLN = Number((newTransactionData.pricePLN).toFixed(2));


                sumInEuro = Number(sumInEuro.toFixed(2));
                this.setState({ newTransactionData });
              }}
              />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={
            
          
            this.state.PLNdefinition >= 0 ? this.addTransaction.bind(this) : console.log("error")
            
            }>Add Transaction &nbsp; <i className="fas fa-plus"/> </Button>{' '}
          <Button color="secondary" onClick={this.toggleNewTransactionModal.bind(this)}>Cancel &nbsp; <i className="fas fa-undo"></i> </Button>
        </ModalFooter>
      </Modal>

                <div className="TransactionsWrapper">
                    <Table className="table">
                        <thead>
                            <tr>
                                
                                <th>Order Title</th>
                                <th>Price (PLN)</th>
                                <th>Price (EURO) </th>
                                
                                <th><i class="fa fa-trash" aria-hidden="true"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                          {transactionsData}
                        </tbody>
                    </Table>

                    <div className="summax">
                          <hr className="hr"></hr>

                          <div className="sumPLN">Sum of Transaction (In PLN) : <b>{ sumInPLN }</b></div>
                          <div className="sumEuro">Sum of Transaction (In EURO) : <b>{ sumInEuro }</b></div>

                          <hr className="hr"></hr>

                          <div className="sumPLN">Max in Transactions (PLN) : <b>{ maxInPLN }</b></div>
                          <div className="sumEuro">Max in Transactions (EURO) : <b>{ maxInEuro }</b></div>
                        
                          <hr className="hr"></hr>
                    </div>

                </div>

                <Footer/>
   </div>
  );
}

}
export default App;
