import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput } from 'mdbreact';
import SideNavigation from "../sideNavigation";
import OrganizationData from './organizationData';
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
      rowIndex: "",
      formField: {organizationName: '', email: '', firstName: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', roleName: '' },
      formErrors: {organization_name: '', email: '', first_name: '', role: '', error: ''},
      formValid: false,

    } 
    this.handleEditOrganization = this.handleEditOrganization.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleDeleteOrganization = this.handleDeleteOrganization.bind(this);
  }

  // Fetch the category List
  componentDidMount() { 
    this.organizationList();
  }
  /*Category List API*/
  organizationList() {
  	const accessToken = localStorage.getItem("accessToken");
  	const headers = {
  	    'Content-Type': 'application/json',
  	    'Authorization': 'JWT '+accessToken
  	}

    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('organization')
        .then( res => {
          debugger;
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { error: res.data.message, loading: false, alertColor: 'danger', alertClassName: '' } );
            return;
          }   

          this.setState({loading:false, organizationList: res.data.data});     
         
        } )
        .catch( err => {         
          if(err.response.status == 401 && err.response.status === undefined) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { error: err.message, loading: false } );
        } )
    } )
  }
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    let formData = new FormData(); 
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+accessToken
    }
    
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value
    this.setState({ [name]: value },
                  () => { this.validateField(name, value) });
  };
  
  /* Validate Form Field */
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.error = '';
    let category_name_valid = this.state.category_name_valid; 
    switch(fieldName) {         
      case 'category_name':
        category_name_valid = (value !== '') ? true : false;
        fieldValidationErrors.category_name = category_name_valid ? '' : ' is required';
        break;              
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    category_name_valid: category_name_valid,                   
                  }, this.validateForm);
  }
  /* Validate Form */
  validateForm() {
    this.setState({formValid: this.state.category_name_valid});
  }
  /* Set Error Class*/
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      category_name: "",
      rowIndex: "",
      formValid: false
    });
  }
  
  handleEditOrganization(rowIndex){
   
      debugger;
  }

  handleDeleteOrganization(rowIndex){
   
   debugger; 
   
    
  }

  render() {
      const { organizationList, loading } = this.state;     
      
      let tableConatiner ='';
      let loaderElement = '';
      if(!loading)
        tableConatiner = <OrganizationData data={organizationList} editOrganizationAction={this.handleEditOrganization} deleteOrganizationAction={this.handleDeleteOrganization} />;
      else
        loaderElement = <div className="loaderSection">
                             <div className="spinner-border text-primary" role="status">
                                  <span className="sr-only">Loading...</span>
                              </div>
                        </div>;

      return (
        <React.Fragment>
          <SideNavigation />
          <main className="dashboard-content">
            <MDBContainer>
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
                    <MDBInput value={this.state.formField.organizationName} name="organization_name" onChange={this.changeHandler} type="text" id="organization_name" label="Organization name" required ></MDBInput>
                  </MDBCol>                 
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.email} name="email" onChange={this.changeHandler} type="email" id="email" label="Email" required ></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.firstName} name="first_name" onChange={this.changeHandler} type="text" id="first_name" label="Contact person" required ></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.formField.roleName} name="role" onChange={this.changeHandler} type="text" id="role" label="Role" required ></MDBInput>
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