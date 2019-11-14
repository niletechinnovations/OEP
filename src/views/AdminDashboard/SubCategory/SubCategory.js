import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import Loader from '../../Loader/Loader';
import { FormErrors } from '../../Formerrors/Formerrors';
import SubCategoryData from './SubCategoryData';
import './SubCategory.css'


class SubCategory extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      subCategory_name: "",
      categoryId: "",
      subCategoryList: [],
      subCategoryImage: null,
      subCategoryImageUrl: "",
      loading: true,
      rowIndex: -1,
      categoryList: [],
      formErrors: {subCategory_name: '', subCategory_image: '', category: '', error: ''},
      subCategory_name_valid: false,
      category_valid: false,
      formValid: false,
      formProccessing: false,

    } 
    this.handleEditSubCategory = this.handleEditSubCategory.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleDeleteSubCategory = this.handleDeleteSubCategory.bind(this);
  }

  // Fetch the subCategory List
  componentDidMount() { 
    this.subCategoryList();
    this.categoryList();
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
  /*subCategory List API*/
  subCategoryList() {
    
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('sub-category')
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }   

          this.setState({loading:false, subCategoryList: res.data.data});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else {
            this.setState( { loading: false } );
            toast.error(err.message);    
          }
        } )
    } )
  }
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    let formData = new FormData(); 
    
    if(this.state.subCategoryImage !=="" && this.state.subCategoryImage !== undefined && this.state.subCategoryImage !== null) {
      if(this.state.subCategoryImage.type !== "image/png" && this.state.subCategoryImage.type !== "image/jpeg" && this.state.subCategoryImage.type !== "image/jpg" && this.state.subCategoryImage.type !== "image/svg") {
        return false;
      }
      formData.append('filename',this.state.subCategoryImage);
    }
    formData.append('subCategoryName', this.state.subCategory_name);
    formData.append('categoryId', this.state.categoryId);
    this.setState( { formProccessing: true}, () => {
      if(this.state.rowIndex > -1){
        /* Update subCategory */
        const subCategoryId = this.state.subCategoryList[this.state.rowIndex].subCategoryId;
        formData.append('subCategoryId', subCategoryId);
        
        commonService.putAPIWithAccessToken( `sub-category`, formData)
          .then( res => {
            console.log(res);
           
            
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState({formProccessing: false});   
              toast.error(res.data.message);             
              return;
            } 
            let updatedsubCategoryLists = this.state.subCategoryList;
            updatedsubCategoryLists[this.state.rowIndex] = res.data.data;
            this.setState({modal: false, rowIndex: "", formProccessing:false});
            toast.success(res.data.message);    
            this.subCategoryList();
          } )
          .catch( err => {       
              
            if(err.response !== undefined && err.response.status === 401) {
              localStorage.clear();
              this.props.history.push('/login');
            }
            else {
              this.setState( { formProccessing: false } );
              toast.error(err.message);    
            }
          } )
       
      }
      else{
         /* Add subCategory */
        commonService.postAPIWithAccessToken( `sub-category`, formData)
          .then( res => {
            console.log(res);
           
            let formErrors = this.state.formErrors;
            formErrors.error = '';
            if ( undefined === res.data.data || !res.data.status ) { 
              this.setState({formProccessing: false});           
              toast.error(res.data.message);             
              return;
            }            
            this.setState({modal: false, formProccessing: false});
            toast.success(res.data.message); 
            this.subCategoryList();
          } )
          .catch( err => {       
              
            if(err.response !== undefined && err.response.status === 401) {
              localStorage.clear();
              this.props.history.push('/login');
            }
            else{
              this.setState( { formProccessing: false } );
              toast.error(err.message); 
            }
          } )
      }
    })
  };
  /* Input Field On changes*/
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value
    this.setState({ [name]: value },
                  () => { this.validateField(name, value) });
  };
  
  /* Validate Form Field */
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.error = '';
    let subCategory_name_valid = this.state.subCategory_name_valid; 
    let category_valid = this.state.category_valid; 
    switch(fieldName) {         
      case 'subCategory_name':
        subCategory_name_valid = (value !== '') ? true : false;
        fieldValidationErrors.subCategory_name = subCategory_name_valid ? '' : ' is required';
        break; 
      case 'categoryId':
        category_valid = (value !== '') ? true : false;
        fieldValidationErrors.category = category_valid ? '' : ' is required';
        break;              
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    subCategory_name_valid: subCategory_name_valid,  
                    category_valid: category_valid,                  
                  }, this.validateForm);
  }
  /* Validate Form */
  validateForm() {
    this.setState({formValid: this.state.subCategory_name_valid && this.state.category_valid});
  }
  /* Set Error Class*/
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      subCategory_name: "",
      categoryId: "",
      rowIndex: -1,
      formValid: false
    });
  }
  /* File changes handler*/
  changeFileHandler = event => {   
    const targetFile = event.target.files[0];
    let formErrors = this.state.formErrors;
    formErrors.subCategory_image = "";
    
    if(targetFile.type !== "image/png" && targetFile.type !== "image/jpeg" && targetFile.type !== "image/jpg" && targetFile.type !== "image/svg") {
      formErrors.subCategory_image = " accept only png, jpeg, jpg";
      this.setState({ subCategoryImage: targetFile, formErrors: formErrors  });
    }
    else
      this.setState({ subCategoryImage: targetFile, formErrors: formErrors  });
  };

  /* Edit subCategory*/
  handleEditSubCategory(rowIndex){
    debugger;
      const subCategoryItem = this.state.subCategoryList[rowIndex];
      
      this.setState({modal: true, subCategory_name: subCategoryItem.subCategoryName, rowIndex: rowIndex, categoryId:subCategoryItem.categoryId, formValid: true});
  }
  /* Add subCategory */
  handleDeleteSubCategory(rowIndex){
   
    const subCategoryItem = this.state.subCategoryList[rowIndex];
   
    this.setState( { loading: true}, () => {
      commonService.deleteAPIWithAccessToken( `sub-category/`+subCategoryItem.subCategoryId)
        .then( res => {
          this.setState({loading: false});
          if ( undefined === res.data || !res.data.status ) {            
             toast.error(res.data.message);      
            return;
          }         
          
          toast.success(res.data.message);
          this.subCategoryList();
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
    })
  }

  render() {

    const { subCategoryList, loading, modal, categoryList, categoryId, formProccessing  } = this.state;     
    let loaderElement ='';
    if(loading)
      loaderElement = <Loader />
    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>Subcategory</strong> <Button color="primary" className="pull-right" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Add New</Button>
              </CardHeader>
              <CardBody>
                <ToastContainer />
                {loaderElement}
                <SubCategoryData data={subCategoryList} editSubCategoryAction={this.handleEditSubCategory} deleteSubCategoryAction={this.handleDeleteSubCategory} />
            
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={this.toggle} className="subCategory-modal-section">
          <ModalHeader toggle={this.toggle}>Subcategory</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate>
            <ModalBody>
              <FormErrors formErrors={this.state.formErrors} />
              <FormGroup> 
                <Label htmlFor="categoryId">Category <span className="mandatory">*</span></Label>            
                <Input type="select" placeholder="category Name *" id="categoryId" name="categoryId" value={this.state.categoryId} onChange={this.changeHandler} required >
                  <option value="">Select Category</option>
                  {categoryList.map((categoryItem, index) =>
                    <SetCategoryDropDownItem key={index} categoryItem={categoryItem} selectedCategory={categoryId} />
                  )}
                </Input>
              </FormGroup>
              <FormGroup> 
                <Label htmlFor="subCategory_name">Subcategory Name <span className="mandatory">*</span></Label>            
                <Input type="text" placeholder="Subcategory Name *" id="subCategory_name" name="subCategory_name" value={this.state.subCategory_name} onChange={this.changeHandler} required />
              </FormGroup>
              <FormGroup>      
                <Label htmlFor="subCategoryImage">Upload Image</Label>            
                <Input type="file" id="subCategoryImage" name="subCategoryImage" onChange={this.changeFileHandler} accept=".png,.jpg,.jpeg,.svg"/>
              </FormGroup> 
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={!this.state.formValid || formProccessing} type="submit">{formProccessing ? processingBtnText : 'Submit' }</Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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

export default SubCategory;
