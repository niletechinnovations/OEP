import React, { Component } from 'react';
/*import {Col, Row} from 'reactstrap';*/
const renderHTML = (rawHTML: string) => React.createElement("customlabel", { dangerouslySetInnerHTML: { __html: rawHTML } });
function FieldLayout(props) {
  const formFieldDetails = props.formFieldDetails;
  if(formFieldDetails === null || formFieldDetails === undefined) {
    return "";
  }
  //props.formFieldName(formFieldDetails.id);
  switch(formFieldDetails.element) {
    case 'Header':
      return(
         <tr>
            <td colspan="3"><h2>{renderHTML(formFieldDetails.content)}</h2></td>
        </tr>
      );
      
    case 'RadioButtons':
      /*const remarksClass = props.formValue.remarks !== "" ? "notes-section show": "notes-section hide";*/
      if(props.formValue === undefined)
        return (<><tr>
            <td>{renderHTML(formFieldDetails.label)}</td>
            <td></td>
            <td></td>
          </tr></>);
      const mediaFile = props.formValue.mediaFile !== undefined && props.formValue.mediaFile.length > 0 ? <tr>
            <td colspan="3">{props.formValue.mediaFile.length > 0 ? <PreviewMediaSection mediaFile = {props.formValue.mediaFile} apiUrl = {props.apiUrl} /> : null}</td>
          </tr> : "";
      return(<>
          <tr>
            <td>{renderHTML(formFieldDetails.label)}</td>
            <td>{props.formValue.input || ""}</td>
            <td>{renderHTML(props.formValue.remarks || "")}</td>
          </tr>
          {mediaFile}
        </>
        
      )
      
    case 'Paragraph':
      return(
       <tr>
            <td colspan="3">{renderHTML(formFieldDetails.content)}</td>
        </tr>
      )
      
    
      
    default: 
      return (
         <tr>
            <td colspan="3">{renderHTML(formFieldDetails.label)}</td>
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

  getAllMediaFile(userInputData){
    
    let finalMediaFile = [];
    const mediaFile = [];
    Object.keys(userInputData).forEach((key, value) => {
      if(userInputData[key].mediaFile.length > 0 ) {
        for(let i = 0; i < userInputData[key].mediaFile.length; i++ ) {
          finalMediaFile.push(userInputData[key].mediaFile[i]);
        }
      }
        
    }); 
    console.log(mediaFile.length);
    return finalMediaFile;
      
  }
  getFailedItem(formFeildValue, formFeild){
    let failedItemId = [];
    Object.keys(formFeildValue).forEach((key, value) => {
      
      if(formFeildValue[key].input !== null) {
        if(formFeildValue[key].score !== undefined) {
          if(formFeildValue[key].input !== undefined && formFeildValue[key].isFailedItem)
            failedItemId.push(key);
        }    
        else if(formFeildValue[key].input !== undefined && formFeildValue[key].input.toLowerCase() === "no")
            failedItemId.push(key);
      }
        
    });
    const failedItemForm = formFeild.filter(function(item) { return item !== null && failedItemId.indexOf(item.id) > -1 ;})
    return failedItemForm;
    
  }
  render() {
    
    
    const formFeild = this.props.templateField;
    const formFeildValue = this.props.feedBackData;
    let failedItemView = '';
    const getFailedItem = this.getFailedItem(formFeildValue, formFeild);
    const allMediaFile = this.getAllMediaFile(formFeildValue);
    let mediaFileView = '';
    if(allMediaFile.length > 0 )
      mediaFileView = <div className="feedBack-body">         
         <h2>Failed Responses</h2>  
         <p>This section lists responses that were set as "failed responses" in this template used for this audit </p>          
          <table className="feedBackPreviewTable">
            <thead>
              <tr>
                  <th></th>
              </tr>
            </thead>
            <tbody>
            <td>
            <PreviewMediaSection mediaFile={allMediaFile} apiUrl={this.props.apiUrl}  />
             </td>
            </tbody>
          </table>
      </div>
    if(getFailedItem.length > 0 )
      failedItemView = <div className="feedBack-body">
         
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
      </div>
    return (
      <div className="card-Preview-info">
      {failedItemView}
      <div className="feedBack-body">
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
              formFieldDetails === null || formFieldDetails === undefined ? "" : 
                <FieldLayout key={index} formFieldDetails={formFieldDetails} formValue = {formFeildValue[formFieldDetails.id]} apiUrl={this.props.apiUrl}  />
              )}
            </tbody>
          </table>
      </div>
      {mediaFileView}
      </div>
    );
  }
}

export default FeedBackPreviewPageForm;