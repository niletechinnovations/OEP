import React, { Component } from 'react';
import {Col, Row, Input, FormGroup, Label, CustomInput} from 'reactstrap';

function FieldLayout(props) {
  const formFieldDetails = props.formFieldDetails;
  //props.formFieldName(formFieldDetails.id);
  switch(formFieldDetails.element) {
    case 'Header':
      return(
        <Col lg={12}>
          <h2>{formFieldDetails.content}</h2>
        </Col>
      );
      
    case 'TextInput':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label htmlFor={formFieldDetails.id}>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} value={props.formValue}   />
          </FormGroup>
        </Col>
      );
      
    case 'Checkboxes':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <div>
              {formFieldDetails.options.map((checkBoxOptions, index) =>              
                <CustomInput name={formFieldDetails.id} key={index} type="checkbox" className="checkboxInput" label={checkBoxOptions.text} value={checkBoxOptions.value} id={checkBoxOptions.key} checked={props.formValue === checkBoxOptions.value ? true : false} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label}  />
              )}
            </div>
          </FormGroup>
        </Col>
      )
      
    case 'TextArea':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label htmlFor={formFieldDetails.id}>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} type="textarea" id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} value={props.formValue}  />
          </FormGroup>
        </Col>
      )
      
    case 'Dropdown':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} type="select" className="dropDown" id={formFieldDetails.id} value={props.formValue} required={formFieldDetails.required ? true : false} >

              {formFieldDetails.options.map((dropOptions, index) =>              
                <option value={dropOptions.value} key={index} >{dropOptions.text}</option>
              )}
            </Input>
          </FormGroup>
        </Col>
      )
      
    case 'RadioButtons':
      return(
        <Col md={12}>
          <div className="card-Preview-item">
            <h4>{formFieldDetails.label}</h4>
            <p>{props.formValue.input || ""}</p>
            <div className="notes-section">
              <h4>Remarks</h4>
              <p>{props.formValue.remarks || ""}</p>
            </div>
            <div className="photos-section">
              <h4>Photo</h4>
              <div className="photos-info">
              {
                props.formValue.mediaFile.map((mediaInfo, mediaFileIndex) => 
                  <PreviewFileInput key={mediaFileIndex} filename={mediaInfo.mediaFile} apiUrl={props.apiUrl} />
                )
              }
              </div>
            </div>
          </div>
        </Col>
      )
      
    case 'Paragraph':
      return(
        <Col lg={12}>
          <p>{formFieldDetails.content}</p>
        </Col>
      )
      
    case 'Camera':
      
      return(
          <Col lg={12}>
          <FormGroup>
            <Label htmlFor={formFieldDetails.id}>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} type="file" accept="image/*" id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label}  />
            <PreviewFileInput formValue = {props.formValue} apiUrl={props.apiUrl} />
          </FormGroup>
        </Col> 
      ) 
      
    default: 
      return (
        <Col lg={12}>
          <h2>{formFieldDetails.label}</h2>
        </Col>
      )
      

  }
} 
function PreviewFileInput (props) {
  
  if(props.filename !== "") {
    if(props.filename.toLowerCase().indexOf('.png') > -1 || props.filename.toLowerCase().indexOf('.jpeg') > -1 || props.filename.toLowerCase().indexOf('.jpg') > -1) 
        return (<img src={`${props.apiUrl}feedback/${props.filename}`} width="200px" height="200px" alt="" />);        
    else 
       return(<a href={`${props.apiUrl}feedback/${props.filename}`} target="_blank"  rel="noopener noreferrer"><i className="fa fa-download"></i>Download</a>);  
  }
  else
      return ('');
}
class FeedBackPreviewPageForm extends Component {
  
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
  
  render() {
    
    
    const formFeild = this.props.templateField;
    const formFeildValue = this.props.feedBackData;
    
    return (
      <div className="card-Preview-info">
        <Row>
           {formFeild.map((formFieldDetails, index) =>
              <FieldLayout key={index} formFieldDetails={formFieldDetails} formValue = {formFeildValue[formFieldDetails.id]} apiUrl={this.props.apiUrl}  />
            )}
        </Row>
      </div>
    );
  }
}

export default FeedBackPreviewPageForm;