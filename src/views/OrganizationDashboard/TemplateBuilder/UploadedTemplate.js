import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Input, FormGroup, Label, Modal, ModalHeader, Form, ModalBody, ModalFooter} from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import Loader from '../../Loader/Loader';
import TemplateDataCard from './TemplateDataCard';
import './Template.css';

class UploadTemplate extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      modal: false,
      templateFile: "",
      categoryId: "",
      templateId: "",
      popupSubcategoryList: [],
      templateList: [],      
      subCategoryList: [],
      categoryList: [], 
      filterItem: { organizationId: '', categoryId: '', subCategoryId: ''},
      errors: {}
    } 
    this.filterTemplateList = this.filterTemplateList.bind(this);
    this.editTemplateFile = this.editTemplateFile.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
  }
  componentDidMount() { 
    this.templateList();
    this.categoryList();
  }

  /*User List API*/
  templateList(filterItem = {}) {
    let queryString = "";
    queryString += "?owntemplate=uploaded";
    if(filterItem.categoryId !== undefined && filterItem.categoryId !== "")
      queryString += (queryString === "") ? "?categoryId="+filterItem.categoryId : "&categoryId="+filterItem.categoryId;
    if(filterItem.subCategoryId !== undefined && filterItem.subCategoryId !== "")
      queryString += (queryString === "") ? "?subCategoryId="+filterItem.subCategoryId : "&subCategoryId="+filterItem.subCategoryId;
    if(filterItem.organizationId !== undefined && filterItem.organizationId !== "")
      queryString += (queryString === "") ? "?organizationId="+filterItem.organizationId : "&organizationId="+filterItem.organizationId;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken(`template`+queryString)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }   

          this.setState({loading:false, templateList: res.data.data});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else{
            this.setState( { loading: false } );
            toast.error(err.message); 
          }
        } )
    } )
  }

  /*categoryList List API*/
  categoryList() {   
   
    commonService.getAPIWithAccessToken('category')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   

        this.setState({categoryList: res.data.data});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else           
          toast.error(err.message);    
        
      } )
    
  }
  /*Sub Category*/
  getSubCategoryList(categoryId, hideSubcat = true) {
    const filterItem = this.state.filterItem;
    if(categoryId === "") {      
      filterItem.subCategoryId = '';
      this.setState({ filterItem: filterItem, subCategoryList: [] });
      return;
    }
    this.setState( { loading: true}, () => { 
      commonService.getAPIWithAccessToken('category/'+categoryId)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        if(hideSubcat)
          filterItem.subCategoryId = '';
        this.setState({subCategoryList: res.data.data, filterItem: filterItem, loading: false});     
        
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else { 
          this.setState( {  loading: false } );        
          toast.error(err.message); 

        }
      } )
    })

  }

  getPopUpSubCategoryList(categoryId, hideSubcat = true) {
    
    
    if(categoryId === "") { 
      this.setState({ subCategoryId: "", popupSubcategoryList: [] });
      return;
    }
    this.setState( { loading: true}, () => { 
      commonService.getAPIWithAccessToken('category/'+categoryId)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        if(hideSubcat)
          this.setState({popupSubcategoryList: res.data.data, subCategoryId: "", loading: false}); 
        else
          this.setState({popupSubcategoryList: res.data.data, loading: false});   
        
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else { 
          this.setState( {  loading: false } );        
          toast.error(err.message); 

        }
      } )
    })

  }
  /*Handle catgeory Input Change and bind subcategory*/
  changeCategoryHandle = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
    this.getSubCategoryList(value);
  }

  changePopUPCategoryHandle = event => {
    const value = event.target.value;
    this.setState({ categoryId: value });
    this.getPopUpSubCategoryList(value);
  }

  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };

  filterTemplateList(){
    const filterItem = this.state.filterItem;
    this.templateList(filterItem);
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value
    this.setState({ [name]: value });
  };

  changeFileHandler = event => {   
    const targetFile = event.target.files[0];
    
    if(targetFile.type !== "image/png" && targetFile.type !== "image/jpeg" && targetFile.type !== "image/jpg" && 
      targetFile.type !== "image/svg" && targetFile.type !== "application/pdf" && targetFile.type !== "application/vnd.ms-excel") {
      toast.error("Allow only images, pdf or excel");
      this.setState({ templateFile: targetFile});
    }
    else
      this.setState({ templateFile: targetFile  });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      categoryId: "",
      subCategoryId: "",
      rowIndex: -1,
      formValid: false,
      templateFile: "",
      template_name: "",
      errors: {}
    });
  }

  submitHandler = event => {
    event.preventDefault();    
    if(!this.validateForm())
      return false;
    event.target.className += " was-validated";
    let formData = new FormData();
    formData.append('categoryId', this.state.categoryId);
    formData.append('subCategoryId', this.state.subCategoryId);
    formData.append('templateName', this.state.template_name);
    if(this.state.templateFile)
      formData.append('templateFile', this.state.templateFile);
    
    if(this.state.rowIndex > -1) {
      formData.append('templateId', this.state.templateList[this.state.rowIndex].templateId);
      commonService.putAPIWithAccessToken( `template/upload`, formData)
      .then( res => {
                
        if ( undefined === res.data.data || !res.data.status ) { 
          this.setState({loading: false});           
          toast.error(res.data.message);             
          return;
        }            
        this.setState({modal: false, loading: false});
        toast.success(res.data.message); 
        this.templateList();
      } )
      .catch( err => {
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else{
          this.setState( { loading: false } );
          toast.error(err.message); 
        }
      } );
    }
    else{
      commonService.postAPIWithAccessToken( `template/upload`, formData)
      .then( res => {
                
        if ( undefined === res.data.data || !res.data.status ) { 
          this.setState({loading: false});           
          toast.error(res.data.message);             
          return;
        }            
        this.setState({modal: false, loading: false});
        toast.success(res.data.message); 
        this.templateList();
      } )
      .catch( err => {
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else{
          this.setState( { loading: false } );
          toast.error(err.message); 
        }
      } );
    }
  }

  editTemplateFile(index) {
    let templateInfo = this.state.templateList[index];
    
    this.setState({
      modal: true,
      categoryId: templateInfo.categoryId,
      subCategoryId: templateInfo.subCategoryId,
      rowIndex: index,
      formValid: false,
      templateFile: "",
      template_name: templateInfo.templateName,
      errors: {}
    });

    this.getPopUpSubCategoryList(templateInfo.categoryId, false);

  }

  deleteTemplate(index){
    const templateInfo = this.state.templateList[index];
    
    this.setState( { loading : true}, () => {   
      commonService.deleteAPIWithAccessToken(`template/upload/${templateInfo.templateId}`)
      .then( res => {
        
         
        if ( undefined === res.data.data || !res.data.status ) {
         
          this.setState( { loading : false} );
          toast.error(res.data.message);
          return;
        } 
        
        this.setState({ modal: false, loading : false});
        toast.success(res.data.message);
        this.templateList();
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else
          this.setState( { loading : false } );
          toast.error(err.message);
      } )
    } );
  }

  validateForm() {
    let errors = {};
    let formIsValid = true;
    if (!this.state.categoryId) {
        formIsValid = false;
        errors["categoryId"] = "*Please select category.";
    }
    if (!this.state.subCategoryId) {
        formIsValid = false;
        errors["subCategoryId"] = "*Please select subcategory.";
    }
    if (!this.state.template_name) {
        formIsValid = false;
        errors["template_name"] = "*Please enter template name.";
    }
    if(this.state.rowIndex < 0 ) {
        if (!this.state.templateFile) {
            formIsValid = false;
            errors["templateFile"] = "*Please upload template file.";
        }
    }
    if(this.state.templateFile) {
      let targetFile = this.state.templateFile;
      if(targetFile.type !== "image/png" && targetFile.type !== "image/jpeg" && targetFile.type !== "image/jpg" && 
        targetFile.type !== "image/svg" && targetFile.type !== "application/pdf" && targetFile.type !== "application/vnd.ms-excel") {
        errors["templateFile"] = "Allow only images, pdf or excel";
        formIsValid = false;
      }
    }
    
   
    
    this.setState({
      loading: false,
      errors: errors
    });
    
    return formIsValid;
  }

  render() {

    const { templateList, loading, categoryList, subCategoryList, modal, popupSubcategoryList, errors } = this.state; 
    let loaderElement = '';
    if(loading) 
      loaderElement = <Loader />

    return (
      <div className="animated fadeIn">
        <Row>
         
          {loaderElement}
          <Col lg={12}>
            <Card className="oep-card">
              <CardHeader className="mainHeading">
                <strong>Uploaded Template</strong> <Button color="abc" className="categoryAdd" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Upload Template</Button>
              </CardHeader>
              <CardBody>
               
                <Row>
                  <Col md={12}>
                    <div className="search-filter">
                    <Row>
                      <Col md={"6"} lg={"4"}>
                        <FormGroup> 
                          <Label htmlFor="categoryId">Category</Label>            
                          <Input type="select" placeholder="category Name *" id="categoryId" name="categoryId" value={this.state.filterItem.categoryId} onChange={this.changeCategoryHandle}  >
                            <option value="">Select Category</option>
                            {categoryList.map((categoryItem, index) =>
                              <SetCategoryDropDownItem key={index} categoryItem={categoryItem} selectedCategory={this.state.filterItem.categoryId} />
                            )}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={"6"} lg={"4"}>
                        <FormGroup> 
                          <Label htmlFor="subCategoryId">Subcategory</Label>            
                          <Input type="select" placeholder="Subcategory Name *" id="subCategoryId" name="subCategoryId" value={this.state.filterItem.subCategoryId} onChange={this.changeFilterHandler}  >
                            <option value="">Select Subcategory</option>
                            {subCategoryList.map((subCategoryItem, index) =>
                              <SetSubCategoryDropDownItem key={index} subCategoryItem={subCategoryItem} selectedCategory={this.state.filterItem.subCategoryId} />
                            )}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={"6"} lg={"3"}>
                        <FormGroup className="filter-button-section"> 
                          <Label htmlFor="searchButton">&nbsp;</Label> 
                          <Button color="success" className="search-btn" id="searchButton" type="button" onClick={this.filterTemplateList}> Search</Button> 
                        </FormGroup>             
                      </Col>
                    </Row>
                    </div>  
                  </Col>
                  <Col md={12}>
                    <TemplateDataCard data={templateList} deleteTemplate = {this.deleteTemplate} editTemplateFile = {this.editTemplateFile} apiUrl = {commonService.getAPIUrl()} dataTableLoadingStatus = {this.state.loading} />
                    
                    
                  </Col>
                </Row>
                  
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={this.toggle} className="oep-model category-modal-section">
          <ModalHeader toggle={this.toggle}>Upload Template</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate>
            <ModalBody>
              
              <FormGroup> 
                <Label htmlFor="categoryId">Category *</Label>            
                <Input type="select" placeholder="category Name *" id="categoryId" invalid={errors['categoryId'] !== undefined && errors['categoryId'] !== ""} name="categoryId" value={this.state.categoryId} onChange={this.changePopUPCategoryHandle}  >
                  <option value="">Select Category</option>
                  {categoryList.map((categoryItem, index) =>
                    <SetCategoryDropDownItem key={index} categoryItem={categoryItem} selectedCategory={this.state.categoryId} />
                  )}
                </Input>
                <div className="invalid-feedback">
                  {errors['categoryId']}
                </div>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="subCategoryId">Subcategory *</Label>            
                <Input type="select" placeholder="Subcategory Name *" id="subCategoryId" name="subCategoryId" invalid={errors['subCategoryId'] !== undefined && errors['subCategoryId'] !== ""} value={this.state.subCategoryId} onChange={this.changeHandler}  >
                  <option value="">Select Subcategory</option>
                  {popupSubcategoryList.map((subCategoryItem, index) =>
                    <SetSubCategoryDropDownItem key={index} subCategoryItem={subCategoryItem} selectedCategory={this.state.subCategoryId} />
                  )}
                </Input>
                <div className="invalid-feedback">
                  {errors['subCategoryId']}
                </div>
              </FormGroup>
              <FormGroup> 
                <Label htmlFor="template_name">Template Name *</Label>            
                <Input type="text" placeholder="Template Name *" id="template_name" name="template_name" invalid={errors['template_name'] !== undefined && errors['template_name'] !== ""} value={this.state.template_name} onChange={this.changeHandler} required />
                <div className="invalid-feedback">
                  {errors['template_name']}
                </div>
              </FormGroup>
              <FormGroup>      
                <Label htmlFor="templateFile">Upload Template *</Label>            
                <Input type="file" placeholder="File *" required id="templateFile" name="templateFile" invalid={errors['templateFile'] !== undefined && errors['templateFile'] !== ""} onChange={this.changeFileHandler} accept=".pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .png,.jpg,.jpeg,.svg"/>
                <div className="invalid-feedback">
                  {errors['templateFile']}
                </div>
              </FormGroup> 
              
            </ModalBody>
            <ModalFooter>
              <Button className="submit-btn" type="submit">Submit</Button>
              <Button className="btnCancel" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

    )
  }
}



function SetCategoryDropDownItem (props) {
  const categoryItem = props.categoryItem;
  return (<option value={categoryItem.categoryId} >{categoryItem.categoryName}</option>)
}

function SetSubCategoryDropDownItem (props) {
  const subCategoryItem = props.subCategoryItem;
  return (<option value={subCategoryItem.subCategoryId} >{subCategoryItem.subCategoryName}</option>)
}
export default UploadTemplate;
