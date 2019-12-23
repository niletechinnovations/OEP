import React from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard,MDBCardBody, Button } from "mdbreact";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import './StartInspection.css';

import PreviewTemplatePageForm from './PreviewTemplatePageForm'
class StartInspection extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);
  constructor(props){
    super(props);
    this.state = {   
      loading: false, 
      formField: {},
      remarks: {},
      mediaFileInfo: {},
      formErrors: {},
      templateData: [],
      inspectionId: "",
      formValid: false,
      organizationId: "",
      templatePreviewData : [],
      formProccessing: false,
      userAnswer: {},      
    }    
    
    this.handleFormFieldName = this.handleFormFieldName.bind(this);
    this.handleUpdateFormFieldValue = this.handleUpdateFormFieldValue.bind(this);
    this.handleUpdateRemarks = this.handleUpdateRemarks.bind(this);
    this.handleUpdateMediaFile = this.handleUpdateMediaFile.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
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
            this.props.history.push('/');  
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
  /*Update Remarks*/
  handleUpdateRemarks(fieldName, fieldValue){
    let remarks = this.state.remarks;
    //fieldName = fieldName.split('remarks__');
    remarks[fieldName] = fieldValue;
    this.setState({remarks: remarks});
  }

  /*Update Media File Url*/
  handleUpdateMediaFile(fieldName, fieldValue){
    let mediaFile = this.state.mediaFileInfo;
    let fieldMedia = mediaFile[fieldName] ?  mediaFile[fieldName] : [];
    fieldMedia.push(fieldValue);
    mediaFile[fieldName] = fieldMedia;
    this.setState({mediaFile: mediaFile});
  }

  /*Submit Form Handler*/

  handleSubmitForm() {
    
    if(this.state.inspectionId == ""){
      toast.error("Something Went Wrong");
      return false;
    }
    let formData = {inspectionId: this.state.inspectionId, feedBackData: this.state.formField, remarks: this.state.remarks, mediaFile: this.state.mediaFileInfo};
    debugger;
    this.setState( { loading: true}, () => {
      commonService.postAPIWithAccessToken('inspection/feedback', formData)
        .then( res => {        
          debugger;
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
        } )
    });
  }

  render() {
    let loaderElement = '';
    if(this.state.loading)
      loaderElement = <Loader />
    return (
      <>
        <div className="main-content"> 
            <section className="">
                <MDBContainer>                   
                    {loaderElement}
                    <ToastContainer />
                    <MDBRow className="">
                        <MDBCol lg="12" className="">
                            <MDBCard>
                                <MDBCardBody>
                                    <PreviewTemplatePageForm templateField = {this.state.templatePreviewData} formField={this.state.formField} createFormFieldName={this.handleFormFieldName} updateFormFieldValue={this.handleUpdateFormFieldValue} updateRemarks={this.handleUpdateRemarks} remarksValue={this.state.remarks} updateMediaFile={this.handleUpdateMediaFile} /> 
                                    <Button onClick={this.handleSubmitForm.bind(this)} className="btn-gr">Submit</Button>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>  
        </div>
            
      </>
    );
  }
}

export default StartInspection;
