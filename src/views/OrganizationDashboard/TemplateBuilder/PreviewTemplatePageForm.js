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
      )
     
    case 'TextInput':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label htmlFor={formFieldDetails.id}>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeEvent}  />
          </FormGroup>
        </Col>
      )
     
    case 'Checkboxes':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <div>
              {formFieldDetails.options.map((checkBoxOptions, index) =>              
                <CustomInput name={formFieldDetails.id} key={index} type="checkbox" className="checkboxInput" label={checkBoxOptions.text} value={checkBoxOptions.value} id={checkBoxOptions.key} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeEvent} />
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
            <Input name={formFieldDetails.id} type="textarea" id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeEvent}  />
          </FormGroup>
        </Col>
      )
     
    case 'Dropdown':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} type="select" className="dropDown" id={formFieldDetails.id} required={formFieldDetails.required ? true : false} onChange={props.onchangeEvent}>

              {formFieldDetails.options.map((dropOptions, index) =>              
                <option value={dropOptions.value} key={index} >{dropOptions.text}</option>
              )}
            </Input>
          </FormGroup>
        </Col>
      )
     
    case 'RadioButtons':
      return(
        <Col lg={12}>
          <FormGroup>
            <Label>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
            <div>
              {formFieldDetails.options.map((radioButtonOptions, index) =>              
                <CustomInput key={index} name={formFieldDetails.id} type="radio" className="radioInput" label={radioButtonOptions.text} value={radioButtonOptions.value} id={radioButtonOptions.key} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeEvent}  />
              )}
            </div>
          </FormGroup>
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
            <Input name={formFieldDetails.id} disabled type="file" accept="image/*" id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeFileEvent}  />
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

class PreviewTemplatePageForm extends Component {
  
  constructor(props){
    super(props);   
    this.state = {
      buttonProcessing: false,
      rowIndex: '',
      dataTableItem: []
    };
    
  }
  componentDidMount() {   
    let formFiled = {};
    let formErrors = {};
    for(const [i, formFieldDetails] of this.props.templateField.entries()){
      if(formFieldDetails.element === "Header" || formFieldDetails.element === "Paragraph" || formFieldDetails.element === "LineBreak" || formFieldDetails.element === "Label")
        continue;
      if(formFieldDetails.required)
        formErrors[formFieldDetails.id] = "";
      formFiled[formFieldDetails.id] = "";
    };
    this.props.createFormFieldName(formFiled, formErrors);
  }
  changeHandle = event => {
    this.props.updateFormFieldValue(event.target.name, event.target.value);
  }
  changeFileHandle = event => {
    const targetFile = event.target.files[0];
    const targetFieldName = event.target.name;
    var reader = new FileReader();
    const objProps = this.props;
    reader.onload = function(e) {
      objProps.updateFormFieldValue(targetFieldName, e.target.result);
    }
    reader.readAsDataURL(targetFile);
  }
  render() {
    const formFiled = this.props.templateField;
    
    return (
      <Row>
         {formFiled.map((formFieldDetails, index) =>
            <FieldLayout key={index} formFieldDetails={formFieldDetails} formFieldName = {this.props.createFormFieldName} formFieldVal = {this.props.updateFormFieldValue} onchangeEvent={this.changeHandle} onchangeFileEvent={this.changeFileHandle} />
          )}
      </Row>
    );
  }
}

export default PreviewTemplatePageForm;