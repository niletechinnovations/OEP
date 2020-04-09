import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Form, Button} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import { FormErrors } from '../../Formerrors/Formerrors';
import PreviewTemplatePageForm from './PreviewTemplatePageForm'
import "../../../assets/css/font-awesome.min.css";
import "react-form-builder2/dist/app.css";
import "./TemplateBuilderPage.css";

class PreviewTemplatePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {      
      subCategoryList: [],      
      loading: false,      
      categoryList: [], 
      formField: {},
      formErrors: {},
      templateData: [],
      inspectionId: "",
      formValid: false,
      templatePreviewData : [],
      formProccessing: false,
      userAnswer: {},      
    }    
    this.submitHandler = this.submitHandler.bind(this);  
    this.resetForm = this.resetForm.bind(this); 
    this.handleFormFieldName = this.handleFormFieldName.bind(this);
    this.handleUpdateFormFieldValue = this.handleUpdateFormFieldValue.bind(this);
  }

  // Fetch the subCategory List
  componentDidMount() {
    const { match: { params } } = this.props;
    if(params.inspectionId !== undefined && params.inspectionId !=="") 
      this.getInspectionDetail(params.inspectionId);
  }

  getInspectionDetail(inspectionId) {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('inspection/'+inspectionId)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);  
            this.props.history.push('/inspection');  
            return;
          } 
          const inspectionDetail = res.data.data;

          let formField = this.state.formField;
          formField.categoryId = inspectionDetail.categoryId;
          formField.subCategoryId = inspectionDetail.subCategoryId;
          formField.template_name = inspectionDetail.templateName;          
          this.setState({loading:false, formField: formField, formValid: true, inspectionId: inspectionDetail.inspectionId, templateId: inspectionDetail.templateId, organizationId: inspectionDetail.organizationId, templatePreviewData: inspectionDetail.templateFormData});     
         
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
  

  
  /* Input Field On changes*/
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField }, () => { this.validateField(name, value) });
  };
 
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

  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();   
    const formErrors = this.state.formErrors;
    let formField = this.state.formField;
    let count = 0;
    Object.keys(formErrors).forEach(function(key) {
        if(formField[key] !== undefined && formField[key] === "")
          count++;
    });
    if(count > 0 ){
      toast.error("Please fill all required field");
      return;
    }    
    let formData = {}
    formData.inspectionId = this.state.inspectionId;
    formData.templateId = this.state.templateId;
    formData.organizationId = this.state.organizationId;
    formData.feedBackData = formField;
    
    
    commonService.postAPIWithAccessToken('inspection/feedback', formData)
      .then( res => {        
         
        if ( undefined === res.data.data || !res.data.status ) { 
          this.setState( { loading: false} );
          toast.error(res.data.message);
          return;
        } 
        
        this.setState({ modal: false});
        toast.success(res.data.message);
        //this.props.history.push('/admin/template');
       
      } )
      .catch( err => {     
            
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else
          this.setState( { loading: false } );
          toast.error(err.message);
      } );
  };

  resetForm(){
    this.props.history.push('/admin/inspection');
  }

  toggle = () => {
    this.setState({
      showPreview: !this.state.showPreview
    });
  }

  handleFormFieldName(formFieldName, requiredFieldError) {   
    this.setState({formField: formFieldName, formErrors: requiredFieldError});    
  }
  handleUpdateFormFieldValue(fieldName, fieldValue) {
    let formField = this.state.formField;
    formField[fieldName] = fieldValue;
    this.setState({formField: formField});
  }
  render() {
    const { loading } = this.state;     
    let loaderElement ='';
    if(loading) {
      loaderElement = <Loader />
       return (
          <div className="animated fadeIn">
            <Row>
              <Col lg={12}>
                <Card className="oep-card">
                  <CardHeader className="mainHeading">
                    <strong>Preview Template</strong>
                  </CardHeader>
                  <CardBody>
                    {loaderElement}
                    
                  </CardBody>
                </Card>
              </Col>  
            </Row>
            
          </div>
        );
    }
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="mainHeading">
                <strong>Preview Template</strong>
              </CardHeader>
              <CardBody>
                {loaderElement}               
                <Form onSubmit={this.submitHandler} noValidate>
                  <FormErrors formErrors={this.state.formErrors} />
                  <PreviewTemplatePageForm templateField = {this.state.templatePreviewData} answers={this.state.userAnswer} createFormFieldName={this.handleFormFieldName} updateFormFieldValue={this.handleUpdateFormFieldValue}  /> 
                  <Button className="submit-btn" disabled={!this.state.formValid} type="submit">Save</Button>
                  <Button className="btnCancel" onClick={this.resetForm}>Cancel</Button>
                </Form>
                
              </CardBody>
            </Card>
          </Col>  
        </Row>
        
      </div>
    );
  }
}

export default PreviewTemplatePage;
