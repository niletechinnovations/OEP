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

                <CardTitle className="oep-title"><b>Template :</b> {template.templateName}</CardTitle>

                {template.type.toLowerCase() !== 'free' ? <CardText className="oep-title"><b>Organization Name :</b> {template.createdBy}</CardText>  : "" }                             
                <CardText className="oep-title"><b>Category :</b> {template.categoryName}</CardText>
                <CardText className="oep-title"><b>Subcategory :</b> {template.subCategoryName}</CardText>
                <CardText className="oep-title"><b>Status :</b> {template.status ? 'Active' : 'Inactive'}</CardText>
                <div className="card-footer-section">
                {template.isCreated ? <Link to={`/common/template/${template.templateId}`} target="_blank" className="btn-preview">Preview </Link> : ""}
                {template.isUploaded && template.uploadedFileName !== "" && !template.isCreated ? <a href={`${this.props.apiUrl}template/${template.uploadedFileName}`} target="_blank" rel="noopener noreferrer" className="btn-Uploaded">View Uploaded Template</a> : ""}
                {/*{template.isUploaded && !template.isCreated ? <><button className="btn-Edit" onClick={() => 
                  this.editTemplateFile(index)}>Edit</button> <button className="btn-Delete" onClick={() => {if( window.confirm('Are you sure you wish to delete this template?'))
                  this.deleteTemplate(index);}}>Delete</button></> : ""}*/}
                <Link to={`/admin/manage-template/create-template/${template.templateId}`} className="btn-Edit">{!template.isCreated ? "Create Template" : "Edit"} </Link>
                {template.isCreated ? <Link to={`/admin/manage-inspection/assign-inspection?templateId=${template.templateId}&categoryId=${template.categoryId}&subCategoryId=${template.subCategoryId}`}  className="btn-Assign">Assign </Link> : ""}
                {template.type.toLowerCase() === 'free' ? <button className="btn-Delete" onClick={() => {if( window.confirm('Are you sure you wish to delete this template? All related inspection to this template will be removed.'))
                  this.deleteTemplate(index);}}>Delete</button>: <></>}
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