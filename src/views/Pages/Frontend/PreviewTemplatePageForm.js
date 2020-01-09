import React, { Component } from 'react';
import {Col, Row, Input, FormGroup, Label, CustomInput, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast} from 'react-toastify';
import { FormErrors } from '../../Formerrors/Formerrors';
const yellow = 'ye';
const blue = 'bl';
const green = 'gr';
const red = 're';

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
      let actionView = '';
      if(props.actionValue != "")
        actionView = <div className="action-content-section">
                        <Label className="remarks-label">Action</Label>
                        <p>{props.actionValue.description}</p>
                        <div className="date"><b>Due Date:</b> {props.actionValue.dueDate}</div>
                        <Button className="btn-bl btn-edit" onClick={props.actionEvent} data-id ={props.indexItem} data-inputid={formFieldDetails.id}><i className="fa fa-pencil"></i></Button>
                      </div>;
      if(props.remarksValue != "" && !props.formFieldRemarks[formFieldDetails.id]) 
        remarkSection = <div className="remarks-content-section">
                          <Label className="remarks-label">Remarks</Label>
                          <p>{props.remarksValue}</p><Button className="btn-bl btn-edit" onClick={props.remarkEvent} data-id ={props.indexItem} data-inputid={formFieldDetails.id}><i className="fa fa-pencil"></i></Button>
                        </div>
      else
        remarkSection = <div className={className}>
              <FormGroup>
                <Label className="remarks-label">Remarks</Label>
                <Input className="remarks-form-group" name={`remarks__${formFieldDetails.id}`} value={props.remarksValue} onChange={props.remarkChangeEvent} type="textarea" placeholder="Remarks" value={props.remarksValue}  />
              </FormGroup> 
              <Button color={green} onClick={props.remarkSaveEvent} data-id ={props.indexItem} data-inputid={formFieldDetails.id}>Save</Button> 
              <Button color={red} onClick={props.cancelRemarkEvent} data-id ={props.indexItem} data-inputid={formFieldDetails.id}>Cancel</Button> 
            </div> ;
      let mediaClassName = 'media-section';
      
      mediaClassName += (props.mediaFileData.length > 0 ) ? 'show' : 'hide';
      return(
        <div className="inspection-form-card">
            <FormGroup>
              <Label className="inspection-title"><span className="inspection-no-value">{props.indexItem}</span>{formFieldDetails.label}{formFieldDetails.required ? "*" : ""}</Label>
              <div className="inspection-check">
                {formFieldDetails.options.map((radioButtonOptions, index) =>              
                  <CustomInput key={index} name={formFieldDetails.id} type="radio" checked={props.formValue === radioButtonOptions.value ? true : false} className="radioInput" label={radioButtonOptions.text} value={radioButtonOptions.value} id={radioButtonOptions.key} required={formFieldDetails.required ? true : false} placeholder={formFieldDetails.label} onChange={props.onchangeEvent}  />
                )}
              </div>
            </FormGroup>
            {remarkSection}
            {actionView}
            <div className={mediaClassName}>
                {props.mediaFileData.map((mediaData, mediaindex) => 
                    <ImgTag src={mediaData} key={mediaindex} deleteImageItem= {props.deleteImage} dataIndex={mediaindex} dataid={formFieldDetails.id} />
                )} 
            </div>
            <div className="inspection-btn-section">              
              <Button color={blue} onClick={props.remarkEvent} data-id ={props.indexItem} data-inputid={formFieldDetails.id}>Remark</Button> 
              <Label className="btn btn-gr" for={`media__${formFieldDetails.id}`}>Photo </Label> 
              <Input name={`media__${formFieldDetails.id}`} type="file" accept="image/*" className="hide" data-inputid={formFieldDetails.id} id={`media__${formFieldDetails.id}`} onChange={props.onchangeFileEvent}  />
              <Button color={yellow} onClick={props.actionEvent} data-id ={props.indexItem} data-inputid={formFieldDetails.id}>Action</Button> 
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
      inspectionId: "",
      modal: false,
      actionData: {}
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.handleActionInput = this.handleActionInput.bind(this);
  }
  componentDidMount() {   
    let formFiled = {};
    let formErrors = {};
    this.setState({inspectionId: this.props.inspectionId});
    for(const [i, formFieldDetails] of this.props.templateField.entries()){
      if(formFieldDetails.element === "Header" || formFieldDetails.element === "Paragraph" || formFieldDetails.element === "LineBreak" || formFieldDetails.element === "Label")
        continue;
      if(formFieldDetails.required)
        formErrors[formFieldDetails.id] = "";
      formFiled[formFieldDetails.id] = "";
    };
    this.props.createFormFieldName(formFiled, formErrors);
  }
  /* Change Input Field*/
  changeHandle = event => {
    this.props.updateFormFieldValue(event.target.name, event.target.value);
  }

  /*Browse File to Upload*/

  changeFileHandle = event => {
    const targetFile = event.target.files[0];
    if(targetFile.type !== "image/png" && targetFile.type !== "image/jpeg" && targetFile.type !== "image/jpg" && targetFile.type !== "image/svg") {
      toast.error("Images allowed only");
      return false;
    }
    const targetFieldName = event.target.name;       
    var reader = new FileReader();
    const objProps = this;
    let mediaFileData = this.state.mediaFileData;
    const inputFieldId = event.target.dataset.inputid;
    let mediaFileDataArray = mediaFileData[event.target.dataset.inputid] ? mediaFileData[event.target.dataset.inputid] : []
    reader.onload = function(e) {
      mediaFileDataArray.push(e.target.result);      
      mediaFileData[inputFieldId] = mediaFileDataArray;
      objProps.setState({mediaFileData: mediaFileData});
    }
    reader.readAsDataURL(targetFile);
    objProps.props.updateMediaFile(inputFieldId, targetFile);
  }

  /*Handle Remarks Data*/
  remarkChangeEventHandle = event =>  {
    let formFieldValueRemarks = this.state.formFieldValueRemarks;
    let fieldName = event.target.name.split('remarks__');
    formFieldValueRemarks[fieldName[1]] = event.target.value;
    this.setState({formFieldValueRemarks: formFieldValueRemarks});
    
  }

  /*Show Remarks Form*/
  remarkEventHandle = event => {   
    let formFieldRemarks = this.state.formFieldRemarks;
    formFieldRemarks[event.target.dataset.inputid] = true;
    this.setState({formFieldRemarks: formFieldRemarks});
  }
  /*Save Remarks Form*/
  remarkSaveEventHandle = event =>  {
    let formFieldRemarks = this.state.formFieldRemarks;
    formFieldRemarks[event.target.dataset.inputid] = false;
    this.setState({formFieldRemarks: formFieldRemarks});
    let formFieldValueRemarks = this.state.formFieldValueRemarks;
    this.props.updateRemarks(event.target.dataset.inputid, formFieldValueRemarks[event.target.dataset.inputid]);
    
    
  }

  /*Hide Remarks Form*/
  cancelRemarkEventHandle = event => {
    let formFieldRemarks = this.state.formFieldRemarks;
    formFieldRemarks[event.target.dataset.inputid] = false;
    //let formFieldValueRemarks = this.state.formFieldValueRemarks;
    //formFieldValueRemarks[event.target.dataset.inputid] = "";
    this.setState({formFieldRemarks: formFieldRemarks});
    //this.props.updateRemarks(event.target.dataset.inputid, "");
  }

  deleteInspectionImage = event => {
    let mediaFileData = this.state.mediaFileData;
    const inputFieldId = event.target.dataset.inputid;
    let mediaFileDataArray = mediaFileData[event.target.dataset.inputid] ? mediaFileData[event.target.dataset.inputid] : [];
    mediaFileDataArray.splice(parseInt(event.target.dataset.currentindex), 1);
    mediaFileData[inputFieldId] = mediaFileDataArray;
    this.setState({mediaFileData: mediaFileData});

  }


  /*Action Handle Request*/

  actionEventHandle = event => {
    let actionFormData = this.state.actionData;
    debugger;
    let questionActionInfo = this.props.actionValue[event.target.dataset.inputid] ? this.props.actionValue[event.target.dataset.inputid] : {};
    actionFormData['questionId'] = event.target.dataset.inputid;
    actionFormData['action_description'] = questionActionInfo.description || "";
    actionFormData['employee_id'] = questionActionInfo.employeeId || "";
    actionFormData['priority_input'] = questionActionInfo.priority || "";
    actionFormData['due_date'] = questionActionInfo.dueDate || "";
    this.setState({
      modal: true, 
      actionData: actionFormData    
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,     
    });
  }

  submitHandler (event) {
    event.preventDefault();
    let actionFormData = this.state.actionData;
    actionFormData.priority_input = actionFormData.priority_input ? actionFormData.priority_input : 1;
    let formData = {description: actionFormData.action_description, employeeId: actionFormData.employee_id, priority: actionFormData.priority_input, dueDate: actionFormData.due_date};
    this.props.updateAction(actionFormData.questionId, formData);
    this.setState({
      modal: false,     
    });
  }

  handleActionInput = event => {
    let actionFormData = this.state.actionData
    actionFormData[event.target.name] = event.target.value;
    this.setState({actionData: actionFormData});
  }
  render() {
    const formFiled = this.props.templateField;
   
    return (
      <>
      <div className="inspection-form-section">
         {formFiled.map((formFieldDetails, index) =>
            <FieldLayout key={index} indexItem = {index} formFieldDetails={formFieldDetails} formFieldName = {this.props.createFormFieldName} 
            mediaFileData={this.state.mediaFileData[formFieldDetails.id] ? this.state.mediaFileData[formFieldDetails.id] : []} formValue = {this.props.formField[formFieldDetails.id]} 
            remarksValue={this.state.formFieldValueRemarks[formFieldDetails.id] ? this.state.formFieldValueRemarks[formFieldDetails.id] : ""} onchangeEvent={this.changeHandle} 
            onchangeFileEvent={this.changeFileHandle} remarkSaveEvent={this.remarkSaveEventHandle} 
            remarkChangeEvent={this.remarkChangeEventHandle} remarkEvent={this.remarkEventHandle} 
            formFieldRemarks={this.state.formFieldRemarks} cancelRemarkEvent={this.cancelRemarkEventHandle} 
            deleteImage= {this.deleteInspectionImage.bind(this)} actionEvent={this.actionEventHandle} actionValue={this.props.actionValue[formFieldDetails.id] ? this.props.actionValue[formFieldDetails.id] : ""}  />
          )}
      </div>
      <Modal isOpen={this.state.modal } toggle={this.toggle} className="category-modal-section">
        <ModalHeader toggle={this.toggle}>Category</ModalHeader>
        <Form onSubmit={this.submitHandler}>
          <ModalBody>
            
            <FormGroup> 
              <Label htmlFor="action_description">Description</Label>            
              <Input type="textarea" placeholder="Description *" id="action_description" name="action_description" value={this.state.actionData.action_description} onChange={this.handleActionInput} required />
            </FormGroup>
            <FormGroup>      
              <Label htmlFor="employee_id">Assign</Label>            
              <Input type="select" placeholder="Employee *" id="employee_id" name="employee_id" value={this.state.actionData.employee_id} onChange={this.handleActionInput} required>
                <option value="">Select Employee</option>         
                {this.props.employeeList.map((employeeInfo, index) =>
                  <SetEmployeeDropDownItem key={index} employeeInfo={employeeInfo} />
                )}       
              </Input>
            </FormGroup> 
           <FormGroup>      
              <Label htmlFor="priority_input">Priority</Label>            
              <Input type="select" placeholder="priority *" id="priority_input" name="priority_input" value={this.state.actionData.priority_input} onChange={this.handleActionInput} >
                <option value="1">Low</option> 
                <option value="2">Medium</option>  
                <option value="3">High</option>                
              </Input>
            </FormGroup> 
            <FormGroup>      
              <Label htmlFor="due_date">Due</Label>            
              <Input type="date" placeholder="Due" id="due_date" name="due_date" value={this.state.actionData.due_date} onChange={this.handleActionInput} />
            </FormGroup> 
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-gr" type="submit">Submit</Button>
            <Button className="btn btn-re" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
      </>
    );
  }
}

/*Display Browse Image*/
function ImgTag(props){
  return (<div className="inspection-media-card"><div className="inspection-media"><img src={props.src} width="100px" height="100px" /> </div><i className="fa fa-times" onClick={props.deleteImageItem} data-inputid={props.dataid} data-currentindex={props.dataIndex}></i></div>)
}
/*Employee Dropdown List*/
function SetEmployeeDropDownItem(props){
  const employeeDetail = props.employeeInfo;
  return (<option value={employeeDetail.authId} >{employeeDetail.firstName} {employeeDetail.lastName}</option>)
}
export default PreviewTemplatePageForm;