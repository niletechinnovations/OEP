import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Button, FormGroup, Label} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import FeedBackPreviewPageForm from './FeedBackPreviewPageForm';
import Doc from '../../FormBuilder/DocService';
import PdfContainer from '../../FormBuilder/PdfContainer';
import "../../../assets/css/font-awesome.min.css";
import "./FeedbackPreview.css";
class FeedBackPreviewPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {   
      loading: false,  
      feedBackId: "",     
      formProccessing: false,
      feedBackInfo: {templateFormData: [], feedBackData: {}, inspectionId: ""},
      apiUrl: ""
        
    }  
    this.backButtonPrevious = this.backButtonPrevious.bind(this); 
  }

  // Fetch the subCategory List
  componentDidMount() {
    const { match: { params } } = this.props;
    
    if(params.feedBackId !== undefined && params.feedBackId !=="") 
      this.getInspectionFeedBackDetail(params.feedBackId);
    const apiUrl = commonService.getAPIUrl();
    this.setState({apiUrl: apiUrl});
  }

  getInspectionFeedBackDetail(feedBackId) {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('inspection/feedback/detail/'+feedBackId)
        .then( res => {         
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);  
            this.props.history.push('/organization/inspection');  
            return;
          } 
          const feedBackDetail = res.data.data;
                
          this.setState({loading:false, feedBackInfo: feedBackDetail});     
         
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
  backButtonPrevious(){
    this.props.history.push('/organization/inspection/'+this.state.feedBackInfo.inspectionId);
  }
  createPdf = (html) => Doc.createPdf(html, this.state.feedBackInfo.inspectionId);
  render() {
    const { loading, feedBackInfo} = this.state;     
    let loaderElement ='';
    if(loading) {
      loaderElement = <Loader />
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
                <strong>Preview FeedBack Template </strong><Button color="" className="categoryAdd" type="button" onClick={this.backButtonPrevious}><i className="fa fa-arrow-left"></i> Back</Button>
              </CardHeader>
              <CardBody className="feedBackPreview">
                {loaderElement}
                <PdfContainer createPdf={this.createPdf}>  
                  <Row className="card-Preview-info">
                    <Col md={12}>
                      <Row>
                        
                            <Col md={3}>
                              <FormGroup> 
                                <Label htmlFor="organizationId"><strong>Inspection</strong></Label>  
                                <p>{feedBackInfo.inspectionName ? feedBackInfo.inspectionName : ''}</p>
                              </FormGroup>  
                            </Col>
                            <Col lg={3}>
                              <FormGroup> 
                                <Label htmlFor="employeeId"><strong>Organization</strong> </Label>            
                                <p>{feedBackInfo.organizationName ? feedBackInfo.organizationName : ''}</p>
                              </FormGroup>
                            </Col>                     
                            <Col lg={3}>
                              <FormGroup> 
                                <Label htmlFor="templateId"><strong>Employee</strong></Label>            
                                <p>{feedBackInfo.employeeName}</p>
                              </FormGroup>
                            </Col>
                            <Col lg={3}>
                              <FormGroup> 
                                <Label htmlFor="templateId"><strong>Template</strong></Label>            
                                <p>{feedBackInfo.templateName ? feedBackInfo.templateName : ''}</p>
                              </FormGroup>
                            </Col>  
                            <Col lg={3}>
                              <FormGroup> 
                                <Label htmlFor="templateId"><strong>Template</strong></Label>            
                                <p>{feedBackInfo.templateName ? feedBackInfo.templateName : ''}</p>
                              </FormGroup>
                            </Col>
                            <Col lg={3}>
                              <FormGroup> 
                                <Label htmlFor="score"><strong>Score</strong></Label>            
                                <p>{feedBackInfo.score * 100 }%</p>
                              </FormGroup>
                            </Col> 
                            <Col lg={3}>
                              <FormGroup> 
                                <Label htmlFor="score"><strong>Failed Item</strong></Label>            
                                <p>{feedBackInfo.failedItem}</p>
                              </FormGroup>
                            </Col> 
                            <Col lg={6}>
                              <FormGroup> 
                                <Label htmlFor="score"><strong>Address</strong></Label>            
                                <p>{`${feedBackInfo.address} ${feedBackInfo.city} ${feedBackInfo.state} ${feedBackInfo.country}`}</p>
                              </FormGroup>
                              
                        </Col>
                      </Row>
                    </Col>                    
                  </Row>             
                  <FeedBackPreviewPageForm templateField = {this.state.feedBackInfo.templateFormData} feedBackData = {this.state.feedBackInfo.feedBackData} apiUrl={this.state.apiUrl}   /> 
                </PdfContainer>
              </CardBody>
            </Card>
          </Col>  
        </Row>
        
      </div>
    );
  }
}

export default FeedBackPreviewPage;
