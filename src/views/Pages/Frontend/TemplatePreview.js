import React from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard,MDBCardBody } from "mdbreact";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import './TemplatePreview.css';
import Doc from '../../FormBuilder/DocService';
import PdfContainer from '../../FormBuilder/PdfContainer';
import PreviewTemplatePageForm from '../../AdminDashboard/TemplateBuilder/PreviewTemplatePageForm'
class TemplatePreview extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);
  constructor(props){
    super(props);
    this.state = {   
      loading: false, 
      formField: {},
      formErrors: {},
      templateData: [],
      templateId: "",
      formValid: false,
      templatePreviewData : [],
      formProccessing: false,
      userAnswer: {},      
    }    
    
    this.handleFormFieldName = this.handleFormFieldName.bind(this);
    this.handleUpdateFormFieldValue = this.handleUpdateFormFieldValue.bind(this);
  }

  // Fetch the subCategory List
  componentDidMount() {
    const { match: { params } } = this.props;
    if(params.templateId !== undefined && params.templateId !=="") 
      this.getTemplateDetail(params.templateId);
  }

  getTemplateDetail(templateId) {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('template/'+templateId)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);  
            this.props.history.push('/');  
            return;
          } 
          const templateDetail = res.data.data;

          let formField = this.state.formField;
          formField.categoryId = templateDetail.categoryId;
          formField.subCategoryId = templateDetail.subCategoryId;
          formField.template_name = templateDetail.templateName;          
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
  handleFormFieldName(formFieldName, requiredFieldError) {   
    this.setState({formField: formFieldName, formErrors: requiredFieldError});    
  }
  handleUpdateFormFieldValue(fieldName, fieldValue) {
    let formField = this.state.formField;
    formField[fieldName] = fieldValue;
    this.setState({formField: formField});
  }
  createPdf = (html) => Doc.createPdf(html, this.state.templateId);
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
                        <MDBCol lg="12" className="card-info-box">
                            <MDBCard>
                                <MDBCardBody>
                                  <PdfContainer createPdf={this.createPdf} templateType = "template" history = {this.props.history} shareTemplate = "yes" templateId = {this.state.templateId}>
                                    <PreviewTemplatePageForm templateField = {this.state.templatePreviewData} answers={this.state.userAnswer} createFormFieldName={this.handleFormFieldName} updateFormFieldValue={this.handleUpdateFormFieldValue}  /> 
                                  </PdfContainer>
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

export default TemplatePreview;
