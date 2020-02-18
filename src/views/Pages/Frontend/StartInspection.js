import React from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard,MDBCardBody, Button } from "mdbreact";
import { ToastContainer, toast} from 'react-toastify';
import { geolocated } from "react-geolocated";
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import GeoLocationData from '../../../core/google-map/GeoLocationData';
import Loader from '../../Loader/Loader';
import './StartInspection.css';

import PreviewTemplatePageForm from './PreviewTemplatePageForm'
class StartInspection extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);
  constructor(props){
    super(props);
    this.state = {   
      loading: false, 
      loadingTemplate: false,
      formField: {},
      remarks: {},
      mediaFileInfo: {},
      formErrors: {},
      templateData: [],
      inspectionId: "",
      formValid: false,
      organizationId: "",
      templatePreviewData : [],
      formProccessing: false,
      userAnswer: {},
      authId: "",  
      employeeList: [],
      actionData: {},
      actionFormHide: false,
      feedbackDataId: "",
      previousFeedBackData: {},
      previousActionData: [],
      previousUploadedFile: {},
      latitude: "",
      longitude: "",
      addressInfo: {},
      locationEnabled: false,
      allowAllocationMessage: "Please allow location to access inspection"   
    }    
    
    this.handleFormFieldName = this.handleFormFieldName.bind(this);
    this.handleUpdateFormFieldValue = this.handleUpdateFormFieldValue.bind(this);
    this.handleUpdateRemarks = this.handleUpdateRemarks.bind(this);

    this.handleUpdateMediaFile = this.handleUpdateMediaFile.bind(this);
    this.handleActionData = this.handleActionData.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleRemoveMediaFile = this.handleRemoveMediaFile.bind(this);
    this.updateGeoLocationAddress = this.updateGeoLocationAddress.bind(this);
    
    
  }

  // Fetch the subCategory List
  componentDidMount() {
    
    const { match: { params } } = this.props;
    if(params.inspectionId !== undefined && params.inspectionId !=="" && params.authId !== undefined && params.authId !=="") {
      this.setState({authId: params.authId});
      this.getInspectionDetail(params.inspectionId);
    }
    else
      toast.error("Invalid Request");
  }
  trackUserLocation(){
    
    if(this.state.latitude === "" || this.state.longitude === "") {
      toast.error(this.state.allowAllocationMessage);
      return false;
    }
   return true;
  }
   getInspectionDetail(inspectionId) {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('inspection/web/'+inspectionId)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false, loadingTemplate: true } );
            toast.error(res.data.message);  
            this.props.history.push('/');  
            return;
          } 
          const inspectionDetail = res.data.data;          
          let formField = this.state.formField;
          formField.categoryId = inspectionDetail.categoryId;
          formField.subCategoryId = inspectionDetail.subCategoryId;
          formField.template_name = inspectionDetail.templateName;          
               
          let actionInfo = this.state.actionData;
          //let mediaFile = this.state.mediaFileInfo;
          if(inspectionDetail.actionList.length > 0 ) {
            for(let i =0; i < inspectionDetail.actionList.length; i++) {
              actionInfo[inspectionDetail.actionList[i].questionId] = inspectionDetail.actionList[i];
            }
          }
          let mediaFileInfo = {};
          let prevMediaFileInfo = {};
          if(inspectionDetail.inspectionMediaFile.length > 0 ) {
            for(let i =0; i < inspectionDetail.inspectionMediaFile.length; i++) {
              if(mediaFileInfo[inspectionDetail.inspectionMediaFile[i].questionId] !== undefined) {
                mediaFileInfo[inspectionDetail.inspectionMediaFile[i].questionId].push({mediaFileId: inspectionDetail.inspectionMediaFile[i]._id, 'mediaFile': inspectionDetail.inspectionMediaFile[i].mediaFile});
                prevMediaFileInfo[inspectionDetail.inspectionMediaFile[i].questionId].push(commonService.getAPIUrl()+'public/feedback/'+inspectionDetail.inspectionMediaFile[i].mediaFile);
              }
              else {
                mediaFileInfo[inspectionDetail.inspectionMediaFile[i].questionId] = [];
                prevMediaFileInfo[inspectionDetail.inspectionMediaFile[i].questionId] = [];
                prevMediaFileInfo[inspectionDetail.inspectionMediaFile[i].questionId].push(commonService.getAPIUrl()+'public/feedback/'+inspectionDetail.inspectionMediaFile[i].mediaFile);
                mediaFileInfo[inspectionDetail.inspectionMediaFile[i].questionId].push({mediaFileId: inspectionDetail.inspectionMediaFile[i]._id, 'mediaFile': inspectionDetail.inspectionMediaFile[i].mediaFile});
              }
            }
          }
          let remarks = this.state.remarks;
          if(inspectionDetail.feedbackDataId !== "") {
            for (var key in inspectionDetail.feedBackData) {
              formField[key] = inspectionDetail.feedBackData[key].input;
              remarks[key] = inspectionDetail.feedBackData[key].remarks
            }
          }
          this.setState({loading:false, loadingTemplate: true, remarks: remarks, formField: formField, formValid: true, inspectionId: inspectionDetail.inspectionId, templateId: inspectionDetail.templateId, organizationId: inspectionDetail.organizationId, templatePreviewData: inspectionDetail.templateFormData, previousFeedBackData: inspectionDetail.feedBackData, feedbackDataId: inspectionDetail.feedbackDataId,  employeeList: inspectionDetail.employeeList, actionInfo: actionInfo, mediaFileInfo: mediaFileInfo, previousUploadedFile: prevMediaFileInfo});
          
          setTimeout(this.trackUserLocation(), 6000);
        } )
        .catch( err => {
                   
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else {
            this.setState( { loading: false, loadingTemplate: true } );
            toast.error(err.message);    
          }
        } )
    } ) 
  } 
  
  resetForm(){
    this.props.history.push('/admin/inspection');
  }

  toggle = () => {
    this.setState({
      showPreview: !this.state.showPreview
    });
  }

  handleFormFieldName(formFieldName, requiredFieldError) {     
    this.setState({formField: formFieldName, formErrors: requiredFieldError});    
  }
  handleUpdateFormFieldValue(fieldName, fieldValue) {
    if(!this.trackUserLocation())
      return false;
    let formField = this.state.formField;
    formField[fieldName] = fieldValue;
    this.setState({formField: formField});
  }
  /*Update Remarks*/
  handleUpdateRemarks(fieldName, fieldValue){
    if(!this.trackUserLocation())
      return false;
    let remarks = this.state.remarks;
    //fieldName = fieldName.split('remarks__');
    remarks[fieldName] = fieldValue;
    this.setState({remarks: remarks});
  }

  /*Update Media File Url*/
  handleUpdateMediaFile(fieldName, fileInput, rawInput){
    if(!this.trackUserLocation())
      return false;
    let mediaFile = this.state.mediaFileInfo;
    let fieldMedia = mediaFile[fieldName] ?  mediaFile[fieldName] : [];
    let prevmediaFile = this.state.previousUploadedFile;
    let prevfieldMedia = prevmediaFile[fieldName] ?  prevmediaFile[fieldName] : [];
    let formData = new FormData();     
    formData.append('filename',fileInput);
    formData.append('questionId',fieldName);
    formData.append('authId',this.state.authId);
    formData.append('inspectionId',this.state.inspectionId);
   
    prevfieldMedia.push(rawInput);
    prevmediaFile[fieldName] = prevfieldMedia;
    
    commonService.postAPIWithAccessToken('inspection/media/'+this.state.inspectionId, formData)
      .then( res => { 
        if ( undefined === res.data.data || !res.data.status ) { 
          this.setState( { loading: false} );
          toast.error(res.data.message);
          return;
        } 
        
        fieldMedia.push({mediaFileId: res.data.data[0]._id, 'mediaFile': res.data.data[0].mediaFile});
        mediaFile[fieldName] = fieldMedia;
        
        this.setState({previousUploadedFile: prevmediaFile});
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else
          this.setState( { loading: false } );
          toast.error(err.message);
      } )    
  }

  /*Update Action Data*/
  handleActionData(fieldName, actionFormData){
      if(!this.trackUserLocation())
        return false;
      if(this.state.inspectionId === ""){
        toast.error("Something Went Wrong");
        return false;
      } 
      let actionInfo = this.state.actionData;
      let actionInfoItem = actionInfo[fieldName] ?  actionInfo[fieldName] : {};      
      actionInfo[fieldName] = actionFormData;
      
      let formData = {inspectionId: this.state.inspectionId, authId: this.state.authId, questionId: fieldName, description: actionFormData.description, employeeId: actionFormData.employeeId, priority: actionFormData.priority, dueDate: actionFormData.dueDate, type: 1, organizationId: this.state.organizationId};
      this.setState({actionData: actionInfo})
      
      if(actionInfoItem._id !== undefined ) {
        formData.actionId = actionInfoItem._id;
        this.setState( { loading: true, actionFormHide: false}, () => {
          commonService.putAPIWithAccessToken('action', formData)
              .then( res => {        
                
                if ( undefined === res.data.data || !res.data.status ) { 
                  this.setState( { loading: false} );
                  toast.error(res.data.message);
                  return;
                } 
                actionInfo[fieldName] = res.data.data
                this.setState({ actionData: actionInfo, loading: false, actionFormHide: true});
                toast.success(res.data.message);
               
              } )
              .catch( err => {         
                if(err.response !== undefined && err.response.status === 401) {
                  localStorage.clear();
                  this.props.history.push('/login');
                }
                else
                  this.setState( { loading: false } );
                  toast.error(err.message);
              } )
          });
      }
      else {
        this.setState( { loading: true, actionFormHide: false}, () => {
          commonService.postAPIWithAccessToken('action', formData)
              .then( res => {        
                
                if ( undefined === res.data.data || !res.data.status ) { 
                  this.setState( { loading: false} );
                  toast.error(res.data.message);
                  return;
                } 
                actionInfo[fieldName] = res.data.data
                this.setState({ actionData: actionInfo, loading: false, actionFormHide: true});
                toast.success(res.data.message);
               
              } )
              .catch( err => {         
                if(err.response !== undefined && err.response.status === 401) {
                  localStorage.clear();
                  this.props.history.push('/login');
                }
                else
                  this.setState( { loading: false } );
                  toast.error(err.message);
              } )
          });
     }
  }

  /*Submit Form Handler*/

  handleSubmitForm(saveAsDraft = false) {
    if(!this.trackUserLocation())
      return false;
    if(this.state.inspectionId === ""){
      toast.error("Something Went Wrong");
      return false;
    }
    let formData = {inspectionId: this.state.inspectionId, saveAsDraft: saveAsDraft, authId: this.state.authId, feedBackData: this.state.formField, remarks: this.state.remarks, mediaFile: this.state.mediaFileInfo, actionInfo: this.state.actionData, feedbackDataId: this.state.feedbackDataId, addressInfo: this.state.addressInfo};
   
    this.setState( { loading: true}, () => {      
      commonService.postAPIWithAccessToken('inspection/feedback', formData)
        .then( res => {        
          
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, loading: false});
          toast.success(res.data.message);
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { loading: false } );
            toast.error(err.message);
        } )
      
    });
  }

  updateGeoLocationAddress(coords) {
    
    if(coords.latitude && coords.longitude){
      
      this.setState({latitude: coords.latitude, longitude: coords.longitude, locationEnabled: true}, () => {
          commonService.getExternalAPI("https://maps.googleapis.com/maps/api/geocode/json?latlng="+coords.latitude+","+coords.longitude+"&key="+commonService.getGoogleAPIKey())
            .then( res => {  
            
            const googleMapData = res.data.results ? res.data.results[0] : [];
            if(googleMapData.address_components !== undefined && googleMapData.address_components.length > 0 ) {
              const getCountry = googleMapData.address_components.filter(function(item) { return item.types.indexOf('country') > -1;});
              const getState = googleMapData.address_components.filter(function(item) { return item.types.indexOf('administrative_area_level_1') > -1;});
              const getCity = googleMapData.address_components.filter(function(item) { return item.types.indexOf('administrative_area_level_2') > -1;});
              const getPostalCode = googleMapData.address_components.filter(function(item) { return item.types.indexOf('postal_code') > -1;})
              const formatted_address = googleMapData.formatted_address || "";
              const addressInfo = {country: getCountry.length > 0 ? getCountry[0].long_name : "",
              state: getState.length > 0 ? getState[0].long_name : "",
              city: getCity.length > 0 ? getCity[0].long_name : "",
              postal_code: getPostalCode.length > 0 ? getPostalCode[0].long_name : "",
              formatted_address: formatted_address, latitude: coords.latitude, longitude: coords.longitude}; 
              this.setState({addressInfo: addressInfo});
            }
          } )
          .catch( err => {         
            
          } )
      });
    }
  }
  handleRemoveMediaFile(inputFieldId, currentId){  
    if(!this.trackUserLocation())
      return false;  
    let mediaFileInfo = this.state.mediaFileInfo;
    let previousUploadedFile = this.state.previousUploadedFile;
    let imageInfo = previousUploadedFile[inputFieldId] ? previousUploadedFile[inputFieldId]: [];
    let mediaId = "";
    if(imageInfo.length > 0 &&  imageInfo.length >= currentId + 1){
      mediaId = mediaFileInfo[inputFieldId][currentId].mediaFileId;
      let mediaimageInfo = mediaFileInfo[inputFieldId] ? mediaFileInfo[inputFieldId]: [];
      mediaimageInfo.splice(parseInt(currentId), 1);
      imageInfo.splice(parseInt(currentId), 1);
      mediaFileInfo[inputFieldId] = mediaimageInfo;
    }
    
    
    previousUploadedFile[inputFieldId] = imageInfo;
    this.setState({mediaFileInfo: mediaFileInfo, previousUploadedFile: previousUploadedFile});
    
    commonService.deleteAPIWithAccessToken('inspection/media/'+mediaId)
      .then( res => {  
        if ( undefined === res.data.data || !res.data.status ) { 
          this.setState( { loading: false} );
          toast.error(res.data.message);
          return;
        } 
        toast.success(res.data.message);
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else
          this.setState( { loading: false } );
          toast.error(err.message);
      } )
   

  }
  render() {
    
    let loaderElement = '';
    let actionButton = '';
    let geoLocationTags = '';
    if(this.state.loading)
      loaderElement = <Loader />
    if(this.props.isGeolocationAvailable) {
      if(this.props.isGeolocationEnabled) {
        if(this.props.coords != null && !this.state.locationEnabled)
            geoLocationTags = <GeoLocationData cords = {this.props.coords} updateAddress = {this.updateGeoLocationAddress} />
      }
    }
    
    if(this.state.loadingTemplate)
      actionButton = <>
        <Button onClick={this.handleSubmitForm.bind(this, false)} className="btn-gr">Submit</Button>
        <Button onClick={this.handleSubmitForm.bind(this, true)} className="btn-ye">Save as Draft</Button>
            
      </>;

    return (
      <>
        <div className="main-content"> 
            <section className="">
                <MDBContainer>                   
                    {loaderElement}
                    {geoLocationTags}
                    <ToastContainer />
                    <MDBRow className="">
                        <MDBCol lg="12" className="">
                            <MDBCard>
                                <MDBCardBody>
                                    <PreviewTemplatePageForm inspectionId={this.state.inspectionId} templateField = {this.state.templatePreviewData} 
                                    formField={this.state.formField} 
                                    createFormFieldName={this.handleFormFieldName} 
                                    updateFormFieldValue={this.handleUpdateFormFieldValue} 
                                    
                                    updateRemarks={this.handleUpdateRemarks} 
                                    remarksValue={this.state.remarks} 
                                    updateMediaFile={this.handleUpdateMediaFile} employeeList={this.state.employeeList} 
                                    updateAction={this.handleActionData} actionValue={this.state.actionData} 
                                    actionFormHide={this.state.actionFormHide}
                                    previousUploadedFile = {this.state.previousUploadedFile}
                                    handleRemoveMediaFile = {this.handleRemoveMediaFile} /> 
                                    {actionButton}
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>  
        </div>
            
      </>
    );
  }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(StartInspection);
