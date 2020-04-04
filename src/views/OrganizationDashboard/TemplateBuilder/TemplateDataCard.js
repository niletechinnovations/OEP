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

  editTemplateFile(rowIndex){    
    this.props.editTemplateFile(rowIndex);
  }

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
                <CardTitle>Template Name : <b>{template.templateName}</b></CardTitle>                                
                <CardText>Category Name : <b>{template.categoryName}</b></CardText>
                <CardText>Subcategory Name : <b>{template.subCategoryName}</b></CardText>
                <CardText>Status : <b>{template.status ? 'Active' : 'Inactive'}</b></CardText>
                <div className="card-footer-section">{template.type.toLowerCase() !== 'free' && template.isCreated ? <Link to={`/organization/manage-template/create-template/${template.templateId}`} className="btn-view"><i className="fa fa-pencil"></i> </Link> : ""} 
                {template.isCreated ? <Link to={`/organization/manage-template/create-template/${template.templateId}?action=copy`} className="btn-view"><i className="fa fa-copy"></i> </Link> : ""}
                {template.isCreated ? <Link to={`/common/template/${template.templateId}`} target="_blank" className="btn-view"><i className="fa fa-eye"></i> </Link> : ""}
                {template.isCreated ? <Link to={`/organization/manage-inspection/assign-inspection?templateId=${template.templateId}&categoryId=${template.categoryId}&subCategoryId=${template.subCategoryId}`}  className="search-btn">Assign </Link> : ""}
                {template.isUploaded && template.uploadedFileName !== "" ? <a href={`${this.props.apiUrl}template/${template.uploadedFileName}`} target="_blank" rel="noopener noreferrer" className="btn-view"><i className="fa fa-download"></i></a> : ""}
                {template.isUploaded && !template.isCreated ? <><button className="btn-view" onClick={() => 
                  this.editTemplateFile(index)}><i className="fa fa-pencil"></i></button> <button className="btn-view" onClick={() => {if( window.confirm('Are you sure you wish to delete this template?'))
                  this.deleteTemplate(index);}}><i className="fa fa-trash"></i></button></> : ""}</div>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    );
  }
}

export default TemplateDataCard;