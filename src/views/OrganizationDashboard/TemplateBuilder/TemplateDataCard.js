import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Col, Row} from 'reactstrap';
import  { Link } from 'react-router-dom';

class TemplateDataCard extends Component {
  
  constructor(props){
    super(props);   
    this.state = {
      buttonProcessing: false,
      rowIndex: '',
      dataTableItem: []
    };
    
  }
  componentDidMount() {   
  }

  /*editTemplateFile(rowIndex){    
    this.props.editTemplateFile(rowIndex);
  }*/

  deleteTemplate(rowIndex){    
    this.props.deleteTemplate(rowIndex);
  }
  render() {
    
    return (
      <Row>
        {this.props.data.map((template, index) =>
          <Col lg={3} key = {index}>
            <Card className="cardArea">                
              <CardBody>

                <CardTitle className="oep-title"><b>Template :</b> {template.templateName}</CardTitle>                                
                <CardText className="oep-title"><b>Category :</b> {template.categoryName}</CardText>
                <CardText className="oep-title"><b>Subcategory :</b> {template.subCategoryName}</CardText>
                <CardText className="oep-title"><b>Status :</b> {template.status ? 'Active' : 'Inactive'}</CardText>
                <div className="card-footer-section">
                {template.isCreated ? <Link to={`/common/template/${template.templateId}`} target="_blank" className="btn-preview">Preview </Link> : ""}
                {template.isUploaded && template.uploadedFileName !== "" ? <a href={`${this.props.apiUrl}template/${template.uploadedFileName}`} target="_blank" rel="noopener noreferrer" className="btn-Uploaded">View Uploaded Template</a> : ""}
                {template.isUploaded && !template.isCreated ? <><button className="btn-Delete" onClick={() => {if( window.confirm('Are you sure you wish to delete this template?'))
                  this.deleteTemplate(index);}}>Delete</button></> : ""}
                {template.type.toLowerCase() !== 'free' && template.isCreated ? <Link to={`/organization/manage-template/create-template/${template.templateId}`} className="btn-Edit">Edit </Link> : ""} 
                {template.isCreated && template.type.toLowerCase() === 'free' ? <Link to={`/organization/manage-template/create-template/${template.templateId}?action=copy`} className="btn-copy">Edit </Link> : ""}
                
                {template.isCreated ? <Link to={`/organization/manage-inspection/assign-inspection?templateId=${template.templateId}&categoryId=${template.categoryId}&subCategoryId=${template.subCategoryId}`}  className="btn-Assign">Assign </Link> : ""}
                </div>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    );
  }
}

export default TemplateDataCard;