import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import { FormErrors } from '../../Formerrors/Formerrors';
import Loader from '../../Loader/Loader';
import AutoCompletePlaces from '../../../core/google-map/AutoCompletePlaces';
import './Profile.css'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      formField: {organization_name: '', email: '', first_name: '', latitude: '', longitude: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '', profilePic: '' },
      formErrors: {organization_name: '', email: '', contact_person: '', role: '', error: ''},
      formValid: true,
      organizationId: "",
      loading: true

    };
    this.submitHandler = this.submitHandler.bind(this);
    this.setLatitudeLongitude = this.setLatitudeLongitude.bind(this);
  }
  componentDidMount() { 
    this.getProfile();
  }

  setLatitudeLongitude(address, latLng, city, state, country, postal_code){
    let formField = this.state.formField;
    formField.state = state;
    formField.country = country;formField.city = city;formField.postalCode = postal_code;
    formField.address = address
    this.setState({ formField: formField })
  }

  /*get profile API*/
  getProfile() {   

    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('profile')
        .then( res => {

          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }
          const organizationInfo = res.data.data;
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
            profilePic: organizationInfo.profilePic };  

          this.setState({loading:false, formField: formField, formValid: true, organizationId: organizationInfo.organizationId});     
         
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
    } )
  }
  changeFileHandle = event => {
    const targetFile = event.target.files[0];
    if(targetFile.type !== "image/png" && targetFile.type !== "image/jpeg" && targetFile.type !== "image/jpg" && targetFile.type !== "image/svg") {
      toast.error("Images allowed only");
      return false;
    }
    event.preventDefault();
    //event.target.className += " was-validated";
    let formData = new FormData(); 
    
    
    formData.append('profileImage', targetFile); 
    formData.append('profileId', this.state.organizationId); 
   
    this.setState( { loading: true}, () => {
      commonService.putAPIWithAccessToken('profile/picture', formData)
        .then( res => {
          
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          }
          localStorage.setItem('profilePic', res.data.data.profilePic);    
          let formField = this.state.formField;       
          formField.profilePic = res.data.data.profilePic;          
          this.setState({ loading: false, formField: formField});
          toast.success(res.data.message);
          //this.props.history.push('/organization/profile');
         
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
    } );
    
  }
    /* Submit Form Handler*/
    submitHandler (event) {
      event.preventDefault();
      event.target.className += " was-validated";
      this.setState( { loading: true}, () => {
        const formInputField = this.state.formField;
        const formData = {
          "email": formInputField.email,
          "profileId": this.state.organizationId,
          "firstName": formInputField.first_name, 
          "phoneNumber": formInputField.phoneNumber, 
          "address": formInputField.address, 
          "roleName": formInputField.role, 
          "city": formInputField.city, 
          "state": formInputField.state,
          "latitude": formInputField.latitude,
          "longitude": formInputField.longitude, 
          "country": formInputField.country, 
          "postalCode": formInputField.postalCode, 
          "organizationName": formInputField.organization_name
        };
        
        commonService.putAPIWithAccessToken('profile', formData)
          .then( res => {
            if ( undefined === res.data.data || !res.data.status ) {
             
              this.setState( { loading: false} );
              toast.error(res.data.message);
              return;
            }           
            this.setState({ loading: false});
            toast.success(res.data.message);
           
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
        (formErrors.organization_name === ""  && formErrors.contact_person === "" && formErrors.role === "" && formField.organization_name !== "" && formField.role !== "" && formField.first_name !== "" ) 
        ? true : false});
    }
    /* Set Error Class*/
    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }
  

  render() {
    debugger;
    const { loading } = this.state;
    let loaderElement = '';
    let prevImg = '';
    if(loading)
      loaderElement = <Loader />

    if(this.state.formField.profilePic !== "")
      prevImg = <div className="prevProfileImageArea"><img src={this.state.formField.profilePic} alt="Profile" className="prevProfileImage" /></div>
    else
      prevImg = <div className="prevProfileImageArea"><img src='../../../assets/img/avatars/6.jpg' alt="Profile" className="prevProfileImage" /></div>
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <div className="oep-em-info">
            <Card className="oep-card">
              <CardHeader className="mainHeading">
                <strong>Profile Info</strong> 
              </CardHeader>
              <CardBody>
                <ToastContainer />
                {loaderElement}
                <Form className="oep-form" onSubmit={this.submitHandler} noValidate>
                  <Row>
                    <FormErrors formErrors={this.state.formErrors} />
                    <Col md={4}>
                      <FormGroup> 
                        <Label htmlFor="organization_name">Organization Name</Label>            
                        <Input type="text" placeholder="Organization Name *" id="organization_name" name="organization_name" value={this.state.formField.organization_name} onChange={this.changeHandler} required />
                      </FormGroup>  
                    </Col>
                    <Col md={4}>
                      <FormGroup> 
                        <Label htmlFor="email">Email</Label>            
                        <Input type="text" placeholder="Email *" id="email" name="email" value={this.state.formField.email} onChange={this.changeHandler} required />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup> 
                        <Label htmlFor="first_name">Contact Person</Label>            
                        <Input type="text" placeholder="Contact Person *" id="first_name" name="first_name" value={this.state.formField.first_name} onChange={this.changeHandler} required />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup> 
                        <Label htmlFor="role">Role</Label>            
                        <Input type="text" placeholder="Role *" id="role" name="role" value={this.state.formField.role} onChange={this.changeHandler} required />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup> 
                        <Label htmlFor="phoneNumber">Contact Number</Label>            
                        <Input type="text" placeholder="Contact Number " id="phoneNumber" name="phoneNumber" value={this.state.formField.phoneNumber} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup> 
                        <Label htmlFor="address">Address</Label>            
                        <AutoCompletePlaces setLatitudeLongitude={this.setLatitudeLongitude} address = {this.state.formField.address} />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup> 
                        <Label htmlFor="city">City</Label>            
                        <Input type="text" placeholder="City" id="city" name="city" value={this.state.formField.city} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup> 
                        <Label htmlFor="state">State</Label>            
                        <Input type="text" placeholder="State" id="state" name="state" value={this.state.formField.state} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup> 
                        <Label htmlFor="country">Country</Label>            
                        <Input type="text" placeholder="Country" id="country" name="country" value={this.state.formField.country} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup> 
                        <Label htmlFor="postalCode">Postal Code</Label>            
                        <Input type="text" placeholder="Postal Code" id="postalCode" name="postalCode" value={this.state.formField.postalCode} onChange={this.changeHandler}  />
                      </FormGroup>                  
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label htmlFor="profileImage">Profile Image</Label>
                        <Input name="profileImage" type="file" accept="image/*" id="profileImage" onChange={this.changeFileHandle}  />
                        {prevImg}
                      </FormGroup>
                    </Col>
                    <Col md={12}></Col>
                    <Button className="Update-btn" color="primary" disabled={!this.state.formValid} type="submit">Update</Button>
                    {this.props.enableNextStep ? 
                   
                        <Button className="search-btn pull-right" onClick={() => this.props.enableNextStep()}>Next Step</Button>
                    : ""}
                  </Row>
                </Form>
                  
              </CardBody>
            </Card>
            </div>
          </Col>
        </Row>
       
      </div>

    )
  }
}

export default Profile;
