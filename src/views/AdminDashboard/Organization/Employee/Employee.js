import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../../core/services/commonService';
import { FormErrors } from '../../../Formerrors/Formerrors';
import AutoCompletePlaces from '../../../../core/google-map/AutoCompletePlaces';
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
      formField: { organizationId: '', email: '', first_name: '',last_name: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '', status: '' },
      formErrors: { email: '', employee_name: '', role: '', error: ''},
      formValid: false,
      filterItem: { filter_organization_id: '', country: '', state: '', custom_search: ''},
    } 
    this.handleEditEmployee = this.handleEditEmployee.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
    this.filterEmployeeList = this.filterEmployeeList.bind(this);
    this.resetSearchFilter = this.resetSearchFilter.bind(this);
    this.setLatitudeLongitude = this.setLatitudeLongitude.bind(this);
  }
  
  // Fetch the Employee List
  componentDidMount() { 
    const { match: { params } } = this.props;
   
    if(params.organizationId !== undefined) {     
      let filterItem = this.state.filterItem;
      filterItem.filter_organization_id = params.organizationId;
      this.setState({filterItem: filterItem});
    }
    this.EmployeeList(this.state.filterItem);
    this.organizationList();
    
  }
  setLatitudeLongitude(address, latLng, city = "", state = "", country = "", postal_code = ""){
    let formField = this.state.formField;
    formField.state = state;
    formField.latitude = latLng.latitude;
    formField.longitude = latLng.longitude;
    formField.country = country;formField.city = city;formField.postalCode = postal_code;
    formField.address = address
    this.setState({ formField: formField })
  }
  /*Employee List API*/
  EmployeeList(filterItem={}) {
    let stroreWalkQuery = "?listItem=all";
    if(filterItem.filter_organization_id !== undefined && filterItem.filter_organization_id !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&organizationId="+filterItem.filter_organization_id: "?organizationId="+filterItem.filter_organization_id;
    if(filterItem.country !== undefined && filterItem.country !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&country="+filterItem.country: "?country="+filterItem.country;
    if(filterItem.state !== undefined && filterItem.state !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&state="+filterItem.state: "?state="+filterItem.state;
    if(filterItem.custom_search !== undefined && filterItem.custom_search !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&keyword="+filterItem.custom_search: "?keyword="+filterItem.custom_search;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('employee'+stroreWalkQuery)
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
    this.EmployeeList(filterItem);
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
        "lastName": formInputField.last_name, 
        "phoneNumber": formInputField.phoneNumber, 
        "address": formInputField.address, 
        "roleName": formInputField.role, 
        "city": formInputField.city, 
        "latitude": formInputField.latitude,
        "longitude": formInputField.longitude, 
        "state": formInputField.state, 
        "country": formInputField.country, 
        "postalCode": formInputField.postalCode, 
        "employeeName": formInputField.first_name,
        "organizationAuthId": formInputField.organizationId,
        "status": formInputField.status === "" ? true : ((formInputField.status === "Active") ? true : false)
      };
      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        const employeeInfo = this.state.EmployeeList[rowIndex];

        commonService.putAPIWithAccessToken('employee/'+employeeInfo.profileId, formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.EmployeeList(this.state.filterItem);
         
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
        commonService.postAPIWithAccessToken('employee', formData)
        .then( res => {
         
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.EmployeeList(this.state.filterItem);
         
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
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);  
        fieldValidationErrors.email = (value !== '') ? ((!(pattern.test(value))) ? " invalid format" : "") : ' is required';
        break;
      case 'first_name':        
        fieldValidationErrors.employee_name = (value !== '') ? '' : ' is required';
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
      (formErrors.email === "" && formErrors.employee_name === "" &&  formField.first_name !== "" && formField.email !== "") 
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
      formProccessing : false,
      formField: {email: '', first_name: '', last_name:'', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '' },
      formErrors: {email: '', employee_name: '', role: '', error: ''}
    });
  }
  /* Edit Employee*/
  handleEditEmployee(rowIndex){
      const employeeInfo = this.state.EmployeeList[rowIndex];
      let status = (employeeInfo.status) ? "Active": "Inactive";
      const formField = {
        organizationId: employeeInfo.organizationAuthId,        
        email: employeeInfo.email, 
        first_name: employeeInfo.firstName,
        last_name: employeeInfo.lastName, 
        phoneNumber: employeeInfo.phoneNumber, 

        address: employeeInfo.address, 
        city: employeeInfo.city, 
        state: employeeInfo.state, 
        country: employeeInfo.country, 
        postalCode: employeeInfo.postalCode, 
        role: employeeInfo.roleName,
        status: status };
      this.setState({rowIndex: rowIndex, formField: formField, formProccessing : false, modal: true, formValid: true});
  }
  /* Delete Employee*/
  handleDeleteEmployee(rowIndex){
   
    const employeeInfo = this.state.EmployeeList[rowIndex];
    
    this.setState( { loading : true}, () => {   
      commonService.deleteAPIWithAccessToken('employee', {employeeId: employeeInfo.profileId})
      .then( res => {
        
         
        if ( undefined === res.data.data || !res.data.status ) {
         
          this.setState( { loading : false} );
          toast.error(res.data.message);
          return;
        } 
        
        this.setState({ modal: false, loading : false});
        toast.success(res.data.message);
        this.EmployeeList();
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else
          this.setState( { loading : false } );
          toast.error(err.message);
      } )
    } );
   
    
  }
  selectCountry (val) {
    let formField = this.state.formField;
    formField.country = val
    this.setState({ formField: formField });
  }
 
  selectRegion (val) {
    let formField = this.state.formField;
    formField.state = val
    this.setState({ formField: formField });
  }

  selectFilterCountry (val) {
    let filterItem = this.state.filterItem;
    filterItem.country = val
    this.setState({ filterItem: filterItem });
  }
 
  selectFilterRegion (val) {
    let filterItem = this.state.filterItem;
    filterItem.state = val
    this.setState({ filterItem: filterItem });
  }
  resetSearchFilter() {
    this.setState({filterItem: { filter_organization_id: '', country: '', state: '', custom_search: ''}});
    this.EmployeeList();
  }
  render() {

    const { EmployeeList, loading, modal, formProccessing, organizationList } = this.state;     
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;
    const priorityCountry = ['US'];
    return (
      <div className="animated fadeIn">
        <Row>
          
          {loaderElement}
          <Col lg={12}>
            <Card className="oep-card">
              <CardHeader className="mainHeading">
                <strong>Employee List</strong> <Button color="" className="categoryAdd" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Add Employee</Button>
              </CardHeader>
              <CardBody>
                
                <Row>
                  <Col md={12}>
                    <div className="search-filter">
                    <Row>
                      <Col md={"2"}>
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
                      <Col md={"2"}>
                        <FormGroup> 
                          <Label htmlFor="filter_organization_id">Country</Label>            
                          <CountryDropdown id="filterCountry" priorityOptions={priorityCountry} name="filterCountry" className="form-control" value={this.state.filterItem.country}  onChange={(val) => this.selectFilterCountry(val)} />
                        </FormGroup>  
                      </Col>
                      <Col md={"3"}>
                        <FormGroup> 
                          <Label htmlFor="filter_organization_id">State</Label>            
                          <RegionDropdown  id="filterState" name="filterState" className="form-control" country={this.state.filterItem.country} defaultOptionLabel="Select State" blankOptionLabel="Select State"   value={this.state.filterItem.state}  onChange={(val) => this.selectFilterRegion(val)} /> 
                        </FormGroup>  
                      </Col>
                      <Col md={"3"}>
                        <FormGroup> 
                          <Label htmlFor="filter_organization_id">Search By Email/ Name</Label>            
                          <Input type="text" placeholder="Search By Email/ Name" id="custom_search" name="custom_search" value={this.state.formField.custom_search} onChange={this.changeFilterHandler} />
                        </FormGroup>  
                      </Col>
                      <Col md={"2"}>
                        <FormGroup className="filter-button-section"> 
                          <Label htmlFor="filter_organization_id">&nbsp;</Label> 
                          <Button className="search-btn"  type="button" onClick={this.filterEmployeeList}>Search</Button> 
                          <Button className="search-btn" id="resetButton" type="button" onClick={this.resetSearchFilter}>Reset</Button> 
                        </FormGroup>             
                      </Col>
                    </Row>
                    </div>  
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
                    <Label htmlFor="first_name">First Name</Label>            
                    <Input type="text" placeholder="First Name *" id="first_name" name="first_name" value={this.state.formField.first_name} onChange={this.changeHandler} required />
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="first_name">Last Name</Label>            
                    <Input type="text" placeholder="Last Name *" id="last_name" name="last_name" value={this.state.formField.last_name} onChange={this.changeHandler} required />
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
                    <Input type="text" placeholder="Role *" id="role" name="role" value={this.state.formField.role} onChange={this.changeHandler}  />
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
                    <AutoCompletePlaces setLatitudeLongitude={this.setLatitudeLongitude} address = {this.state.formField.address} />  
                  </FormGroup>
                </Col>
                {/*
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="country">Country</Label>     
                    <CountryDropdown id="country" priorityOptions={priorityCountry} name="country" className="form-control" value={this.state.formField.country}  onChange={(val) => this.selectCountry(val)} />       
                    
                  </FormGroup>
                </Col>                
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="state">State</Label>  
                    <RegionDropdown  id="state" name="state" className="form-control" country={this.state.formField.country} defaultOptionLabel="Select State" blankOptionLabel="Select State"   value={this.state.formField.state}  onChange={(val) => this.selectRegion(val)} /> 
                  </FormGroup>
                </Col>
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="city">City</Label>            
                    <Input type="text" placeholder="City" id="city" name="city" value={this.state.formField.city} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>*/}
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="postalCode">Postal Code</Label>            
                    <Input type="text" placeholder="Postal Code" id="postalCode" name="postalCode" value={this.state.formField.postalCode} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                    <FormGroup>
                      <Label htmlFor="template_status">Status</Label>            
                      <Input type="select" placeholder="Status *" id="status" name="status" value={this.state.formField.status} onChange={this.changeHandler} required >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Input>
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
