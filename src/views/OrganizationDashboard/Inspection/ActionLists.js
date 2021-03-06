import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Input, FormGroup, Label,  Form, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
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
      employeeList: [],     
      actionFormData: {},
      actionData: {},
      organizationId: "",
      rowIndex: -1,
      filterItem: { organizationId: '', categoryId: '', subCategoryId: '', templateId: '', employeeId: ''},

    } 
    
    this.handleDeleteAction = this.handleDeleteAction.bind(this);
    this.handleEditAction = this.handleEditAction.bind(this);
    this.filterInspectionList = this.filterInspectionList.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetSearchFilter = this.resetSearchFilter.bind(this);
    
  }
  // Fetch the organization List
  componentDidMount() { 
    this.inspectionList();
    this.getEmployeeList();
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

  
  

  /*get Employee List*/
  getEmployeeList(hideEmployee = true) {
    const filterItem = this.state.filterItem;
   
    this.setState( { loading: true}, () => { 
      commonService.getAPIWithAccessToken('employee')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
       
        this.setState({employeeList: res.data.data, organizationId: res.data.data[0] !== undefined ? res.data.data[0].organizationAuthId: "", filterItem: filterItem, loading: false});     
        
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
  handleDeleteAction(rowIndex){
    const actionInfo = this.state.inspectionList[rowIndex];
    this.setState( { loading: true }, () => {      
        commonService.deleteAPIWithAccessToken('action/'+actionInfo._id)
          .then( res => {        
            
            if ( undefined === res.data.data || !res.data.status ) { 
              this.setState( { loading: false} );
              toast.error(res.data.message);
              return;
            }             
            this.setState({ actionData: {}, loading: false, modal: false});
            toast.success(res.data.message);
            this.inspectionList();
          } )
          .catch( err => {         
            if(err.response !== undefined && err.response.status === 401) {
              localStorage.clear();
              this.props.history.push('/login');
            }
            else
              this.setState( { loading: false } );
              toast.error(err.message);
          } )        
      
    });
  }

  /* Edit Action*/
  handleEditAction(rowIndex){
    const actionInfo = this.state.inspectionList[rowIndex];    
    const actionData = {
      action_description: actionInfo.description, 
      employee_id: actionInfo.employeeId, 
      priority_input: actionInfo.priority,
      due_date: actionInfo.dueDate };
    this.setState({rowIndex: rowIndex, actionData: actionData, modal: true, formValid: true});
    
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      rowIndex: -1     
    });
  }

  submitHandler (event) {
    event.preventDefault();
    let actionFormData = this.state.actionData;
    actionFormData.priority_input = actionFormData.priority_input ? actionFormData.priority_input : 1;
    let formData = {authId: this.state.organizationId, description: actionFormData.action_description, employeeId: actionFormData.employee_id, priority: actionFormData.priority_input, dueDate: actionFormData.due_date, organizationId: this.state.organizationId};
    this.setState( { formProccessing: true }, () => {
      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        const actionInfo = this.state.inspectionList[rowIndex];
        formData.actionId = actionInfo._id;
        
        commonService.putAPIWithAccessToken('action', formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false, loading: false});
          toast.success(res.data.message);
          this.inspectionList();
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { formProccessing: false } );
            toast.error(err.message);
        } )
      }
      else{
        commonService.postAPIWithAccessToken('action', formData)
            .then( res => {        
              
              if ( undefined === res.data.data || !res.data.status ) { 
                this.setState( { formProccessing: false} );
                toast.error(res.data.message);
                return;
              }             
              this.setState({ actionData: {}, formProccessing: false, modal: false});
              toast.success(res.data.message);
              this.inspectionList();
            } )
            .catch( err => {         
              if(err.response !== undefined && err.response.status === 401) {
                localStorage.clear();
                this.props.history.push('/login');
              }
              else
                this.setState( { formProccessing: false } );
                toast.error(err.message);
            } )        
      }
    });
  }

  handleActionInput = event => {
    let actionFormData = this.state.actionData
    actionFormData[event.target.name] = event.target.value;
    this.setState({actionData: actionFormData});
  }

  resetSearchFilter() {
    this.setState({filterItem: { organizationId: '', categoryId: '', subCategoryId: '', templateId: '', employeeId: ''},});
    this.inspectionList();
  }
  render() {

    const { inspectionList, loading, employeeList} = this.state;     
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
                <strong>Action</strong> <Button color="abc" className="categoryAdd" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Add Action</Button>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <div className="search-filter">
                      <Row>                      
                        <Col md={"5"} lg={"5"}>
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
                        
                        <Col md={"4"} lg={"3"}>
                          <FormGroup className="filter-button-section"> 
                            <Label htmlFor="searchButton">&nbsp;</Label> 
                            <Button className="search-btn" id="searchButton" type="button" onClick={this.filterInspectionList}>Search</Button> 
                            <Button className="reset-btn" id="resetButton" type="button" onClick={this.resetSearchFilter}>Reset</Button> 
                          </FormGroup>
                                    
                        </Col>
                      </Row> 
                    </div> 
                  </Col>
                  <Col md={12}>
                    <div className="oep-table">
                    <ActionData data={inspectionList} deleteAction={this.handleDeleteAction} editAction={this.handleEditAction} dataTableLoadingStatus = {this.state.loading} />
                      </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            </div>
          </Col>
        </Row>   

        <Modal isOpen={this.state.modal } toggle={this.toggle} className="oep-model category-modal-section">
          <ModalHeader toggle={this.toggle}>Action</ModalHeader>
          <Form onSubmit={this.submitHandler}>
            <ModalBody>
              
              <FormGroup> 
                <Label htmlFor="action_description">Description</Label>            
                <Input type="textarea" placeholder="Description *" id="action_description" name="action_description" value={this.state.actionData.action_description} onChange={this.handleActionInput} required />
              </FormGroup>
              <FormGroup>      
                <Label htmlFor="employee_id">Assign</Label>            
                <Input type="select" placeholder="Employee *" id="employee_id" name="employee_id" value={this.state.actionData.employee_id} onChange={this.handleActionInput} required>
                  <option value="">Select Employee</option>         
                  {employeeList.map((employeeInfo, index) =>
                    <SetEmployeeDropDownItem key={index} employeeInfo={employeeInfo} />
                  )}       
                </Input>
              </FormGroup> 
             <FormGroup>      
                <Label htmlFor="priority_input">Priority</Label>            
                <Input type="select" placeholder="priority *" id="priority_input" name="priority_input" value={this.state.actionData.priority_input} onChange={this.handleActionInput} >
                  <option value="1">Low</option> 
                  <option value="2">Medium</option>  
                  <option value="3">High</option>                
                </Input>
              </FormGroup> 
              <FormGroup>      
                <Label htmlFor="due_date">Due</Label>            
                <Input type="date" id="due_date" name="due_date" value={this.state.actionData.due_date} onChange={this.handleActionInput} />
              </FormGroup> 
            </ModalBody>
            <ModalFooter>
              <Button className="submit-btn" disabled = {this.state.formProccessing} type="submit">{this.state.formProccessing ? "Processing..": "Submit"}</Button>
              <Button className="btnCancel" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>     
      </div>

    )
  }
}







function SetEmployeeDropDownItem(props){
  const employeeInfo = props.employeeInfo;
  return (<option value={employeeInfo.authId} >{employeeInfo.firstName+' '+employeeInfo.lastName}</option>)
}



export default ActionLists;
