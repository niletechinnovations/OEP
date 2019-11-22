import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../../core/services/commonService';
import { FormErrors } from '../../../Formerrors/Formerrors';

import Loader from '../../../Loader/Loader';
import EmployeeData from './EmployeeData';
import './Employee.css'

class Employee extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      EmployeeList: [],
      organizationList: [],
      loading: true,
      formProccessing: false,
      rowIndex: -1,
      formField: { organizationId: '', email: '', first_name: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '' },
      formErrors: { email: '', employee_name: '', role: '', error: ''},
      formValid: false,
      filterItem: { filter_organization_id: ''},
    } 
    this.handleEditEmployee = this.handleEditEmployee.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
    this.filterEmployeeList = this.filterEmployeeList.bind(this);
    
  }
  // Fetch the Employee List
  componentDidMount() { 
    const { match: { params } } = this.props;
    let organizationId = "";
    if(params.organizationId !== undefined) {
      organizationId = params.organizationId;
      let filterItem = this.state.filterItem;
      filterItem.filter_organization_id = params.organizationId;
      this.setState({filterItem: filterItem});
    }
    this.EmployeeList(organizationId);
    this.organizationList();
    
  }
  /*Employee List API*/
  EmployeeList(organizationId = '') {
    let stroreWalkQuery = "";
    if(organizationId !== "" ) 
      stroreWalkQuery = "?organizationId="+organizationId;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('store-walk'+stroreWalkQuery)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, EmployeeList: res.data.data});     
         
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

        this.setState({loading:false, organizationList: res.data.data});     
       
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
  filterEmployeeList(){
    const filterItem = this.state.filterItem;
    this.EmployeeList(filterItem.filter_organization_id);
  }
  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    this.setState( { formProccessing: true}, () => {
      const formInputField = this.state.formField;
      const formData = {
        "email": formInputField.email,
        "firstName": formInputField.first_name, 
        "phoneNumber": formInputField.phoneNumber, 
        "address": formInputField.address, 
        "roleName": formInputField.role, 
        "city": formInputField.city, 
        "state": formInputField.state, 
        "country": formInputField.country, 
        "postalCode": formInputField.postalCode, 
        "EmployeeName": formInputField.first_name,
        "organizationAuthId": formInputField.organizationId,
      };
      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        const employeeInfo = this.state.EmployeeList[rowIndex];

        commonService.putAPIWithAccessToken('store-walk/'+employeeInfo.profileId, formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.EmployeeList();
         
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
        commonService.postAPIWithAccessToken('store-walk', formData)
        .then( res => {
         
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.EmployeeList();
         
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
    } );
    
  };
  /* Input Field On changes*/
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField },
                  () => { this.validateField(name, value) });
  };

  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };
  
  /* Validate Form Field */
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.error = '';
   
    switch(fieldName) {   
      case 'email':        
        fieldValidationErrors.email = (value !== '') ? ((!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) ? " invalid format" : "") : ' is required';
        break; 
      case 'first_name':        
        fieldValidationErrors.employee_name = (value !== '') ? '' : ' is required';
        break;
      case 'role':        
        fieldValidationErrors.role = (value !== '') ? '' : ' is required';
        break;               
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,       
                  }, this.validateForm);
  }
  /* Validate Form */
  validateForm() {
    
    const formErrors = this.state.formErrors;
    const formField = this.state.formField;
    this.setState({formValid: 
      (formErrors.email === "" && formErrors.employee_name === "" && formErrors.role === ""  && formField.role !== "" && formField.first_name !== "" && formField.email !== "") 
      ? true : false});
  }
  /* Set Error Class*/
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      rowIndex: -1,
      formValid: false,
      formField: {email: '', first_name: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '' },
      formErrors: {email: '', employee_name: '', role: '', error: ''}
    });
  }
  /* Edit Employee*/
  handleEditEmployee(rowIndex){
      const employeeInfo = this.state.EmployeeList[rowIndex];
      const formField = {
        organizationId: employeeInfo.organizationAuthId,        
        email: employeeInfo.email, 
        first_name: employeeInfo.firstName, 
        phoneNumber: employeeInfo.phoneNumber, 
        address: employeeInfo.address, 
        city: employeeInfo.city, 
        state: employeeInfo.state, 
        country: employeeInfo.country, 
        postalCode: employeeInfo.postalCode, 
        role: employeeInfo.roleName };
      this.setState({rowIndex: rowIndex, formField: formField, modal: true, formValid: true});
  }
  /* Delete Employee*/
  handleDeleteEmployee(rowIndex){
   
    
   
    
  }

  render() {

    const { EmployeeList, loading, modal, formProccessing, organizationList } = this.state;     
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;

    return (
      <div className="animated fadeIn">
        <Row>
          
          {loaderElement}
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>Employee List</strong> <Button color="primary" className="pull-right" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Add New</Button>
              </CardHeader>
              <CardBody>
                
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={"4"}>
                        <FormGroup> 
                          <Label htmlFor="filter_organization_id">Organization</Label>            
                          <Input type="select" placeholder="Organization *" id="filter_organization_id" name="filter_organization_id" value={this.state.filterItem.filter_organization_id} onChange={this.changeFilterHandler} >
                            <option value="">Select Organization</option>
                            {organizationList.map((organizationInfo, index) =>
                              <SetOrganizationDropDownItem key={index} organizationInfo={organizationInfo} />
                            )}
                          </Input>
                        </FormGroup>  
                      </Col>
                      <Col md={"3"}>
                        <FormGroup className="filter-button-section"> 
                          <Label htmlFor="filter_organization_id">&nbsp;</Label> 
                          <Button color="success" type="button" onClick={this.filterEmployeeList}>Search</Button> 
                        </FormGroup>             
                      </Col>
                    </Row>  
                  </Col>
                  <Col md={12}>
                    <EmployeeData data={EmployeeList} editEmployeeAction={this.handleEditEmployee} deleteEmployeeAction={this.handleDeleteEmployee} dataTableLoadingStatus = {this.state.loading} />
                  </Col>
                </Row> 
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={this.toggle} className="full-width-modal-section employee-modal">
          <ModalHeader toggle={this.toggle}>Employee</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate>
            <ModalBody>
              <FormErrors formErrors={this.state.formErrors} />
              <Row>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="organizationId">Organization</Label>            
                    <Input type="select" placeholder="Organization *" id="organizationId" name="organizationId" value={this.state.formField.organizationId} onChange={this.changeHandler} required >
                      <option value="">Select Organization</option>
                      {organizationList.map((organizationInfo, index) =>
                        <SetOrganizationDropDownItem key={index} organizationInfo={organizationInfo} />
                      )}
                    </Input>
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="first_name">Employee Name</Label>            
                    <Input type="text" placeholder="Employee Name *" id="first_name" name="first_name" value={this.state.formField.first_name} onChange={this.changeHandler} required />
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="email">Email</Label>            
                    <Input type="text" placeholder="Email *" id="email" name="email" value={this.state.formField.email} onChange={this.changeHandler} required />
                  </FormGroup>              
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="role">Role</Label>            
                    <Input type="text" placeholder="Role *" id="role" name="role" value={this.state.formField.role} onChange={this.changeHandler} required />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="phoneNumber">Contact Number</Label>            
                    <Input type="text" placeholder="Contact Number " id="phoneNumber" name="phoneNumber" value={this.state.formField.phoneNumber} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="address">Address</Label>            
                    <Input type="text" placeholder="Address" id="address" name="address" value={this.state.formField.address} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="city">City</Label>            
                    <Input type="text" placeholder="City" id="city" name="city" value={this.state.formField.city} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="state">State</Label>            
                    <Input type="text" placeholder="State" id="state" name="state" value={this.state.formField.state} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="country">Country</Label>            
                    <Input type="text" placeholder="Country" id="country" name="country" value={this.state.formField.country} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="postalCode">Postal Code</Label>            
                    <Input type="text" placeholder="Postal Code" id="postalCode" name="postalCode" value={this.state.formField.postalCode} onChange={this.changeHandler}  />
                  </FormGroup>           
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={!this.state.formValid || formProccessing} type="submit">{formProccessing ? processingBtnText : 'Submit' }</Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

    )
  }
}

function SetOrganizationDropDownItem (props) {
  const organizationInfo = props.organizationInfo;
  return (<option value={organizationInfo.authId} >{organizationInfo.organizationName}</option>)
}

export default Employee;
