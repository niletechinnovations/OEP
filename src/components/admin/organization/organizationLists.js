import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavigation from "../sideNavigation";
import OrganizationData from './organizationData';
import Loader from '../../loader';
import commonService from '../../../core/services/commonService';
import './organization.css';
import { FormErrors } from '../FormErrors';

class oragnizationLists extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      organizationList: [],
      loading: true,
      rowIndex: -1,
      formField: {organization_name: '', email: '', first_name: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '' },
      formErrors: {organization_name: '', email: '', contact_person: '', role: '', error: ''},
      formValid: false,

    } 
    this.handleEditOrganization = this.handleEditOrganization.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleDeleteOrganization = this.handleDeleteOrganization.bind(this);
  }

  // Fetch the organization List
  componentDidMount() { 
    this.organizationList();
  }
  /*organization List API*/
  organizationList() {
  	
    this.setState( { loading: true}, () => {
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
    this.setState( { loading: true}, () => {
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
        "organizationName": formInputField.organization_name
      };
      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        const organizationInfo = this.state.organizationList[rowIndex];
        commonService.putAPIWithAccessToken('organization/'+organizationInfo.organizationId, formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.organizationList();
         
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
      }
      else{
        commonService.postAPIWithAccessToken('organization', formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.organizationList();
         
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
        fieldValidationErrors.email = (value !== '') ? ((!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) ? " invalid format" : "") : ' is required';
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
      formField: {organization_name: '', email: '', first_name: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '' },
      formErrors: {organization_name: '', email: '', contact_person: '', role: '', error: ''}
    });
  }
  /* Edit organization*/
  handleEditOrganization(rowIndex){
      const organizationInfo = this.state.organizationList[rowIndex];
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
        role: organizationInfo.roleName };
      this.setState({rowIndex: rowIndex, formField: formField, modal: true, formValid: true});
  }
  /* Delete organization*/
  handleDeleteOrganization(rowIndex){
   
    
   
    
  }

  render() {
      const { organizationList, loading } = this.state;     
      
      
      let loaderElement = '';
      if(loading)        
        loaderElement = <Loader />

      return (
        <React.Fragment>
          <SideNavigation />
          <main className="dashboard-content">
            <MDBContainer>
              <ToastContainer />
              <MDBRow className="mb-12">
                <MDBCol md="6">
                  <h2 className="section-heading mb-4">Organization List</h2>
                </MDBCol>
                <MDBCol md="6">
                  <div className="text-right">
                    <MDBBtn size="sm" color="primary" className="px-2" onClick={this.toggle}>
                      <i className="fa fa-plus mt-0"></i> Add new organization
                    </MDBBtn>
                    
                  </div>
                </MDBCol>
                {loaderElement}
                <MDBCol md="12">                    
                    <OrganizationData data={organizationList} editOrganizationAction={this.handleEditOrganization} deleteOrganizationAction={this.handleDeleteOrganization} />
                </MDBCol>
            </MDBRow>
          </MDBContainer>

          <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" className="cascading-modal">
            <form className="needs-validation" onSubmit={this.submitHandler} noValidate >
              <MDBModalHeader toggle={this.toggle} className="light-blue white-text">Organization</MDBModalHeader>
              <MDBModalBody>
                <FormErrors formErrors={this.state.formErrors} />
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.organization_name} name="organization_name" onChange={this.changeHandler} type="text" id="organization_name" label="Organization name*" required ></MDBInput>
                  </MDBCol>                 
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.email} name="email" onChange={this.changeHandler} type="email" id="email" label="Email*" required ></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.first_name} name="first_name" onChange={this.changeHandler} type="text" id="first_name" label="Contact person*" required ></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.role} name="role" onChange={this.changeHandler} type="text" id="role" label="Role*" required ></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.phoneNumber} name="phoneNumber" onChange={this.changeHandler} type="text" id="role" label="Contact Number"></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.address} name="address" onChange={this.changeHandler} type="text" id="address" label="Address"></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.city} name="city" onChange={this.changeHandler} type="text" id="city" label="City"></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.state} name="state" onChange={this.changeHandler} type="text" id="state" label="State"></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.country} name="country" onChange={this.changeHandler} type="text" id="country" label="Country"></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.postalCode} name="postalCode" onChange={this.changeHandler} type="text" id="postalCode" label="Postal Code"></MDBInput>
                  </MDBCol>
                </MDBRow>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>Cancel</MDBBtn>
                <MDBBtn color="primary" disabled={!this.state.formValid} type="submit">Submit</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModal>

        </main>
      </React.Fragment>
    )
  }
}

export default oragnizationLists;