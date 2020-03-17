import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { toast } from 'react-toastify';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import { FormErrors } from '../../Formerrors/Formerrors';

import Loader from '../../Loader/Loader';
import OrganizationData from './OrganizationData';
import './Organization.css'

class Organization extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      organizationList: [],
      loading: true,
      rowIndex: -1,
      formProccessing: false,
      formField: {organization_name: '', email: '', first_name: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '', status: '' },
      formErrors: {organization_name: '', email: '', contact_person: '', role: '', error: ''},
      formValid: false,
      filterItem: { filter_organization_id: '', country: '', state: '', custom_search: ''},

    } 
    this.handleEditOrganization = this.handleEditOrganization.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleDeleteOrganization = this.handleDeleteOrganization.bind(this);
    this.filterOragnizationList = this.filterOragnizationList.bind(this);
    this.resetSearchFilter = this.resetSearchFilter.bind(this);
    
  }
  // Fetch the organization List
  componentDidMount() { 
    this.organizationList();
  }
  /*organization List API*/
  organizationList(filterItem = {}) {
    let organizationQuery = "";
    
    if(filterItem.country !== undefined && filterItem.country !== "" ) 
      organizationQuery += (organizationQuery !=="" ) ? "&country="+filterItem.country: "?country="+filterItem.country;
    if(filterItem.state !== undefined && filterItem.state !== "" ) 
      organizationQuery += (organizationQuery !=="" ) ? "&state="+filterItem.state: "?state="+filterItem.state;
    if(filterItem.custom_search !== undefined && filterItem.custom_search !== "" ) 
      organizationQuery += (organizationQuery !=="" ) ? "&keyword="+filterItem.custom_search: "?keyword="+filterItem.custom_search;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('organization'+organizationQuery)
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
          else {
            this.setState( { loading: false } );
            toast.error(err.message);
          }
        } )
    } )
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
        "organizationName": formInputField.organization_name,
        "status": formInputField.status === "" ? true : ((formInputField.status === "Active") ? true : false)
      };
      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        const organizationInfo = this.state.organizationList[rowIndex];
        commonService.putAPIWithAccessToken('organization/'+organizationInfo.organizationId, formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.organizationList();
         
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
        commonService.postAPIWithAccessToken('organization', formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.organizationList();
         
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
  
  /* Validate Form Field */
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.error = '';
   
    switch(fieldName) {         
      case 'organization_name':        
        fieldValidationErrors.organization_name = (value !== '') ? '' : ' is required';
        break; 
      case 'email':      
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);  
        fieldValidationErrors.email = (value !== '') ? ((!(pattern.test(value))) ? " invalid format" : "") : ' is required';
        break; 
      case 'first_name':        
        fieldValidationErrors.contact_person = (value !== '') ? '' : ' is required';
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
      (formErrors.organization_name === ""  && formErrors.email === "" && formErrors.contact_person === "" && formErrors.role === "" && formField.organization_name !== "" && formField.role !== "" && formField.first_name !== "" && formField.email !== "") 
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
      formField: {organization_name: '', email: '', first_name: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '' },
      formErrors: {organization_name: '', email: '', contact_person: '', role: '', error: ''}
    });
  }
  /* Edit organization*/
  handleEditOrganization(rowIndex){
      const organizationInfo = this.state.organizationList[rowIndex];
      let status = (organizationInfo.status) ? "Active": "Inactive";
      const formField = {
        organization_name: organizationInfo.organizationName, 
        email: organizationInfo.email, 
        first_name: organizationInfo.firstName, 
        phoneNumber: organizationInfo.phoneNumber, 
        address: organizationInfo.address, 
        city: organizationInfo.city, 
        state: organizationInfo.state, 
        country: organizationInfo.country, 
        postalCode: organizationInfo.postalCode, 
        role: organizationInfo.roleName,
        status: status };
      this.setState({rowIndex: rowIndex, formField: formField, modal: true, formValid: true, formProccessing: false});
  }
  /* Delete organization*/
  handleDeleteOrganization(rowIndex){
    const organizationInfo = this.state.organizationList[rowIndex];
    this.setState( { loading : true}, () => {   
      commonService.deleteAPIWithAccessToken('organization', {organizationId: organizationInfo.organizationId})
      .then( res => {
        
         
        if ( undefined === res.data.data || !res.data.status ) {
         
          this.setState( { loading : false} );
          toast.error(res.data.message);
          return;
        } 
        
        this.setState({ modal: false, loading : false});
        toast.success(res.data.message);
        this.organizationList();
       
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
  filterOragnizationList(){
    const filterItem = this.state.filterItem;
    this.organizationList(filterItem);
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
  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };
  resetSearchFilter() {
    this.setState({filterItem: { filter_organization_id: '', country: '', state: '', custom_search: ''}});
    this.organizationList();
  }
  render() {

    const { organizationList, loading, modal, formProccessing } = this.state;     
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
                <strong>Organization List</strong> 
                <Button color="" className="categoryAdd" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Add New</Button>
              </CardHeader>
              <CardBody>
                
                <Row>
                  <Col md={12}>
                    <div className="search-filter">
                    <Row>                      
                      <Col md={"3"}>
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
                      <Col md={"3"}>
                        <FormGroup className="filter-button-section"> 
                          <Button className="search-btn" type="button" onClick={this.filterOragnizationList}>Search</Button> 
                          <Button className="search-btn" id="resetButton" type="button" onClick={this.resetSearchFilter}>Reset</Button> 
                        </FormGroup>             
                      </Col>
                    </Row>
                     </div>  
                  </Col>

                  <Col lg={12}>
                    <OrganizationData data={organizationList} editOrganizationAction={this.handleEditOrganization} deleteOrganizationAction={this.handleDeleteOrganization} dataTableLoadingStatus = {this.state.loading} />
                  </Col>  
                </Row>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={this.toggle} className="full-width-modal-section organization-modal">
          <ModalHeader toggle={this.toggle}>Organization</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate>
            <ModalBody>
              <FormErrors formErrors={this.state.formErrors} />
              <Row>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="organization_name">Organization Name</Label>            
                    <Input type="text" placeholder="Organization Name *" id="organization_name" name="organization_name" value={this.state.formField.organization_name} onChange={this.changeHandler} required />
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
                    <Label htmlFor="first_name">Contact Person</Label>            
                    <Input type="text" placeholder="Contact Person *" id="first_name" name="first_name" value={this.state.formField.first_name} onChange={this.changeHandler} required />
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
                </Col>
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

export default Organization;
