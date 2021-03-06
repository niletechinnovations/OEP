import React, { Component } from 'react';
import {Col, Row, Input, FormGroup, Label, CustomInput, Button} from 'reactstrap';
import './TemplatePreviewPageForm.css';
let countQuestion = 0;
const yellow = 'ye';
const blue = 'bl';

const renderHTML = (rawHTML: string) => React.createElement("customlabel", { dangerouslySetInnerHTML: { __html: rawHTML } });
function FieldLayout(props) {
  const formFieldDetails = props.formFieldDetails;
  //props.formFieldName(formFieldDetails.id);
  if(formFieldDetails === null || formFieldDetails === undefined) {
    return "";
  }
  switch(formFieldDetails.element) {
    case 'Header':
      return(
          <h2 className="form-heading-title">{renderHTML(formFieldDetails.content.trim())}</h2>
      )
     
    case 'TextInput':
      return(
        <div className="formField-item">
          <FormGroup>
            <Label className="formField-label" htmlFor={formFieldDetails.id}>{renderHTML(formFieldDetails.label.trim())}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeEvent}  />
          </FormGroup>
        </div>
      )
     
    case 'Checkboxes':
      return(
        <div className="formField-item">
          <FormGroup>
            <Label className="formField-label">{renderHTML(formFieldDetails.label.trim())}{formFieldDetails.required ? "*" : ""}</Label>
            <div>
              {formFieldDetails.options.map((checkBoxOptions, index) =>              
                <CustomInput name={formFieldDetails.id} key={index} type="checkbox" className="checkboxInput" label={checkBoxOptions.text} value={checkBoxOptions.value} id={checkBoxOptions.key} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeEvent} />
              )}
            </div>
          </FormGroup>
        </div>
      )
     
    case 'TextArea':
      return(
        <div className="formField-item">
          <FormGroup>
            <Label className="formField-label" htmlFor={formFieldDetails.id}>{renderHTML(formFieldDetails.label.trim())}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} type="textarea" id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeEvent}  />
          </FormGroup>
        </div>
      )
     
    case 'Dropdown':
      return(
        <div className="formField-item">
          <FormGroup>
            <Label className="formField-label">{renderHTML(formFieldDetails.label.trim())}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} type="select" className="dropDown" id={formFieldDetails.id} required={formFieldDetails.required ? true : false} onChange={props.onchangeEvent}>

              {formFieldDetails.options.map((dropOptions, index) =>              
                <option value={dropOptions.value} key={index} >{dropOptions.text}</option>
              )}
            </Input>
          </FormGroup>
        </div>
      )
     
    case 'RadioButtons':
      countQuestion++;
      return(
        <div className="formField-item">
          <FormGroup>
            <Label className="formField-label"><span className="inspection-no-value">{countQuestion}</span>{renderHTML(formFieldDetails.label.trim())}{formFieldDetails.required ? "*" : ""}</Label>
            <div>
              {formFieldDetails.options.map((radioButtonOptions, index) =>              
                <CustomInput key={index} name={formFieldDetails.id} type="radio" disabled className="radioInput" label={radioButtonOptions.text} value={radioButtonOptions.value} id={radioButtonOptions.key} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeEvent}  />
              )}
            </div>
          </FormGroup>
          <div className="inspection-btn-section">              
            <Button color={blue}  disabled="true">Comment</Button> 
            <Label className="btn btn-gr">Photo </Label> 
            
            <Button color={yellow} disabled="true" >Action</Button> 
          </div>
        </div>
      )

     
    case 'Paragraph':
      return(
        <div className="formField-item">
          <p>{renderHTML(formFieldDetails.content.trim())}</p>
        </div>
      )
     
    case 'Camera':
      return(
          <div className="formField-item">
          <FormGroup>
            <Label className="formField-label" htmlFor={formFieldDetails.id}>{formFieldDetails.label.trim()}{formFieldDetails.required ? "*" : ""}</Label>
            <Input name={formFieldDetails.id} disabled type="file" accept="image/*" id={formFieldDetails.id} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeFileEvent}  />
          </FormGroup>
        </div> 
      ) 
    case 'LineBreak':
      return (<hr />)
    default: 
      return (
        <div className="formField-item">
          <h2>{renderHTML(formFieldDetails.content)}</h2>
        </div>
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
      console.log(i);
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
      <div className="template-card">
      <Row>
        <Col lg={12}>
         {formFiled.map((formFieldDetails, index) =>
          formFieldDetails === null || formFieldDetails === undefined ? "" : 
            <FieldLayout key={index}  formFieldDetails={formFieldDetails} formFieldName = {this.props.createFormFieldName} formFieldVal = {this.props.updateFormFieldValue} onchangeEvent={this.changeHandle} onchangeFileEvent={this.changeFileHandle} />
          )}
         </Col>
      </Row>
      </div>
    );
  }
}

export default PreviewTemplatePageForm;