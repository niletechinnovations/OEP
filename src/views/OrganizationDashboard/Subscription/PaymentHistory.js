import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Input, FormGroup, Label} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import PaymentHistoryData from './PaymentHistoryData';
import './PaymentHistory.css'

class PaymentHistory extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      paymentHistory: [],
      loading: true,
      formProccessing: false,
      rowIndex: -1,
      filterItem: { filter_organization: '', subscription_id: '', planId: ''},
    }    
    this.filterPaymentHistory = this.filterPaymentHistory.bind(this);
    this.resetSearchFilter = this.resetSearchFilter.bind(this);
    
  }
  // Fetch the Employee List
  componentDidMount() { 
    this.paymentHistory();
    
  }
  /*Subscriber List API*/
  paymentHistory(filterItem = {}) {
    let filterOptions = "";
    if(filterItem.filter_organization_id !== undefined && filterItem.filter_organization_id !== "" ) 
      filterOptions += (filterOptions !=="" ) ? "&organizationAuthId="+filterItem.filter_organization_id: "?organizationAuthId="+filterItem.filter_organization_id;
    if(filterItem.planId !== undefined && filterItem.planId !== "" ) 
      filterOptions += (filterOptions !=="" ) ? "&planId="+filterItem.planId: "?planId="+filterItem.planId;
    if(filterItem.subscription_id !== undefined && filterItem.subscription_id !== "") 
      filterOptions += (filterOptions !=="" ) ? "&transactionProfileId="+filterItem.subscription_id: "?transactionProfileId="+filterItem.subscription_id;
    if(filterItem.custom_search !== undefined && filterItem.custom_search !== "" ) 
      filterOptions += (filterOptions !=="" ) ? "&organizationName="+filterItem.custom_search: "?organizationName="+filterItem.custom_search;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('statistics/subscriber-payment-history'+filterOptions)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, paymentHistory: res.data.data.listItem});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else {
            this.setState( { loading: false } );
            toast.error(err.message);
          }
        } )
    } )
  }

  
  filterPaymentHistory(){
    const filterItem = this.state.filterItem;
    this.paymentHistory(filterItem);
  }
  

  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };
  
  resetSearchFilter() {
    this.setState({filterItem: { filter_organization: '', subscription_id: '', planId: ''}});
    this.paymentHistory();
  }

  
 
 
  render() {

    const { paymentHistory, loading} = this.state;     
    
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    
    return (
      <div className="animated fadeIn">
        <Row>
          
          {loaderElement}
          <Col lg={12}>
            <div className="oep-em-info">
              <Card className="oep-card">
                <CardHeader className="mainHeading">
                  <strong>Subscriber List</strong> 
                </CardHeader>
                <CardBody>
                  
                  <Row>
                    <Col md={12}>
                      <div className="search-filter">
                      <Row>
                        <Col md={"3"}>
                          <FormGroup> 
                            <Label htmlFor="transction profile id">Subscription Id</Label>            
                            <Input type="text" placeholder="Subscription Id" id="subscription_id" name="subscription_id" value={this.state.filterItem.subscription_id} onChange={this.changeFilterHandler} />
                          </FormGroup>  
                        </Col>
                        <Col md={"3"}>
                          <FormGroup className="filter-button-section"> 
                            <Label htmlFor="filter_organization_id">&nbsp;</Label> 
                            <Button className="search-btn"  type="button" onClick={this.filterPaymentHistory}>Search</Button> 
                            <Button color="warning" className="search-btn" id="resetButton" type="button" onClick={this.resetSearchFilter}>Reset</Button> 
                          </FormGroup>             
                        </Col>
                      </Row>
                      </div>  
                    </Col>
                    <Col md={12}>
                      <div className="oep-table">
                        <PaymentHistoryData data={paymentHistory}  />
                      </div>
                    </Col>
                  </Row> 
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
       
      </div>

    )
  }
}

export default PaymentHistory;
