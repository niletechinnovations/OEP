import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import  { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import { FormErrors } from '../../Formerrors/Formerrors';

import "../../../assets/css/font-awesome.min.css";
import "react-form-builder2/dist/app.css";
import "./AssignInspection.css";
const queryString = require('query-string');
class AssignInspection extends React.Component {
  constructor(props){
    super(props);
    this.state = {      
      subCategoryList: [],      
      loading: false,      
      categoryList: [], 
      formField: { categoryId: '', subCategoryId: '', inspection_name: '', organizationId: '', employeeId: '', templateId: '', storeId: ''},
      formErrors: {category: '', subcategory: '', organization: '', store: '', employee: '', template: '', inspection_name: '', error: ''},
      employeeList: [],
      templateList: [],
      templateData: [],
      storeList: [],
      inspectionId: "",
      selectedEmployeList: [{employeeId: "", storeId: []}],
      formValid: false,
      templatePreviewData : [],
      formProccessing: false,
      changeDropDown: false
    }     
    this.getSubCategoryList = this.getSubCategoryList.bind(this);
    this.getEmployeeList = this.getEmployeeList.bind(this);
    this.getStoreList = this.getStoreList.bind(this);
    this.getTemplateList = this.getTemplateList.bind(this);   
    this.submitHandler = this.submitHandler.bind(this);  
    this.resetForm = this.resetForm.bind(this); 
  }

  // Fetch the subCategory List
  componentDidMount() {
    const { match: { params } } = this.props;
    if(params.inspectionId !== undefined && params.inspectionId !=="") 
      this.getInspectionDetail(params.inspectionId);
    const queryParams = queryString.parse(this.props.location.search);
    
    if(queryParams.templateId && queryParams.categoryId && queryParams.subCategoryId) {
      let formField = this.state.formField;
      formField.categoryId = queryParams.categoryId;
      formField.subCategoryId = queryParams.subCategoryId;
      formField.templateId = queryParams.templateId;
      this.setState({formField: formField});
      this.getSubCategoryList(queryParams.categoryId, false);
      this.getTemplateList(queryParams.categoryId, queryParams.subCategoryId, false);
    }
      
    this.categoryList();
    this.getEmployeeList();
    this.getStoreList();
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
          formField.storeId = inspectionDetail.storeId;
          let selectedEmployeList = this.state.selectedEmployeList;
          selectedEmployeList[0].employeeId = inspectionDetail.employeeId;
          selectedEmployeList[0].storeId = inspectionDetail.storeId;
          this.getSubCategoryList(inspectionDetail.categoryId, false);          
          this.getTemplateList(inspectionDetail.categoryId, inspectionDetail.subCategoryId, false);
          this.setState({loading:false, formField: formField, formValid: true, inspectionId: inspectionDetail.inspectionId, selectedEmployeList: selectedEmployeList});     
         
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

  /*get Employee List*/
  getEmployeeList(hideEmployee = true) {
    const formField = this.state.formField;    
    this.setState( { loading: true}, () => { 
      commonService.getAPIWithAccessToken('employee')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        if(hideEmployee)
          formField.employeeId = '';
        let employeeList = [];
        let authId = commonService.getAuthId();
        if(authId !== "" ){
          employeeList.push({authId: authId, firstName: 'Self', lastName: ''});
          for(let i = 0; i < res.data.data.length; i++) {
            employeeList.push(res.data.data[i]);
          }
        }
        else
          employeeList = res.data.data;
        this.setState({employeeList: employeeList, formField: formField, loading: false});     
        
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

  /*get Store List*/
  getStoreList(hideStore = true) {
    const formField = this.state.formField;
    
    this.setState( { loading: true}, () => { 
      commonService.getAPIWithAccessToken('store')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        if(hideStore)
          formField.storeId = '';
        this.setState({storeList: res.data.data, formField: formField, loading: false});     
        
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
      (formErrors.category === ""  && formErrors.subcategory === "" && formErrors.inspection_name === "" && formErrors.template === "" && formField.categoryId !== "" && formField.subCategoryId !== "" && formField.inspection_name !== ""  && formField.templateId !== "") 
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
      
      let selectedEmployeList = this.state.selectedEmployeList;
      selectedEmployeList = selectedEmployeList.filter(i => i.employeeId !=="" && i.storeId.length > 0 );
      if(selectedEmployeList.length === 0) {
        toast.error("Please select atleast one employee and store");
        this.setState( { loading: false});
        return;
      }
      const formInputField = this.state.formField;
      let formData = {
        "categoryId": formInputField.categoryId,
        "subCategoryId": formInputField.subCategoryId, 
        "inspectionName": formInputField.inspection_name,        
        "templateId": formInputField.templateId,
        "assignEmployee": selectedEmployeList
      };
      
      if(this.state.inspectionId !== ""){
        formData.employeeId = selectedEmployeList[0].employeeId;
        formData.storeId = selectedEmployeList[0].storeId[0];
      }
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
          this.props.history.push('/organization/manage-inspection/inspection');
         
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
          this.props.history.push('/organization/manage-inspection/inspection');
         
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
    this.props.history.push('/organization/manage-inspection/inspection');
  }


  addMoreOption() {
    let selectedEmployeList = this.state.selectedEmployeList;   
    if(selectedEmployeList.length < this.state.employeeList.length) {
      selectedEmployeList.push({"employeeId" : "", "storeId": []});
      this.setState({selectedEmployeList: selectedEmployeList});
    }
  }

  removeOptions(event) {
    let selectedEmployeList = this.state.selectedEmployeList;    
    selectedEmployeList.splice(event.target.id, 1);
    if(selectedEmployeList.length === 0){
      selectedEmployeList.push({"employeeId" : "", "storeId": []});
      toast.error("Please select atleast one employee and store");
    }
    this.setState({selectedEmployeList: selectedEmployeList});
  }
  /* Change Employee handler*/
  changeEmployeeHandler = event => {    
    let selectedEmployeList = this.state.selectedEmployeList;
    const inputName = event.target.name.split('_');
    const currentEmployee = selectedEmployeList.map(i => i.employeeId);
    if(inputName[0] === "employeeId") {
      if(currentEmployee.indexOf(event.target.value) > -1 && event.target.value !== ""){
        toast.error("Please select another employee. This employee already selected"); 
        return;
      }
      else
        selectedEmployeList[inputName[1]].employeeId = event.target.value;
    }
    else
      selectedEmployeList[inputName[1]].storeId = event.target.value;
    this.setState({selectedEmployeList: selectedEmployeList});
   
  }
  changeStoreHandler = event => {    
    
    let selectedEmployeList = this.state.selectedEmployeList;
    let inputName = event.target.name.split('_');
    inputName = inputName[1].split('[]');   
    let storeIds = [];
    event.target.selectedOptions.forEach(function(data, index) {
      console.log(index);
      storeIds.push(data.value); 
    });
    selectedEmployeList[inputName[0]].storeId = storeIds;
    this.setState({selectedEmployeList: selectedEmployeList});
   
  }

  render() {
    const { subCategoryList, loading, categoryList, employeeList, templateList, storeList } = this.state;     
    let loaderElement ='';
    const isMulti = (this.state.inspectionId !== "") ? false : true;
    if(loading)
      loaderElement = <Loader />
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <div className="oep-em-info">
            <Card className="oep-card">
              <CardHeader className="mainHeading">
                <strong>Assign Inspection</strong>
              </CardHeader>
              <CardBody>
                {loaderElement}
                <ToastContainer />
                <Form className="oep-form" onSubmit={this.submitHandler} noValidate>
                  <FormErrors formErrors={this.state.formErrors} />
                  <Row>                   
                    <Col md={isMulti ? 12 : 12}>
                                           
                        {this.state.selectedEmployeList.map((selectedEmployeItem, index) =>
                            <div className="selectedEmployeItem-list"> 
                            <Row key={index}>
                              <Col md={isMulti ? 5 : 6}> 
                                <FormGroup>
                                  <Label htmlFor="employee">Employee</Label>
                                   <Input type="select" placeholder={selectedEmployeItem.employeeId} key={index} name={`employeeId_${index}`} value={selectedEmployeItem.employeeId} onChange={this.changeEmployeeHandler} required = { index === 0 ? true : false } >
                                    <option value="">Select Employee</option>
                                    {employeeList.map((employeeItem, employeeIndex) =>
                                      <SetEmployeeDropDownItem key={employeeIndex} employeeInfo={employeeItem} selectedEmployee={this.state.selectedEmployeList} />
                                    )}
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col md={isMulti ? 5 : 6}>
                                <FormGroup> 
                                  <Label htmlFor="storeId">Store <span className="mandatory">*</span></Label>            
                                  <Input type="select" multiple={isMulti} placeholder={index} key={index} name={`storeId_${index}[]`} value={selectedEmployeItem.storeId} onChange={this.changeStoreHandler} required = { index === 0 ? true : false } >
                                    <option value="">Select Store</option>
                                    {storeList.map((storeItem, storeIndex) =>
                                      <SetStoreDropDownItem key={storeIndex} storeItem={storeItem} selectedCategory={this.state.formField.storeId} />
                                    )}
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col md={2} className={!isMulti ? 'hide' : ''}>
                                <a className="btnRemove" id={index} key={index}  onClick={this.removeOptions.bind(this)}><i className="fa fa-times"></i> Remove</a>
                              </Col>
                            </Row>
                            </div>  
                          )}
                                                
                    </Col>
                    <Col md={12} className={!isMulti ? 'hide' : ''}>
                        <a className="Addemp-btn"  onClick={this.addMoreOption.bind(this)} disabled={this.state.selectedEmployeList.length === employeeList.length || employeeList.length === 0 ? true : false}><i className="fa fa-plus"></i> Add More</a>
                    </Col>
                    <Col lg={3} md={3}>
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
                    <Col lg={3} md={3}>
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
                    <Col lg={3} md={3}>
                      <FormGroup> 
                        <Label htmlFor="templateId">Template <span className="mandatory">*</span>  </Label>            
                        <Input type="select" placeholder="Subcategory Name *" id="templateId" name="templateId" value={this.state.formField.templateId} onChange={this.changeHandler} required >
                          <option value="">Select Template</option>
                          {templateList.map((templateItem, index) =>
                            <SetTemplateDropDownItem key={index} templateItem={templateItem} selectedCategory={this.state.formField.templateId} />
                          )}
                        </Input>
                        
                      </FormGroup>
                    </Col>  
                    
                      {this.state.formField.templateId ? <Col lg={3} md={3}><div className="previewTemplateIcon"><Link to={`/common/template/${this.state.formField.templateId}`} target="_blank" className="Preview-btn">Preview Template </Link></div></Col>  : ""}
                                     
                    <Col lg={12} md={12}>
                        <FormGroup>
                          <Label htmlFor="inspection_name">Inspection Name</Label>            
                          <Input type="text" placeholder="Inspection Name *" value={this.state.formField.inspection_name} onChange={this.changeHandler} id="inspection_name" name="inspection_name" required />
                        </FormGroup>
                    </Col>
                    
                    <Button className="search-btn" disabled={!this.state.formValid} type="submit">Save</Button>
                    <Button className="btnCancel"  onClick={this.resetForm}>Cancel</Button>
                  </Row>
                </Form>
                
              </CardBody>
            </Card>
            </div>
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



function SetEmployeeDropDownItem(props){
  const employeeInfo = props.employeeInfo;
  return (<option value={employeeInfo.authId} >{employeeInfo.firstName+' '+employeeInfo.lastName}</option>)
}

function SetTemplateDropDownItem(props){
  const templateDetail = props.templateItem;
  return (<option value={templateDetail.templateId} >{templateDetail.templateName}</option>)
}

function SetStoreDropDownItem(props){
  const storeDetail = props.storeItem;
  return (<option value={storeDetail.storeId} >{storeDetail.storeName}</option>)
}

export default AssignInspection;
