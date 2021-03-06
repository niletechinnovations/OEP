import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import { FormErrors } from '../../Formerrors/Formerrors';
import Loader from '../../Loader/Loader';
import './Profile.css'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      formField: { email: '', first_name: '',last_name: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '', profilePic:"" },
      formErrors: {email: '', contact_person: '', role: '', error: ''},
      formValid: true,
      profileId: "",
      loading: true

    };
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount() { 
    this.getProfile();
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
           
            email: organizationInfo.email, 
            first_name: organizationInfo.firstName,
            last_name: organizationInfo.lastName, 
            phoneNumber: organizationInfo.phoneNumber, 
            address: organizationInfo.address, 
            city: organizationInfo.city, 
            state: organizationInfo.state, 
            country: organizationInfo.country, 
            postalCode: organizationInfo.postalCode, 
            role: organizationInfo.roleName,
            profilePic: organizationInfo.profilePic
             };  

          this.setState({loading:false, formField: formField, formValid: true, profileId: organizationInfo.profileId});     
         
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
    formData.append('profileId', this.state.profileId); 
   
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
          this.props.history.push('/admin/profile');
         
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
          "profileId": this.state.profileId,
          "firstName": formInputField.first_name, 
          "lastName": formInputField.last_name, 
          "phoneNumber": formInputField.phoneNumber, 
          "address": formInputField.address, 
          "roleName": formInputField.role, 
          "city": formInputField.city, 
          "state": formInputField.state, 
          "country": formInputField.country, 
          "postalCode": formInputField.postalCode
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
       
        case 'first_name':        
          fieldValidationErrors.contact_person = (value !== '') ? '' : ' is required';
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
        (formErrors.contact_person === "" &&  formField.first_name !== "" ) 
        ? true : false});
    }
    /* Set Error Class*/
    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }
  

  render() {

    const { loading } = this.state;
    let loaderElement = '';
    let prevImg = '';
    if(loading)
      loaderElement = <Loader />
    if(this.state.formField.profilePic !== "")
      prevImg = <div className="prevProfileImageArea"><img src={this.state.formField.profilePic} alt="Profile" className="prevProfileImage" /></div>
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="mainHeading">
                <strong>Profile Info</strong> 
              </CardHeader>
              <CardBody>
                <ToastContainer />
                {loaderElement}
                <Form onSubmit={this.submitHandler} noValidate>
                  <Row>
                    <FormErrors formErrors={this.state.formErrors} />
                     <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="first_name">Contact Person</Label>            
                        <Input type="text" placeholder="Contact Person *" id="first_name" name="first_name" value={this.state.formField.first_name} onChange={this.changeHandler} required />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="last_name">Last Name</Label>            
                        <Input type="text" placeholder="Last Name " id="last_name" name="last_name" value={this.state.formField.last_name} onChange={this.changeHandler} />
                      </FormGroup>  
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="email">Email</Label>            
                        <Input type="text" placeholder="Email *" readOnly="true" id="email" name="email" value={this.state.formField.email} onChange={this.changeHandler} required />
                      </FormGroup>
                    </Col>
                   
                    
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="phoneNumber">Contact Number</Label>            
                        <Input type="text" placeholder="Contact Number " id="phoneNumber" name="phoneNumber" value={this.state.formField.phoneNumber} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="address">Address</Label>            
                        <Input type="text" placeholder="Address" id="address" name="address" value={this.state.formField.address} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="city">City</Label>            
                        <Input type="text" placeholder="City" id="city" name="city" value={this.state.formField.city} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="state">State</Label>            
                        <Input type="text" placeholder="State" id="state" name="state" value={this.state.formField.state} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="country">Country</Label>            
                        <Input type="text" placeholder="Country" id="country" name="country" value={this.state.formField.country} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
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
                    <Button color="primary" disabled={!this.state.formValid} type="submit">Update</Button>
                  </Row>
                </Form>
                  
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>

    )
  }
}

export default Profile;
