import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import { FormErrors } from '../../Formerrors/Formerrors';

import "../../../assets/css/font-awesome.min.css";
import "react-form-builder2/dist/app.css";
import "./AssignInspection.css";
class AssignInspection extends React.Component {
  constructor(props){
    super(props);
    this.state = {      
      subCategoryList: [],      
      loading: false,      
      categoryList: [], 
      formField: { categoryId: '', subCategoryId: '', inspection_name: '', organizationId: '', employeeId: '', templateId: ''},
      formErrors: {category: '', subcategory: '', organization: '', employee: '', template: '', inspection_name: '', error: ''},
      organizationList: [],
      employeeList: [],
      templateList: [],
      templateData: [],
      inspectionId: "",
      formValid: false,
      templatePreviewData : [],
      formProccessing: false
    }     
    this.getSubCategoryList = this.getSubCategoryList.bind(this);
    this.getEmployeeList = this.getEmployeeList.bind(this);
    this.getTemplateList = this.getTemplateList.bind(this);   
    this.submitHandler = this.submitHandler.bind(this);  
    this.resetForm = this.resetForm.bind(this); 
  }

  // Fetch the subCategory List
  componentDidMount() {
    const { match: { params } } = this.props;
    if(params.inspectionId !== undefined && params.inspectionId !=="") 
      this.getInspectionDetail(params.inspectionId);
      
    this.categoryList();
    this.organizationList();
  }

