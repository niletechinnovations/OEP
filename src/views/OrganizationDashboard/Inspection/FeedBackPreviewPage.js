import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Button, FormGroup, Label} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import commonFunction from '../../../core/functions/commonFunction';
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
                <PdfContainer createPdf={this.createPdf} templateType = "inspection" inspectionId = {this.state.feedBackInfo.inspectionId}>  
                  <div className="card-Preview-info"> 
                    <Row>
                      <Col md={12}>
                        <Row>                        
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="employeeId">Store Name</Label>            
                              <p>{feedBackInfo.storeName ? feedBackInfo.storeName : ''}</p>
                            </FormGroup>
                          </Col>  
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="templateId">OEP Store Walk Tier</Label>            
                              <p>{feedBackInfo.storeWalkLevel === 1 ? 'Silver' : feedBackInfo.storeWalkLevel === 2 ? 'Glod' : feedBackInfo.storeWalkLevel === 3 ? 'Platinum' : 'Silver'}</p>
                            </FormGroup>
                          </Col>
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="templateId"># Store Rank</Label>            
                              <p>{feedBackInfo.storeRank}</p>
                            </FormGroup>
                          </Col>
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="templateId">Started On</Label>            
                              <p>{feedBackInfo.inspectionStartDate ? commonFunction.getDateTime(feedBackInfo.inspectionStartDate) : ''}</p>
                            </FormGroup>
                          </Col>                   
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="templateId">Prepared By</Label>            
                              <p>{feedBackInfo.employeeName}</p>
                            </FormGroup>
                          </Col>
                                             
                          <Col md={6}>
                            <FormGroup> 
                              <Label htmlFor="score">Address</Label>             
                              <p>{feedBackInfo.addressInfo ? `${feedBackInfo.addressInfo.formatted_address}` : ""}</p>
                              <p>{feedBackInfo.addressInfo ? `(${feedBackInfo.addressInfo.latitude},${feedBackInfo.addressInfo.longitude})` : ""}</p>
                            </FormGroup>
                          </Col>
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="score">State</Label>             
                              <p>{feedBackInfo.addressInfo ? `${feedBackInfo.addressInfo.state}` : ""}</p>
                            </FormGroup>
                          </Col>  
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="score">Score</Label>            
                              <p>{feedBackInfo.successItem}/{feedBackInfo.totalItem } - {feedBackInfo.score * 100 }%</p>
                            </FormGroup>
                          </Col> 
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="templateId">Completed On</Label>            
                              <p>{feedBackInfo.inspectionEndDate ? commonFunction.getDateTime(feedBackInfo.inspectionEndDate) : ''}</p>
                            </FormGroup>
                          </Col>                 
                        </Row>  
                      </Col>                    
                    </Row>
                  </div>             
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
