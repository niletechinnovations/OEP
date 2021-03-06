import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button, Form, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import Loader from '../../Loader/Loader';
import { FormErrors } from '../../Formerrors/Formerrors';
import CategoryData from './CategoryData';
import './Category.css'

class Category extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      category_name: "",
      categoryList: [],
      categoryImage: null,
      categoryImageUrl: "",
      loading: true,
      rowIndex: -1,
      status: "",
      formErrors: {category_name: '', category_image: '', error: ''},
      category_name_valid: false,
      formValid: false,

    } 
    this.handleEditCategory = this.handleEditCategory.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
  }

  // Fetch the category List
  componentDidMount() { 
    this.categoryList();
  }
  /*Category List API*/
  categoryList() {
    
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('category')
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }   

          this.setState({loading:false, categoryList: res.data.data});     
         
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
    
    if(this.state.categoryImage !=="" && this.state.categoryImage !== undefined && this.state.categoryImage !== null) {
      if(this.state.categoryImage.type !== "image/png" && this.state.categoryImage.type !== "image/jpeg" && this.state.categoryImage.type !== "image/jpg" && this.state.categoryImage.type !== "image/svg") {
        return false;
      }
      formData.append('filename',this.state.categoryImage);
    }

    formData.append('categoryName', this.state.category_name);
    let statusTextValue = this.state.status; 
    let statusText =  statusTextValue === "" ? true : ((statusTextValue === "Active") ? true : false);
    formData.append('status', statusText);
    
    this.setState( { loading: true}, () => {
      if(this.state.rowIndex > -1){
        /* Update Category */
        const categoryId = this.state.categoryList[this.state.rowIndex].categoryId;
        formData.append('categoryId', categoryId);
        
        commonService.putAPIWithAccessToken( `category`, formData)
          .then( res => {
            console.log(res);
           
            
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState({loading: false});   
              toast.error(res.data.message);             
              return;
            } 
            let updatedCategoryLists = this.state.categoryList;
            updatedCategoryLists[this.state.rowIndex] = res.data.data;
            this.setState({modal: false, rowIndex: "", loading:false});
            toast.success(res.data.message);    
            this.categoryList();
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
       
      }
      else{
         /* Add Category */
        commonService.postAPIWithAccessToken( `category`, formData)
          .then( res => {
            console.log(res);
           
            let formErrors = this.state.formErrors;
            formErrors.error = '';
            if ( undefined === res.data.data || !res.data.status ) { 
              this.setState({loading: false});           
              toast.error(res.data.message);             
              return;
            }            
            this.setState({modal: false, loading: false});
            toast.success(res.data.message); 
            this.categoryList();
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
    let category_name_valid = this.state.category_name_valid; 
    switch(fieldName) {         
      case 'category_name':
        category_name_valid = (value !== '') ? true : false;
        fieldValidationErrors.category_name = category_name_valid ? '' : ' is required';
        break;              
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    category_name_valid: category_name_valid,                   
                  }, this.validateForm);
  }
  /* Validate Form */
  validateForm() {
    this.setState({formValid: this.state.category_name_valid});
  }
  /* Set Error Class*/
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      category_name: "",
      rowIndex: -1,
      formValid: false,
      categoryImageUrl: ""
    });
  }
  /* File changes handler*/
  changeFileHandler = event => {   
    const targetFile = event.target.files[0];
    let formErrors = this.state.formErrors;
    formErrors.category_image = "";
    
    if(targetFile.type !== "image/png" && targetFile.type !== "image/jpeg" && targetFile.type !== "image/jpg" && targetFile.type !== "image/svg") {
      formErrors.category_image = " accept only png, jpeg, jpg";
      this.setState({ categoryImage: targetFile, formErrors: formErrors  });
    }
    else
      this.setState({ categoryImage: targetFile, formErrors: formErrors  });
  };

  /* Edit Category*/
  handleEditCategory(rowIndex){
   
      const categoryItem = this.state.categoryList[rowIndex];
      let status = (categoryItem.status) ? "Active": "Inactive";

      this.setState({modal: true, status: status, category_name: categoryItem.categoryName, rowIndex: rowIndex, formValid: true, category_name_valid: true, categoryImageUrl: categoryItem.imagUrl});
  }
  /* Add category */
  handleDeleteCategory(rowIndex){
   
    const categoryItem = this.state.categoryList[rowIndex];
   
    this.setState( { loading: true}, () => {
      commonService.deleteAPIWithAccessToken( `category/`+categoryItem.categoryId)
        .then( res => {
          this.setState({loading: false});
          if ( undefined === res.data || !res.data.status ) {            
             toast.error(res.data.message);      
            return;
          }         
          
          toast.success(res.data.message);
          this.categoryList();
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

    const { categoryList, loading, modal  } = this.state;     
    let loaderElement ='';
    
    if(loading)
      loaderElement = <Loader />
    let categoryImagePreview = '';
    if(this.state.categoryImageUrl !== "")
      categoryImagePreview = <div className="imagePreview"><img src={this.state.categoryImageUrl} alt="" /></div>

    return (
      <div className="animated fadeIn">
        <Row>
          
          {loaderElement}
          <Col lg={12}>
            <Card className="categoryList">
            
              <CardBody>                
                <CategoryData data={categoryList} toggle={this.toggle} editCategoryAction={this.handleEditCategory} deleteCategoryAction={this.handleDeleteCategory} dataTableLoadingStatus = {this.state.loading} />
                  
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={this.toggle} className="category-modal-section">
          <ModalHeader toggle={this.toggle}>Category</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate>
            <ModalBody>
              <FormErrors formErrors={this.state.formErrors} />
              <FormGroup> 
                <Label htmlFor="category_name">Category Name</Label>            
                <Input type="text" placeholder="Category Name *" id="category_name" name="category_name" value={this.state.category_name} onChange={this.changeHandler} required />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="template_status">Status</Label>            
                <Input type="select" placeholder="Status *" id="status" name="status" value={this.state.status} onChange={this.changeHandler} required >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Input>
              </FormGroup>
                
              <FormGroup>      
                <Label htmlFor="categoryImage">Upload Image</Label>            
                <Input type="file" placeholder="File *" id="categoryImage" name="categoryImage" onChange={this.changeFileHandler} accept=".png,.jpg,.jpeg,.svg"/>
              </FormGroup> 
              {categoryImagePreview}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={!this.state.formValid} type="submit">Submit</Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

    )
  }
}

export default Category;
