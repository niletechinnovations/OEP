import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label} from 'reactstrap';
import DemoBar from '../../FormBuilder/demobar';
import {ReactFormBuilder} from "../../FormBuilder/";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import { FormErrors } from '../../Formerrors/Formerrors';
import  SubscriptionPlan  from '../Subscription/SubscriptionPlan';
import "../../../assets/css/font-awesome.min.css";
import "react-form-builder2/dist/app.css";
import "./TemplateBuilderPage.css";
class TemplateBuilderPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {      
      subCategoryList: [],      
      loading: false,      
      categoryList: [], 
      formField: { categoryId: '', subCategoryId: '', template_name: ''},
      formErrors: {category: '', subcategory: '', template_form: '', template_name: '', error: ''},
      templateData: [],
      templateId: "",
      formValid: false,
      templatePreviewData : [],
      formProccessing: false,      
    }     
    this.getSubCategoryList = this.getSubCategoryList.bind(this);
    this.handleUpdatedFormHandleChange = this.handleUpdatedFormHandleChange.bind(this);   
    this.submitHandler = this.submitHandler.bind(this);  
    this.resetForm = this.resetForm.bind(this); 
  }

  // Fetch the subCategory List
  componentDidMount() {
    const { match: { params } } = this.props;
    if(params.templateId !== undefined && params.templateId !=="") 
      this.getTemplateDetail(params.templateId);
      
    this.categoryList();
  }

  getTemplateDetail(templateId) {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('template/'+templateId)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);  
            this.props.history.push('/template');  
            return;
          } 
          const templateDetail = res.data.data;

          let formField = this.state.formField;
          formField.categoryId = templateDetail.categoryId;
          formField.subCategoryId = templateDetail.subCategoryId;
          formField.template_name = templateDetail.templateName;
          this.getSubCategoryList(templateDetail.categoryId, false);
          this.setState({loading:false, formField: formField, formValid: true, templateId: templateDetail.templateId, templatePreviewData: templateDetail.formField});     
         
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
  /*categoryList List API*/
  categoryList() {   
   
    commonService.getAPIWithAccessToken('category')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   

        this.setState({categoryList: res.data.data});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else           
          toast.error(err.message);    
        
      } )
    
  }
  /*Sub Category*/
  getSubCategoryList(categoryId, hideSubcat = true) {
    const formField = this.state.formField;
    if(categoryId === "") {      
      formField.subCategoryId = '';
      this.setState({ formField: formField, subCategoryList: [] });
      return;
    }
    this.setState( { loading: true}, () => { 
      commonService.getAPIWithAccessToken('category/'+categoryId)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        if(hideSubcat)
          formField.subCategoryId = '';
        this.setState({subCategoryList: res.data.data, formField: formField, loading: false});     
        
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

  
  /* Input Field On changes*/
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField }, () => { this.validateField(name, value) });
  };
  /*Handle catgeory Input Change and bind subcategory*/
  changeCategoryHandle = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField }, () => { this.validateField(name, value) });
    this.getSubCategoryList(value);
  }
  /* Validate Field*/
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.error = '';
   
    switch(fieldName) {         
      case 'categoryId':        
        fieldValidationErrors.category = (value !== '') ? '' : ' is required';
        break; 
      case 'subCategoryId':        
        fieldValidationErrors.subcategory = (value !== '') ? '' : ' is required';
        break; 
      case 'template_name':        
        fieldValidationErrors.template_name = (value !== '') ? '' : ' is required';
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
      (formErrors.category === ""  && formErrors.subcategory === "" && formErrors.template_name === "" && formField.categoryId !== "" && formField.subCategoryId !== "" && formField.template_name !== "") 
      ? true : false});
  }
  /* Set Error Class*/
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  /*handle Form Edit Change*/
  handleUpdatedFormHandleChange(data) {
    this.setState({templateData: data});    
  }

  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();    
    if(this.state.templateData.length < 1 ) {
      toast.error("Please create atleast single field in form");
      return false;
    }
    event.target.className += " was-validated";
    this.setState( { loading: true}, () => {

      const formInputField = this.state.formField;
      let formData = {
        "categoryId": formInputField.categoryId,
        "subCategoryId": formInputField.subCategoryId, 
        "templateName": formInputField.template_name, 
        "formField": this.state.templateData
      };
      
      if(this.state.templateId !== "" ) {
        formData.templateId = this.state.templateId;
        commonService.putAPIWithAccessToken('template', formData)
        .then( res => {        
           
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.props.history.push('/organization/template');
         
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
      else {
        commonService.postAPIWithAccessToken('template', formData)
        .then( res => {        
           
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.props.history.push('/organization/template');
         
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

  resetForm(){
    this.props.history.push('/organization/template');
  }

  toggle = () => {
    this.setState({
      showPreview: !this.state.showPreview
    });
  }

  render() {
    const { subCategoryList, loading, categoryList } = this.state;    
    const isSubscribedUser = localStorage.getItem('isSubscribed'); 
    
    let loaderElement ='';
    if(loading)
      loaderElement = <Loader />
    if(isSubscribedUser === "false" || isSubscribedUser === null ){
      return (
        <div className="animated fadeIn">
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="mainHeading">
                  <strong>Subscription Plan</strong>                  
                </CardHeader>
                <CardBody>
                  {loaderElement}                
                  <SubscriptionPlan />
                </CardBody>
              </Card>
            </Col>  
          </Row>
          
        </div>
      );
    }
    else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="mainHeading">
                  <strong>Create Template</strong>
                  <div className="previewButton"><DemoBar handleFormHandleChange = {this.handleUpdatedFormHandleChange} fileName = {this.state.formField.template_name} ></DemoBar></div>
                </CardHeader>
                <CardBody>
                  {loaderElement}                
                  <Form onSubmit={this.submitHandler} noValidate>
                    <FormErrors formErrors={this.state.formErrors} />
                    
                    <Row>
                      <Col lg={3}>
                        <FormGroup> 
                          <Label htmlFor="categoryId">Category <span className="mandatory">*</span></Label>            
                          <Input type="select" placeholder="category Name *" id="categoryId" name="categoryId" value={this.state.formField.categoryId} onChange={this.changeCategoryHandle} required >
                            <option value="">Select Category</option>
                            {categoryList.map((categoryItem, index) =>
                              <SetCategoryDropDownItem key={index} categoryItem={categoryItem} selectedCategory={this.state.formField.categoryId} />
                            )}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg={3}>
                        <FormGroup> 
                          <Label htmlFor="subCategoryId">Subcategory <span className="mandatory">*</span></Label>            
                          <Input type="select" placeholder="Subcategory Name *" id="subCategoryId" name="subCategoryId" value={this.state.formField.subCategoryId} onChange={this.changeHandler} required >
                            <option value="">Select Subcategory</option>
                            {subCategoryList.map((subCategoryItem, index) =>
                              <SetSubCategoryDropDownItem key={index} subCategoryItem={subCategoryItem} selectedCategory={this.state.formField.subCategoryId} />
                            )}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg={6}>
                          <FormGroup>
                            <Label htmlFor="template_name">Template Name</Label>            
                            <Input type="text" placeholder="Template Name *" value={this.state.formField.template_name} onChange={this.changeHandler} id="template_name" name="template_name" required />
                          </FormGroup>
                      </Col>
                      <Col lg={12}>
                        <FormGroup>
                          <Label htmlFor="templateBuilderPage">Form Builder Area</Label>
                          <div id="templateBuilderPage" className="">
                            <ReactFormBuilder data={this.state.templatePreviewData}></ReactFormBuilder>  
                            
                          </div>
                        </FormGroup>
                      </Col>
                      <Button color="primary" disabled={!this.state.formValid} type="submit">Save</Button>
                      <Button color="secondary" onClick={this.resetForm}>Cancel</Button>
                    </Row>
                  </Form>
                  
                </CardBody>
              </Card>
            </Col>  
          </Row>
          
        </div>
      );
    }
  }
}

function SetCategoryDropDownItem (props) {
  const categoryItem = props.categoryItem;
  return (<option value={categoryItem.categoryId} >{categoryItem.categoryName}</option>)
}

function SetSubCategoryDropDownItem (props) {
  const subCategoryItem = props.subCategoryItem;
  return (<option value={subCategoryItem.subCategoryId} >{subCategoryItem.subCategoryName}</option>)
}

export default TemplateBuilderPage;
