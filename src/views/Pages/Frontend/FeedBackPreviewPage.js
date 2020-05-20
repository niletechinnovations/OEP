import React from "react";
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Tooltip} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import commonFunction from '../../../core/functions/commonFunction';
import Loader from '../../Loader/Loader';
import FeedBackPreviewPageForm from '../../AdminDashboard/Inspection/FeedBackPreviewPageForm';
import Doc from '../../FormBuilder/DocService';
import PdfContainer from '../../FormBuilder/PdfContainer';
import "../../../assets/css/font-awesome.min.css";
import "../../AdminDashboard/Inspection/FeedbackPreview.css";
class FeedBackPreviewPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {   
      loading: false,  
      feedBackId: "",     
      formProccessing: false,
      feedBackInfo: {templateFormData: [], feedBackData: {}, inspectionId: ""},
      apiUrl: "",
      tooltipOpen: false
        
    }  
    this.toggleScoreTooltip = this.toggleScoreTooltip.bind(this);
   
  }

  // Fetch the subCategory List
  componentDidMount() {
    const { match: { params } } = this.props;
    
    if(params.inspectionId !== undefined && params.inspectionId !=="") 
      this.getInspectionFeedBackDetail(params.inspectionId);
    else
      this.props.history.push('/login'); 
    const apiUrl = commonService.getAPIUrl();
    this.setState({apiUrl: apiUrl});
    
  }

  toggleScoreTooltip(){
    
    this.setState({tooltipOpen: !this.state.tooltipOpen});
  }

  getInspectionFeedBackDetail(feedBackId) {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('inspection/web/feedback/'+feedBackId)
        .then( res => {         
          
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);  
            this.props.history.push('/login');  
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
  
  createPdf = (html) => { 
    //window.postMessage(JSON.stringify({pdfUrl: this.state.feedBackInfo.downloadInspectionFeedBack}), '*');
    window.postMessage(JSON.stringify({dataType: "pdfHTml", "content": html.innerHTML}), '*');
    Doc.createPdf(html, this.state.feedBackInfo.inspectionId); 
  }
  render() {
    const { loading, feedBackInfo} = this.state;     
    let loaderElement ='';
    if(loading) {
      loaderElement = <Loader />
       return (
          <div className="animated fadeIn">
            <Row>
              <Col md={12}>
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
          <Col md={12}>
            <Card>
              <CardHeader className="mainHeading">
                <strong>Preview</strong>
              </CardHeader>
              <CardBody className="feedBackPreview">
                {loaderElement}
                <PdfContainer createPdf={this.createPdf} hideShareButton = "true" showLogo="false" templateType = "inspection" inspectionId = {this.state.feedBackInfo.inspectionId} > 

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
                              <Label htmlFor="templateId">OEP Store Walk Tier  <a className="info-icon-link" href="https://retailoep.com/GLOBAL_OPERATIONAL_EXCELLENCE_PROGRAM_CHALLENGE.pdf" target="_blank" rel="noopener noreferrer" ><i className="fa fa-info"></i></a></Label>            
                              <p>{feedBackInfo.storeWalkLevel === 1 ? 'Silver' : feedBackInfo.storeWalkLevel === 2 ? 'Glod' : feedBackInfo.storeWalkLevel === 3 ? 'Platinum' : 'Silver'}</p>
                            </FormGroup>
                          </Col>
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="templateId"># Store Rank</Label>            
                              <p>{feedBackInfo.storeRank}</p>
                            </FormGroup>
                          </Col>xcv
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
                              <Label htmlFor="score">Score <span className="info-icon-link" id="tooltipScore"><i className="fa fa-info"></i></span></Label>  
                              <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="tooltipScore" toggle={this.toggleScoreTooltip}>
                                Each Question is depend upon score point and the score reflects the missed items. These scores are factored into the world rankings and included into the Silver, Gold & Platinum banners.
                              </Tooltip>            
                              <p>{feedBackInfo.successItem}/{feedBackInfo.totalItem } - {(feedBackInfo.score * 100).toFixed(2) }%</p>
                            </FormGroup>
                          </Col> 
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="templateId">Completed On</Label>            
                              <p>{feedBackInfo.inspectionEndDate ? commonFunction.getDateTime(feedBackInfo.inspectionEndDate) : ''}</p>
                            </FormGroup>
                          </Col> 
                          <Col md={3}>
                            <FormGroup> 
                              <Label htmlFor="templateId">Duration</Label>            
                              <p>{feedBackInfo.totalDuration ? commonFunction.convertTime(feedBackInfo.totalDuration) : ''}</p>
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
