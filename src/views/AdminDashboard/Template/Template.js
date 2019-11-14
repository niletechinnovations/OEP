import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import Loader from '../../Loader/Loader';
import TemplateData from './TemplateData';
import './Template.css';

class Template extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      templateList: []
    } 
    
  }
  componentDidMount() { 
    this.templateList();
  }

  /*User List API*/
  templateList() {
    
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken(`template/item/list`)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }   

          this.setState({loading:false, templateList: res.data.data});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else{
            this.setState( { loading: false } );
            toast.error(err.message); 
          }
        } )
    } )
  }

  render() {

    const { templateList, loading } = this.state; 
    let loaderElement = '';
    if(loading) 
      loaderElement = <Loader />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>User Template List</strong> 
              </CardHeader>
              <CardBody>
                <ToastContainer />
                {loaderElement}
                <TemplateData data={templateList} />
                  
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>

    )
  }
}

export default Template;
