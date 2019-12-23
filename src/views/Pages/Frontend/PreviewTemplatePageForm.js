import React, { Component } from 'react';
import {Col, Row, Input, FormGroup, Label, CustomInput, Button} from 'reactstrap';



function FieldLayout(props) {
  const formFieldDetails = props.formFieldDetails;
  //props.formFieldName(formFieldDetails.id);
  switch(formFieldDetails.element) {
    case 'Header':
      return(
        <h2>{formFieldDetails.content}</h2>
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
      let className = "remarks-section ";
      className += props.formFieldRemarks[formFieldDetails.id] ? 'show' : 'hide';
      let remarkSection = '';
      if(props.remarksValue != "" && !props.formFieldRemarks[formFieldDetails.id]) 
        remarkSection = <div className="remarks-section">
                          <Label className="remarks-label">Remarks</Label>
                          <p>{props.remarksValue}</p><Button className="btn-bl" onClick={props.remarkEvent} data-id ={props.indexItem} data-inputid={formFieldDetails.id}><i className="fa fa-pencil"></i></Button>
                        </div>
      else
        remarkSection = <div className={className}>
              <FormGroup>
                <Label className="remarks-label">Remarks</Label>
                <Input className="remarks-form-group" name={`remarks__${formFieldDetails.id}`} value={props.remarksValue} onChange={props.remarkChangeEvent} type="textarea" placeholder="Remarks" value={props.remarksValue}  />
              </FormGroup> 
              <Button className="btn-gr" onClick={props.remarkSaveEvent} data-id ={props.indexItem} data-inputid={formFieldDetails.id}>Save</Button> 
              <Button className="btn-re" onClick={props.cancelRemarkEvent} data-id ={props.indexItem} data-inputid={formFieldDetails.id}>Cancel</Button> 
            </div> ;
      let mediaClassName = 'media-section';
      
      mediaClassName += (props.mediaFileData.length > 0 ) ? 'show' : 'hide';
      return(
        <div className="inspection-form-card">
            <FormGroup>
              <Label className="inspection-title"><span className="inspection-no-value">1</span>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
              <div className="inspection-check">
                {formFieldDetails.options.map((radioButtonOptions, index) =>              
                  <CustomInput key={index} name={formFieldDetails.id} type="radio" checked={props.formValue === radioButtonOptions.value ? true : false} className="radioInput" label={radioButtonOptions.text} value={radioButtonOptions.value} id={radioButtonOptions.key} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeEvent}  />
                )}
              </div>
            </FormGroup>
            {remarkSection}
            <div className={mediaClassName}>
                {props.mediaFileData.map((mediaData, mediaindex) => 
                    <ImgTag src={mediaData} key={mediaindex} />
                )} 
            </div>
            <div className="inspection-btn-section">              
              <Button className="btn-bl" onClick={props.remarkEvent} data-id ={props.indexItem} data-inputid={formFieldDetails.id}>Remark</Button> 
              <Label className="btn btn-gr" for={`media__${formFieldDetails.id}`}>Photo </Label> 
              <Input name={`media__${formFieldDetails.id}`} type="file" accept="image/*" className="hide" data-inputid={formFieldDetails.id} id={`media__${formFieldDetails.id}`} onChange={props.onchangeFileEvent}  />
              <Button className="btn-ye">Action</Button> 
            </div>       
        </div>
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
      dataTableItem: [],
      formFieldRemarks: {},
      formFieldValueRemarks: {},
      mediaFileData: {},
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
    const objProps = this;
    let mediaFileData = this.state.mediaFileData;
    const inputFieldId = event.target.dataset.inputid;
    let mediaFileDataArray = mediaFileData[event.target.dataset.inputid] ? mediaFileData[event.target.dataset.inputid] : []
    reader.onload = function(e) {
      mediaFileDataArray.push(e.target.result);
      debugger;
      mediaFileData[inputFieldId] = mediaFileDataArray;
      objProps.setState({mediaFileData: mediaFileData})
    }
    reader.readAsDataURL(targetFile);
  }

  remarkChangeEventHandle = event =>  {
    let formFieldValueRemarks = this.state.formFieldValueRemarks;
    let fieldName = event.target.name.split('remarks__');
    formFieldValueRemarks[fieldName[1]] = event.target.value;
    this.setState({formFieldValueRemarks: formFieldValueRemarks});
    
  }
  remarkEventHandle = event => {
    let formFieldRemarks = this.state.formFieldRemarks;
    formFieldRemarks[event.target.dataset.inputid] = true;
    this.setState({formFieldRemarks: formFieldRemarks});
  }

  remarkSaveEventHandle = event =>  {
    let formFieldRemarks = this.state.formFieldRemarks;
    formFieldRemarks[event.target.dataset.inputid] = false;
    this.setState({formFieldRemarks: formFieldRemarks});
    let formFieldValueRemarks = this.state.formFieldValueRemarks;
    this.props.updateRemarks(event.target.dataset.inputid, formFieldValueRemarks[event.target.dataset.inputid]);
    
    
  }
  cancelRemarkEventHandle = event => {
    let formFieldRemarks = this.state.formFieldRemarks;
    formFieldRemarks[event.target.dataset.inputid] = false;
    //let formFieldValueRemarks = this.state.formFieldValueRemarks;
    //formFieldValueRemarks[event.target.dataset.inputid] = "";
    this.setState({formFieldRemarks: formFieldRemarks});
    //this.props.updateRemarks(event.target.dataset.inputid, "");
  }
  render() {
    const formFiled = this.props.templateField;
    debugger;
    return (
      <div className="inspection-form-section">
         {formFiled.map((formFieldDetails, index) =>
            <FieldLayout key={index} indexItem = {index} formFieldDetails={formFieldDetails} formFieldName = {this.props.createFormFieldName} 
            mediaFileData={this.state.mediaFileData[formFieldDetails.id] ? this.state.mediaFileData[formFieldDetails.id] : []} formValue = {this.props.formField[formFieldDetails.id]} remarksValue={this.state.formFieldValueRemarks[formFieldDetails.id] ? this.state.formFieldValueRemarks[formFieldDetails.id] : ""} onchangeEvent={this.changeHandle} onchangeFileEvent={this.changeFileHandle} remarkSaveEvent={this.remarkSaveEventHandle} remarkChangeEvent={this.remarkChangeEventHandle} remarkEvent={this.remarkEventHandle} formFieldRemarks={this.state.formFieldRemarks} cancelRemarkEvent={this.cancelRemarkEventHandle} />
          )}
      </div>
    );
  }
}


function ImgTag(props){
  return (<img src={props.src} width="200px" height="200px" />)
}
export default PreviewTemplatePageForm;