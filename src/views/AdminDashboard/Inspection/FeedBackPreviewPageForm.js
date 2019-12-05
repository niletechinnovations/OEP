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
      break;
    case 'TextInput':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label htmlFor={formFieldDetails.id}>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} value={props.formValue}   />
          </FormGroup>
        </Col>
      );
      break;
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
      break;
    case 'TextArea':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label htmlFor={formFieldDetails.id}>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} type="textarea" id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} value={props.formValue}  />
          </FormGroup>
        </Col>
      )
      break;
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
      break;
    case 'RadioButtons':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <div>
              {formFieldDetails.options.map((radioButtonOptions, index) =>              
                <CustomInput key={index} name={formFieldDetails.id} type="radio" checked={props.formValue === radioButtonOptions.value ? true : false} className="radioInput" label={radioButtonOptions.text} value={radioButtonOptions.value} id={radioButtonOptions.key} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label}   />
              )}
            </div>
          </FormGroup>
        </Col>
      )
      break;
    case 'Paragraph':
      return(
        <Col lg={12}>
          <p>{formFieldDetails.content}</p>
        </Col>
      )
      break;
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
      break;
    default: 
      return (
        <Col lg={12}>
          <h2>{formFieldDetails.label}</h2>
        </Col>
      )
      break;

  }
} 
function PreviewFileInput (props) {
  
  if(props.formValue !== "") {
    if(props.formValue.toLowerCase().indexOf('.png') > -1 || props.formValue.toLowerCase().indexOf('.jpeg') > -1 || props.formValue.toLowerCase().indexOf('.jpg') > -1) 
        return (<img src={`${props.apiUrl}survey/${props.formValue}`} width="200px" height="200px" alt="" />);        
    else 
       return(<a href={`${props.apiUrl}survey/${props.formValue}`} target="_blank"  rel="noopener noreferrer"><i className="fa fa-download"></i>Download</a>);  
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
    debugger;
    return (
      <Row>
         {formFeild.map((formFieldDetails, index) =>
            <FieldLayout key={index} formFieldDetails={formFieldDetails} formValue = {formFeildValue[formFieldDetails.id]} apiUrl={this.props.apiUrl}  />
          )}
      </Row>
    );
  }
}

export default FeedBackPreviewPageForm;