  getInspectionDetail(inspectionId) {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('inspection/'+inspectionId)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);  
            this.props.history.push('/template');  
            return;
          } 
          const inspectionDetail = res.data.data;

          let formField = this.state.formField;
          formField.categoryId = inspectionDetail.categoryId;
          formField.subCategoryId = inspectionDetail.subCategoryId;
          formField.inspection_name = inspectionDetail.inspectionName;
          formField.organizationId = inspectionDetail.organizationId;
          formField.employeeId = inspectionDetail.employeeId;
          formField.templateId = inspectionDetail.templateId;
          this.getSubCategoryList(inspectionDetail.categoryId, false);
          this.getEmployeeList(inspectionDetail.organizationId, false);
          this.getTemplateList(inspectionDetail.categoryId, inspectionDetail.subCategoryId, false);
          this.setState({loading:false, formField: formField, formValid: true, inspectionId: inspectionDetail.inspectionId});     
         
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
  /*Organization List API*/
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
          else 
            this.setState( { loading: false } );
        } )
    });
    
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

  /*get Employee List*/
  getEmployeeList(organizationId, hideEmployee = true) {
    const formField = this.state.formField;
    if(organizationId === "") {      
      formField.employeeId = '';
      this.setState({ formField: formField, employeeList: [] });
      return;
    }
    this.setState( { loading: true}, () => { 
      commonService.getAPIWithAccessToken('store-walk?organizationId='+organizationId)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        if(hideEmployee)
          formField.employeeId = '';
        this.setState({employeeList: res.data.data, formField: formField, loading: false});     
        
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

  /*Get Template List*/
  getTemplateList(categoryId, subCategoryId, hideSubcat = true){
    const formField = this.state.formField;
    if(categoryId === "" || subCategoryId === "") {      
      formField.templateId = '';
      this.setState({ formField: formField, templateList: [] });
      return;
    }
    this.setState( { loading: true}, () => { 
      commonService.getAPIWithAccessToken("template?categoryId="+categoryId+"&subCategoryId="+subCategoryId)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        if(hideSubcat)
          formField.templateId = '';
        this.setState({templateList: res.data.data, formField: formField, loading: false});     
        
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

  /* Handle Subcategory Change*/
  changeSubCategoryHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField }, () => { this.validateField(name, value) });
    this.getTemplateList(formField.categoryId, value);
  }

  /*Handle Employee Change*/
  changeOrganizationHandle = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField }, () => { this.validateField(name, value) });
    this.getEmployeeList(value);
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
      case 'inspection_name':        
        fieldValidationErrors.inspection_name = (value !== '') ? '' : ' is required';
        break;
      case 'organizationId':        
        fieldValidationErrors.organization = (value !== '') ? '' : ' is required';
        break;

      case 'employeeId':        
        fieldValidationErrors.employee = (value !== '') ? '' : ' is required';
        break;

      case 'templateId':        
        fieldValidationErrors.template = (value !== '') ? '' : ' is required';
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
      (formErrors.category === ""  && formErrors.subcategory === "" && formErrors.inspection_name === "" && formErrors.organization === "" && formErrors.employee === "" && formErrors.template === "" && formField.categoryId !== "" && formField.subCategoryId !== "" && formField.inspection_name !== "" && formField.organizationId !== "" && formField.employeeId !== "" && formField.templateId !== "") 
      ? true : false});
  }
  /* Set Error Class*/
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();   
    event.target.className += " was-validated";
    this.setState( { loading: true}, () => {

      const formInputField = this.state.formField;
      let formData = {
        "categoryId": formInputField.categoryId,
        "subCategoryId": formInputField.subCategoryId, 
        "inspectionName": formInputField.inspection_name, 
        "organizationId": formInputField.organizationId,
        "employeeId": formInputField.employeeId,
        "templateId": formInputField.templateId
      };
      
      if(this.state.inspectionId !== "" ) {
        formData.inspectionId = this.state.inspectionId;
        commonService.putAPIWithAccessToken('inspection', formData)
        .then( res => {        
           
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.props.history.push('/admin/inspection');
         
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
        commonService.postAPIWithAccessToken('inspection', formData)
        .then( res => {        
           
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.props.history.push('/admin/inspection');
         
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
    this.props.history.push('/admin/inspection');
  }

  render() {
    const { subCategoryList, loading, categoryList, organizationList, employeeList, templateList } = this.state;     
    let loaderElement ='';
    if(loading)
      loaderElement = <Loader />
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="mainHeading">
                <strong>Assign Inspection</strong>
              </CardHeader>
              <CardBody>
                {loaderElement}
                <ToastContainer />
                <Form onSubmit={this.submitHandler} noValidate>
                  <FormErrors formErrors={this.state.formErrors} />
                  <Row>
                    <Col md={"6"}>
                      <FormGroup> 
                        <Label htmlFor="organizationId">Organization <span className="mandatory">*</span></Label>            
                        <Input type="select" placeholder="Organization *" id="organizationId" name="organizationId" value={this.state.formField.organizationId} onChange={this.changeOrganizationHandle} >
                          <option value="">Select Organization</option>
                          {organizationList.map((organizationInfo, index) =>
                            <SetOrganizationDropDownItem key={index} organizationInfo={organizationInfo} />
                          )}
                        </Input>
                      </FormGroup>  
                    </Col>
                    <Col lg={6}>
                      <FormGroup> 
                        <Label htmlFor="employeeId">Employee <span className="mandatory">*</span></Label>            
                        <Input type="select" placeholder="Employee Name *" id="employeeId" name="employeeId" value={this.state.formField.employeeId} onChange={this.changeHandler} required >
                          <option value="">Select Subcategory</option>
                          {employeeList.map((employeeInfo, index) =>
                            <SetEmployeeDropDownItem key={index} employeeInfo={employeeInfo} selectedCategory={this.state.formField.employeeId} />
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
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
                    <Col lg={6}>
                      <FormGroup> 
                        <Label htmlFor="subCategoryId">Subcategory <span className="mandatory">*</span></Label>            
                        <Input type="select" placeholder="Subcategory Name *" id="subCategoryId" name="subCategoryId" value={this.state.formField.subCategoryId} onChange={this.changeSubCategoryHandler} required >
                          <option value="">Select Subcategory</option>
                          {subCategoryList.map((subCategoryItem, index) =>
                            <SetSubCategoryDropDownItem key={index} subCategoryItem={subCategoryItem} selectedCategory={this.state.formField.subCategoryId} />
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup> 
                        <Label htmlFor="templateId">Template <span className="mandatory">*</span></Label>            
                        <Input type="select" placeholder="Subcategory Name *" id="templateId" name="templateId" value={this.state.formField.templateId} onChange={this.changeHandler} required >
                          <option value="">Select Template</option>
                          {templateList.map((templateItem, index) =>
                            <SetTemplateDropDownItem key={index} templateItem={templateItem} selectedCategory={this.state.formField.templateId} />
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup>
                          <Label htmlFor="inspection_name">Inspection Name</Label>            
                          <Input type="text" placeholder="Inspection Name *" value={this.state.formField.inspection_name} onChange={this.changeHandler} id="inspection_name" name="inspection_name" required />
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

function SetCategoryDropDownItem (props) {
  const categoryItem = props.categoryItem;
  return (<option value={categoryItem.categoryId} >{categoryItem.categoryName}</option>)
}

function SetSubCategoryDropDownItem (props) {
  const subCategoryItem = props.subCategoryItem;
  return (<option value={subCategoryItem.subCategoryId} >{subCategoryItem.subCategoryName}</option>)
}

function SetOrganizationDropDownItem (props) {
  const organizationInfo = props.organizationInfo;
  return (<option value={organizationInfo.authId} >{organizationInfo.organizationName}</option>)
}

function SetEmployeeDropDownItem(props){
  const employeeInfo = props.employeeInfo;
  return (<option value={employeeInfo.authId} >{employeeInfo.firstName+' '+employeeInfo.lastName}</option>)
}

function SetTemplateDropDownItem(props){
  const templateDetail = props.templateItem;
  return (<option value={templateDetail.templateId} >{templateDetail.templateName}</option>)
}

export default AssignInspection;