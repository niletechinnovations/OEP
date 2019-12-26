import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Button} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import InspectionFeedBackData from './InspectionFeedBackData';
import './inspection.css'

class InspectionFeedBack extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      inspectionFeedbackList: [],
      inspectionInfo : {},
      loading: true,
    }  
    this.backButtonPrevious = this.backButtonPrevious.bind(this);
  }
  // Fetch the organization List
  componentDidMount() { 
    const { match: { params } } = this.props;
    if(params.inspectionId !== undefined && params.inspectionId !=="") 
      this.inspectionFeedbackList(params.inspectionId);
    else {
      toast.error("Some thing went wrong!");
      this.props.history.push('/admin/inspection');
    }
  }
  /*Inspection Feedback List API*/
  inspectionFeedbackList(inspectionId) {      
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken(`inspection/feedback/`+inspectionId)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   
          const responseData = res.data.data;
          const inspectionFeedBack = responseData.inspectionFeedBack;
          delete responseData['inspectionFeedBack'];
          const inspectionInfo = responseData;
          
          this.setState({loading:false, inspectionFeedbackList: inspectionFeedBack, inspectionInfo: inspectionInfo});     
         
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
    this.props.history.push('/admin/inspection/');
  }
  render() {

    const { inspectionFeedbackList, loading, inspectionInfo} = this.state;     
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />    

    return (
      <div className="animated fadeIn">
        <Row>
          
          {loaderElement}
          <Col lg={12}>
            <Card>
              <CardHeader className="mainHeading">
                <strong>Feedback</strong> <Button color="" className="categoryAdd" type="button" onClick={this.backButtonPrevious}><i className="fa fa-arrow-left"></i> Back</Button>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={3}>
                        <FormGroup> 
                          <Label htmlFor="organizationId"><strong>Inspection</strong></Label>  
                          <p>{inspectionInfo.inspectionName ? inspectionInfo.inspectionName : ''}</p>
                        </FormGroup>  
                      </Col>
                      <Col lg={3}>
                        <FormGroup> 
                          <Label htmlFor="employeeId"><strong>Organization</strong> </Label>            
                          <p>{inspectionInfo.organizationName ? inspectionInfo.organizationName : ''}</p>
                        </FormGroup>
                      </Col>                     
                      <Col lg={3}>
                        <FormGroup> 
                          <Label htmlFor="templateId"><strong>Employee</strong></Label>            
                          <p>{inspectionInfo.employeeFirstName ? inspectionInfo.employeeFirstName : ''} {inspectionInfo.employeeLastName ? inspectionInfo.employeeLastName : ''}</p>
                        </FormGroup>
                      </Col>
                      <Col lg={3}>
                        <FormGroup> 
                          <Label htmlFor="templateId"><strong>Template</strong></Label>            
                          <p>{inspectionInfo.templateName ? inspectionInfo.templateName : ''}</p>
                        </FormGroup>
                      </Col>                      
                    </Row>  
                  </Col>
                  <Col md={12}>
                    <InspectionFeedBackData data={inspectionFeedbackList} inspectionInfo= {inspectionInfo} dataTableLoadingStatus = {this.state.loading} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>        
      </div>

    )
  }
}



export default InspectionFeedBack;
