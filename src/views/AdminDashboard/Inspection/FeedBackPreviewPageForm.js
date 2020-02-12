import React, { Component } from 'react';
import {Col, Row} from 'reactstrap';

function FieldLayout(props) {
  const formFieldDetails = props.formFieldDetails;
  //props.formFieldName(formFieldDetails.id);
  switch(formFieldDetails.element) {
    case 'Header':
      return(
         <tr>
            <td colspan="3"><h2>{formFieldDetails.content}</h2></td>
        </tr>
      );
      
    case 'RadioButtons':
      const remarksClass = props.formValue.remarks !== "" ? "notes-section show": "notes-section hide";
      return(<>
          <tr>
            <td>{formFieldDetails.label}</td>
            <td>{props.formValue.input || ""}</td>
            <td>{props.formValue.remarks || ""}</td>
          </tr>
          <tr>
            <td colspan="3">{props.formValue.mediaFile.length > 0 ? <PreviewMediaSection mediaFile = {props.formValue.mediaFile} apiUrl = {props.apiUrl} /> : null}</td>
          </tr>
        </>
        
      )
      
    case 'Paragraph':
      return(
       <tr>
            <td colspan="3">{formFieldDetails.content}</td>
        </tr>
      )
      
    
      
    default: 
      return (
         <tr>
            <td colspan="3">{formFieldDetails.label}</td>
        </tr>
      )
      

  }
} 
function PreviewFileInput (props) {
  
  if(props.filename !== "") {
    if(props.filename.toLowerCase().indexOf('.png') > -1 || props.filename.toLowerCase().indexOf('.jpeg') > -1 || props.filename.toLowerCase().indexOf('.jpg') > -1) 
        return (<img src={`${props.apiUrl}feedback/${props.filename}`} alt="" />);        
    else 
       return(<a href={`${props.apiUrl}feedback/${props.filename}`} target="_blank"  rel="noopener noreferrer"><i className="fa fa-download"></i>Download</a>);  
  }
  else
      return ('');
}
function PreviewMediaSection(props) {
  return (<div className="photos-section">
              
              <div className="photos-info">
              {
                props.mediaFile.map((mediaInfo, mediaFileIndex) => 
                  <PreviewFileInput key={mediaFileIndex} filename={mediaInfo.mediaFile} apiUrl={props.apiUrl} />
                )
              }
              </div>
            </div>);
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
  getFailedItem(formFeildValue, formFeild){
    let failedItemId = [];
    Object.keys(formFeildValue).forEach((key, value) => {       
        if(formFeildValue[key].input != undefined && formFeildValue[key].input.toLowerCase() === "no")
            failedItemId.push(key);
        
    });
    const failedItemForm = formFeild.filter(function(item) { return failedItemId.indexOf(item.id) > -1 ;})
    return failedItemForm;
    
  }
  render() {
    
    
    const formFeild = this.props.templateField;
    const formFeildValue = this.props.feedBackData;
    let failedItemView = '';
    const getFailedItem = this.getFailedItem(formFeildValue, formFeild);

    if(getFailedItem.length > 0 )
      failedItemView = <Row>
         <h2>Failed Responses</h2>  
         <p>This section lists responses that were set as "failed responses" in this template used for this audit </p>          
          <table className="feedBackPreviewTable">
            <thead>
              <tr>
                  <th>Questions</th>
                  <th>Response</th>
                  <th>Details</th>
              </tr>
            </thead>
            <tbody>
             {getFailedItem.map((formFieldDetails, index) =>
                <FieldLayout key={index} formFieldDetails={formFieldDetails} formValue = {formFeildValue[formFieldDetails.id]} apiUrl={this.props.apiUrl}  />
              )}
            </tbody>
          </table>
      </Row>
    return (
      <div className="card-Preview-info">
      {failedItemView}
      <Row>
          <table className="feedBackPreviewTable">
            <thead>
              <tr>
                  <th>Questions</th>
                  <th>Response</th>
                  <th>Details</th>
              </tr>
            </thead>
            <tbody>
             {formFeild.map((formFieldDetails, index) =>
                <FieldLayout key={index} formFieldDetails={formFieldDetails} formValue = {formFeildValue[formFieldDetails.id]} apiUrl={this.props.apiUrl}  />
              )}
            </tbody>
          </table>
      </Row>
      </div>
    );
  }
}

export default FeedBackPreviewPageForm;