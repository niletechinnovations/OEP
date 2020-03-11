import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Input, FormGroup, Label} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import SubscriberData from './SubscriberData';
import './Subscriber.css'

class SubscriberList extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      subscriberList: [],
      loading: true,
      formProccessing: false,
      rowIndex: -1,
      filterItem: { filter_organization: '', custom_search: '', planId: ''},
    }    
    this.filterSubscriberList = this.filterSubscriberList.bind(this);
    
  }
  // Fetch the Employee List
  componentDidMount() { 
    this.subscriberList();
    
  }
  /*Subscriber List API*/
  subscriberList(filterItem = {}) {
    let filterOptions = "";
    if(filterItem.filter_organization_id !== undefined && filterItem.filter_organization_id !== "" ) 
      filterOptions += (filterOptions !=="" ) ? "&organizationAuthId="+filterItem.filter_organization_id: "?organizationAuthId="+filterItem.filter_organization_id;
    if(filterItem.planId !== undefined && filterItem.planId !== "" ) 
      filterOptions += (filterOptions !=="" ) ? "&planId="+filterItem.planId: "?planId="+filterItem.planId;
   
    if(filterItem.custom_search !== undefined && filterItem.custom_search !== "" ) 
      filterOptions += (filterOptions !=="" ) ? "&organizationName="+filterItem.custom_search: "?organizationName="+filterItem.custom_search;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('organization/subscriber-list'+filterOptions)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, subscriberList: res.data.data});     
         
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

  
  filterSubscriberList(){
    const filterItem = this.state.filterItem;
    this.subscriberList(filterItem);
  }
  

  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };
  
  

  
 
 
  render() {

    const { subscriberList, loading} = this.state;     
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    
    return (
      <div className="animated fadeIn">
        <Row>
          
          {loaderElement}
          <Col lg={12}>
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
                          <Label htmlFor="filter_organization_id">Search By Email/ Organization Name</Label>            
                          <Input type="text" placeholder="Search By Email/ Name" id="custom_search" name="custom_search" value={this.state.filterItem.custom_search} onChange={this.changeFilterHandler} />
                        </FormGroup>  
                      </Col>
                      <Col md={"2"}>
                        <FormGroup className="filter-button-section"> 
                          <Label htmlFor="filter_organization_id">&nbsp;</Label> 
                          <Button className="search-btn"  type="button" onClick={this.filterSubscriberList}>Search</Button> 
                        </FormGroup>             
                      </Col>
                    </Row>
                    </div>  
                  </Col>
                  <Col md={12}>
                    <SubscriberData data={subscriberList}  />
                  </Col>
                </Row> 
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>

    )
  }
}

export default SubscriberList;
