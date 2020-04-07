import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, FormFeedback, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import Loader from '../../Loader/Loader';
import SubscriptionData from './SubscriptionData';
import './Subscription.css'

class Subscription extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      planList: [],     
      loading: true,
      formProccessing: false,
      rowIndex: -1,
      formField: { plan_name: '', amount: '', period: '', duration: '', plan_type:'', number_employee: '', number_template: '', isTrail: false, trail_days: 0},
      formErrors: { plan_name: '', amount: '', period: '', duration: '', plan_type:'', number_employee: '', number_template: '', error: ''},
      formValid: true,     
    } 
    this.handleEditSubscription = this.handleEditSubscription.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleDeleteSubscription = this.handleDeleteSubscription.bind(this);
    
  }
  // Fetch the Plan List
  componentDidMount() {     
    this.planList();
    
  }
  /*Plan List API*/
  planList(filterItem = {}) {
    
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('subscription')
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, planList: res.data.data});     
         
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
    if(this.validateForm() === false)
      return false;
    this.setState( { formProccessing: true}, () => {
      const formInputField = this.state.formField;
      
      const formData = {       
        "planName": formInputField.plan_name, 
        "amount": Number(formInputField.amount), 
        "duration": Number(formInputField.plan_type), 
        "userAccess": Number(formInputField.number_employee), 
        "templateAccess": Number(formInputField.number_template),
        "status": formInputField.status === "" ? true : ((formInputField.status === "Active") ? true : false)       
      };
      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        const planInfo = this.state.planList[rowIndex];

        commonService.putAPIWithAccessToken('subscription/'+planInfo.planId, formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.planList();
         
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
        commonService.postAPIWithAccessToken('subscription', formData)
        .then( res => {
         
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.planList();
         
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
    const formField = this.state.formField; 
    formField[name] = value;
    const isValid = event.target.validity.valid;
    const validationMessage = event.target.validationMessage;    
    this.setState({ formField: formField },
                  () => { this.validateField(name, value, isValid, validationMessage) });
  };
  
  /* Validate Form Field */
  validateField(fieldName, value, isValid, errorMessage) {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.error = '';
   
    if(!isValid)
        fieldValidationErrors[fieldName] = errorMessage;
    else
        fieldValidationErrors[fieldName] = '';
    this.setState({formErrors: fieldValidationErrors,       
                  }, this.validateForm);
  }
  /* Validate Form */
  validateForm() {
    
    const formErrors = this.state.formErrors;
    const formField = this.state.formField;
    return (formErrors.plan_name === "" && formField.plan_name !== "" && formErrors.amount === "" && formField.amount !== ""
        /*&& formErrors.number_employee === "" && formField.number_employee !== ""
        && formErrors.number_template === "" && formField.number_template !== ""*/
        && formErrors.plan_type === "" && formField.plan_type !== ""
        ) 
      ? true : false;
  }
  /* Set Error Class*/
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      rowIndex: -1,
      formProccessing : false,
      formValid: true,
      formField: { plan_name: '', amount: '', period: '', duration: '', plan_type:'', number_employee: '', number_template: '', isTrail: false, trail_days: 0, status: ""},
      formErrors: { plan_name: '', amount: '', period: '', duration: '', plan_type:'', number_employee: '', number_template: '', error: ''},
    });
  }
  /* Edit Employee*/
  handleEditSubscription(rowIndex){
      const planInfo = this.state.planList[rowIndex];
      let status = (planInfo.status) ? "Active": "Inactive";
      const formField = {
        planId: planInfo.planId, 
        plan_name: planInfo.planName, 
        amount: planInfo.amount, 
        plan_type: planInfo.duration, 
        number_employee: planInfo.userAccess, 
        number_template: planInfo.templateAccess,
        status: status };
      this.setState({rowIndex: rowIndex, formField: formField, formProccessing : false, modal: true, formValid: true});
  }
  /* Delete Employee*/
  handleDeleteSubscription(rowIndex){
   
    
   
    
  }
  
  render() {

    const { planList, loading, modal, formProccessing, formErrors } = this.state;     
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
              <CardHeader className="mainHeading">
                <strong>Subscription Plan List</strong> <Button color="button" className="categoryAdd" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Add Plan</Button>
              </CardHeader>
              <CardBody>                
                <Row>                 
                  <Col md={12}>
                    <SubscriptionData data={planList} editSubscriptionAction={this.handleEditSubscription} deleteSubscriptionAction={this.handleDeleteSubscription} dataTableLoadingStatus = {this.state.loading} />
                  </Col>
                </Row> 
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={this.toggle} className="full-width-modal-section store-modal">
          <ModalHeader toggle={this.toggle}>Plan </ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate>
            <ModalBody>              
              <Row>                
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="plan_name">Plan Name</Label>            
                    <Input type="text" placeholder="Plan Name *" id="plan_name" name="plan_name" value={this.state.formField.plan_name} onChange={this.changeHandler} required />
                    <FormFeedback>{formErrors.plan_name}</FormFeedback>
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="amount">Amount</Label>            
                    <Input type="text" placeholder="Amount *" id="amount"  name="amount" value={this.state.formField.amount} onChange={this.changeHandler} required />
                    <FormFeedback>{formErrors.amount}</FormFeedback>
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="plan_type">Plan Type</Label>            
                    <Input type="select" placeholder="Plan Type *" id="plan_type" name="plan_type" value={this.state.formField.plan_type} onChange={this.changeHandler} required >
                      <option value="">Select Plan Type</option>
                      <option value="1">Monthly</option>
                      <option value="2">Quaterly</option>
                      <option value="3">Half Yearly</option>
                      <option value="4">Yearly</option>
                    </Input>
                    <FormFeedback>{formErrors.plan_type}</FormFeedback>
                  </FormGroup>  
                </Col>
               {/* <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="number_employee">Number of Employee</Label>            
                    <Input type="text" placeholder="Number of Employee *" pattern="[0-9]*" id="number_employee" name="number_employee" value={this.state.formField.number_employee} onChange={this.changeHandler} required />
                    <FormFeedback>{formErrors.number_employee}</FormFeedback>
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="number_template">Number Of Template</Label>            
                    <Input type="text" placeholder="Number Of Template *" pattern="[0-9]*" id="number_template" name="number_template" value={this.state.formField.number_template} onChange={this.changeHandler} required />
                    <FormFeedback>{formErrors.number_template}</FormFeedback>
                  </FormGroup>  
                </Col>*/}
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="plan_type">Status</Label>            
                    <Input type="select" placeholder="Status " id="plan_type" name="status" value={this.state.formField.status} onChange={this.changeHandler} required >
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


export default Subscription;
