import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Input, FormGroup, Label} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import ActionData from './ActionData';
import './inspection.css'

class ActionLists extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      inspectionList: [],
      loading: true,
      organizationList: [],
      employeeList: [],
      templateList: [],
      subCategoryList: [],
      categoryList: [], 
      filterItem: { organizationId: '', categoryId: '', subCategoryId: '', templateId: '', employeeId: ''},

    } 
    
    this.handleDeleteInspection = this.handleDeleteInspection.bind(this);
    this.filterInspectionList = this.filterInspectionList.bind(this);
    this.resetSearchFilter = this.resetSearchFilter.bind(this);
  }
  
  // Fetch the organization List
  componentDidMount() { 
    this.inspectionList();
    this.organizationList();
    //this.categoryList();
  }
  /*organization List API*/
  inspectionList(filterItem = {}) {
    let queryString = "";

    if(filterItem.categoryId !== undefined && filterItem.categoryId !== "")
      queryString += (queryString === "") ? "?categoryId="+filterItem.categoryId : "&categoryId="+filterItem.categoryId;
    if(filterItem.subCategoryId !== undefined && filterItem.subCategoryId !== "")
      queryString += (queryString === "") ? "?subCategoryId="+filterItem.subCategoryId : "&subCategoryId="+filterItem.subCategoryId;
    if(filterItem.organizationId !== undefined && filterItem.organizationId !== "")
      queryString += (queryString === "") ? "?organizationId="+filterItem.organizationId : "&organizationId="+filterItem.organizationId;
    if(filterItem.employeeId !== undefined && filterItem.employeeId !== "")
      queryString += (queryString === "") ? "?employeeId="+filterItem.employeeId : "&employeeId="+filterItem.employeeId;
    if(filterItem.templateId !== undefined && filterItem.templateId !== "")
      queryString += (queryString === "") ? "?templateId="+filterItem.templateId : "&templateId="+filterItem.templateId;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken(`action`+queryString)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, inspectionList: res.data.data});     
         
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
  

  /*Organization List API*/
  organizationList() {   
    
    commonService.getAPIWithAccessToken('organization')
      .then( res => {       
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( { loading: false } );
          toast.error(res.data.message);
          return;
        }   

        this.setState({organizationList: res.data.data});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else 
          this.setState( { loading: false } );
      } )
    
  }

 

  /*get Employee List*/
  getEmployeeList(organizationId, hideEmployee = true) {
    const filterItem = this.state.filterItem;
    if(organizationId === "") {      
      filterItem.employeeId = '';
      this.setState({ filterItem: filterItem, employeeList: [] });
      return;
    }
    this.setState( { loading: true}, () => { 
      commonService.getAPIWithAccessToken('employee?organizationId='+organizationId)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        if(hideEmployee)
          filterItem.employeeId = '';
        this.setState({employeeList: res.data.data, filterItem: filterItem, loading: false});     
        
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else { 
          this.setState( {  loading: false } );        
          toast.error(err.message); 

        }
      } )
    })

  }

  /*Get Template List*/
  getTemplateList(categoryId, subCategoryId, hideSubcat = true){
    const filterItem = this.state.filterItem;
    if(categoryId === "" || subCategoryId === "") {      
      filterItem.templateId = '';
      this.setState({ filterItem: filterItem, templateList: [] });
      return;
    }
    this.setState( { loading: true}, () => { 
      commonService.getAPIWithAccessToken("template?categoryId="+categoryId+"&subCategoryId="+subCategoryId)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        if(hideSubcat)
          filterItem.templateId = '';
        this.setState({templateList: res.data.data, filterItem: filterItem, loading: false});     
        
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else { 
          this.setState( {  loading: false } );        
          toast.error(err.message); 

        }
      } )
    })
  }
  /*Handle catgeory Input Change and bind subcategory*/
  changeCategoryHandle = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
    this.getSubCategoryList(value);
  }

  /* Handle Subcategory Change*/
  changeSubCategoryHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
    this.getTemplateList(filterItem.categoryId, value);
  }

  /*Handle Employee Change*/
  changeOrganizationHandle = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
    this.getEmployeeList(value);
  }

  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };

  filterInspectionList(){
    const filterItem = this.state.filterItem;
    this.inspectionList(filterItem);
  }


  /* Delete organization*/
  handleDeleteInspection(rowIndex){
    
  }

  resetSearchFilter() {
    this.setState({filterItem: { organizationId: '', categoryId: '', subCategoryId: '', templateId: '', employeeId: ''}});
    this.inspectionList();
  }
  
  render() {

    const { inspectionList, loading, organizationList, templateList, employeeList} = this.state;     
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
                <strong>Action</strong> 
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <div class="search-filter">
                      <Row>
                        <Col md={3}>
                          <FormGroup> 
                            <Label htmlFor="organizationId">Organization</Label>            
                            <Input type="select" placeholder="Organization *" id="organizationId" name="organizationId" value={this.state.filterItem.organizationId} onChange={this.changeOrganizationHandle} >
                              <option value="">Select Organization</option>
                              {organizationList.map((organizationInfo, index) =>
                                <SetOrganizationDropDownItem key={index} organizationInfo={organizationInfo} />
                              )}
                            </Input>
                          </FormGroup>  
                        </Col>
                        <Col lg={3}>
                          <FormGroup> 
                            <Label htmlFor="employeeId">Employee </Label>            
                            <Input type="select" placeholder="Employee Name *" id="employeeId" name="employeeId" value={this.state.filterItem.employeeId} onChange={this.changeFilterHandler}  >
                              <option value="">Select Employee</option>
                              {employeeList.map((employeeInfo, index) =>
                                <SetEmployeeDropDownItem key={index} employeeInfo={employeeInfo} selectedCategory={this.state.filterItem.employeeId} />
                              )}
                            </Input>
                          </FormGroup>
                        </Col>
                        
                        <Col lg={3}>
                          <FormGroup> 
                            <Label htmlFor="templateId">Template</Label>            
                            <Input type="select" placeholder="Template Name *" id="templateId" name="templateId" value={this.state.filterItem.templateId} onChange={this.changeFilterHandler}  >
                              <option value="">Select Template</option>
                              {templateList.map((templateItem, index) =>
                                <SetTemplateDropDownItem key={index} templateItem={templateItem} selectedCategory={this.state.filterItem.templateId} />
                              )}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup className="filter-button-section"> 
                            <Label htmlFor="searchButton">&nbsp;</Label> 
                            <Button color="" className="search-btn" id="searchButton" type="button" onClick={this.filterInspectionList}>Search</Button>
                            <Button className="search-btn" id="resetButton" type="button" onClick={this.resetSearchFilter}>Reset</Button>  
                          </FormGroup>             
                        </Col>
                      </Row>
                    </div>  
                  </Col>
                  <Col md={12}>
                    <ActionData data={inspectionList} deleteInspectionAction={this.handleDeleteInspection} dataTableLoadingStatus = {this.state.loading} />
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

function SetOrganizationDropDownItem (props) {
  const organizationInfo = props.organizationInfo;
  return (<option value={organizationInfo.authId} >{organizationInfo.organizationName}</option>)
}

function SetEmployeeDropDownItem(props){
  const employeeInfo = props.employeeInfo;
  return (<option value={employeeInfo.authId} >{employeeInfo.firstName+' '+employeeInfo.lastName}</option>)
}

function SetTemplateDropDownItem(props){
  const templateDetail = props.templateItem;
  return (<option value={templateDetail.templateId} >{templateDetail.templateName}</option>)
}

export default ActionLists;
