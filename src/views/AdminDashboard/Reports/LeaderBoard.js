import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Input, FormGroup, Label} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import LeaderBoardData from './LeaderBoardData';
import './LeaderBoard.css'

class LeaderBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      leaderBoardList: [],
      loading: true,
      formProccessing: false,
      rowIndex: -1,
      filterItem: { filter_organization: '', custom_search: '', storeName: ''},
    }    
    this.filterLeaderBoardList = this.filterLeaderBoardList.bind(this);
    
  }
  // Fetch the Employee List
  componentDidMount() { 
    
    this.leaderBoardList();
    
  }
  /*Subscriber List API*/
  leaderBoardList(filterItem = {}) {
    let filterOptions = "";
    if(filterItem.filter_organization_id !== undefined && filterItem.filter_organization_id !== "" ) 
      filterOptions += (filterOptions !=="" ) ? "&organizationAuthId="+filterItem.filter_organization_id: "?organizationAuthId="+filterItem.filter_organization_id;
    if(filterItem.storeName !== undefined && filterItem.storeName !== "" ) 
      filterOptions += (filterOptions !=="" ) ? "&storeName="+filterItem.storeName: "?storeName="+filterItem.storeName;
   
    if(filterItem.custom_search !== undefined && filterItem.custom_search !== "" ) 
      filterOptions += (filterOptions !=="" ) ? "&organizationName="+filterItem.custom_search: "?organizationName="+filterItem.custom_search;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('dashboard/leaderboard'+filterOptions)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, leaderBoardList: res.data.data});     
         
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

  
  filterLeaderBoardList(){
    const filterItem = this.state.filterItem;
    this.leaderBoardList(filterItem);
  }
  

  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };
  
  

  
 
 
  render() {

    const { leaderBoardList, loading} = this.state;     
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
                <strong>LeaderBoard</strong> 
              </CardHeader>
              <CardBody>
                
                <Row>
                  <Col md={12}>
                    <div className="search-filter">
                    <Row>
                      <Col md={"4"}>
                        <FormGroup> 
                          <Label htmlFor="filter_organization_id">Search By Organization Email/ Organization Name</Label>            
                          <Input type="text" placeholder="Search By Email/ Name" id="custom_search" name="custom_search" value={this.state.filterItem.custom_search} onChange={this.changeFilterHandler} />
                        </FormGroup>  
                      </Col>
                      <Col md={"4"}>
                        <FormGroup> 
                          <Label htmlFor="storeName">Search By Food Truck Name</Label>            
                          <Input type="text" placeholder="Search By Food Truck Name" id="storeName" name="storeName" value={this.state.filterItem.storeName} onChange={this.changeFilterHandler} />
                        </FormGroup>  
                      </Col>
                      <Col md={"2"}>
                        <FormGroup className="filter-button-section"> 
                          <Label htmlFor="filter_organization_id">&nbsp;</Label> 
                          <Button className="search-btn"  type="button" onClick={this.filterLeaderBoardList}>Search</Button> 
                        </FormGroup>             
                      </Col>
                    </Row>
                    </div>  
                  </Col>
                  <Col md={12}>
                    <LeaderBoardData data={leaderBoardList}  />
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

export default LeaderBoard;
