import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput } from 'mdbreact';

import SideNavigation from "../sideNavigation";
import CategoryDataItem from './CategoryData';
import Loader from '../../loader';
import commonService from '../../../core/services/commonService';
import './category.css';
import { FormErrors } from '../FormErrors';

class categoryLists extends Component {
  
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
            this.setState( { error: res.data.message, loading: false, alertColor: 'danger', alertClassName: '' } );
            return;
          }   

          this.setState({loading:false, categoryList: res.data.data});     
         
        } )
        .catch( err => {         
          if(err.response.status === 401 && err.response.status != undefined) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { error: err.response.data.message, loading: false } );
        } )
    } )
  }
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    let formData = new FormData(); 
    
    if(this.state.categoryImage !="" && this.state.categoryImage != undefined) {
      if(this.state.categoryImage.type != "image/png" && this.state.categoryImage.type != "image/jpeg" && this.state.categoryImage.type != "image/jpg" && this.state.categoryImage.type != "image/svg") {
        return false;
      }
      formData.append('filename',this.state.categoryImage);
    }
    formData.append('categoryName', this.state.category_name);
    this.setState( { loading: true}, () => {
      if(this.state.rowIndex > -1){
        /* Update Category */
        const categoryId = this.state.categoryList[this.state.rowIndex].categoryId;
        formData.append('categoryId', categoryId);
        
        commonService.putAPIWithAccessToken( `category`, formData)
          .then( res => {
            console.log(res);
           
            let formErrors = this.state.formErrors;
            formErrors.error = '';
            if ( undefined === res.data.data || !res.data.status ) {            
              formErrors.error = res.data.message;            
              this.setState({formErrors: formErrors});            
              return;
            } 
            let updatedCategoryLists = this.state.categoryList;
            updatedCategoryLists[this.state.rowIndex] = res.data.data;
            this.setState({formErrors: formErrors, modal: false, rowIndex: ""});
            this.categoryList();
          } )
          .catch( err => {       
              
            if(err.response.status == 401) {
              localStorage.clear();
              this.props.history.push('/login');
            }
            else
              this.setState( { error: err.response.data.message, loading: false } );
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
              formErrors.error = res.data.message;            
              this.setState({formErrors: formErrors});            
              return;
            }            
            this.setState({formErrors: formErrors,  modal: false, loading: false});
            this.categoryList();
          } )
          .catch( err => {       
              
            if(err.response.status == 401) {
              localStorage.clear();
              this.props.history.push('/login');
            }
            else
              this.setState( { error: err.response.data.message, loading: false } );
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
      formValid: false
    });
  }
  /* File changes handler*/
  changeFileHandler = event => {   
    const targetFile = event.target.files[0];
    let formErrors = this.state.formErrors;
    formErrors.category_image = "";
    
    if(targetFile.type != "image/png" && targetFile.type != "image/jpeg" && targetFile.type != "image/jpg" && targetFile.type != "image/svg") {
      formErrors.category_image = " accept only png, jpeg, jpg";
      this.setState({ categoryImage: targetFile, formErrors: formErrors  });
    }
    else
      this.setState({ categoryImage: targetFile, formErrors: formErrors  });
  };

  /* Edit Category*/
  handleEditCategory(rowIndex){
   
      const categoryItem = this.state.categoryList[rowIndex];
      
      this.setState({modal: true, category_name: categoryItem.categoryName, rowIndex: rowIndex, formValid: true});
  }
  /* Add category */
  handleDeleteCategory(rowIndex){
   
    const categoryItem = this.state.categoryList[rowIndex];
   
    this.setState( { loading: true}, () => {
      commonService.deleteAPIWithAccessToken( `category/`+categoryItem.categoryId)
        .then( res => {
          console.log(res);       
          debugger;
          if ( undefined === res.data || !res.data.status ) {            
                   
            return;
          }         
          this.setState({loading: false});
          this.categoryList();
        } )
        .catch( err => {       
            
          if(err.response.status == 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { error: err.response.data.message, loading: false } );
      } )
    })
  }

  render() {
      const { categoryList, loading } = this.state;     
      
      let loaderElement ='';
      
      if(!loading)
        loaderElement = '';
      else
          loaderElement = <Loader />

      return (
        <React.Fragment>
          <SideNavigation />
          <main className="dashboard-content">
            <MDBContainer>
              <MDBRow className="mb-12">
                <MDBCol md="6">
                  <h2 className="section-heading mb-4">Category List</h2>
                </MDBCol>
                <MDBCol md="6">
                  <div className="text-right">
                    <MDBBtn size="sm" color="primary" className="px-2" onClick={this.toggle}>
                      <i className="fa fa-plus mt-0"></i> Add new category
                    </MDBBtn>
                    
                  </div>
                </MDBCol>
                {loaderElement}
                <MDBCol md="12">
                    <CategoryDataItem data={categoryList} editCategoryAction={this.handleEditCategory} deleteCategoryAction={this.handleDeleteCategory} />
                </MDBCol>
            </MDBRow>
          </MDBContainer>

          <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" className="cascading-modal">
            <form className="needs-validation" onSubmit={this.submitHandler} noValidate >
              <MDBModalHeader toggle={this.toggle} className="light-blue white-text">Category</MDBModalHeader>
              <MDBModalBody>
                <FormErrors formErrors={this.state.formErrors} />
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput value={this.state.category_name} name="category_name" onChange={this.changeHandler} type="text" id="category_name" label="Category name*" required ></MDBInput>
                  </MDBCol>                 
                  <MDBCol md="6">
                    <span>&nbsp;</span>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="uploadLogo">
                          Upload
                        </span>
                      </div>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="categoryImage" name="categoryImage" aria-describedby="uploadLogo" onChange={this.changeFileHandler} accept=".png,.jpg,.jpeg,.svg" />
                        <label className="custom-file-label" htmlFor="categoryImage">
                          Category Image
                        </label>
                      </div>
                    </div>
                  </MDBCol>                  
                  
                </MDBRow>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>Cancel</MDBBtn>
                <MDBBtn color="primary" disabled={!this.state.formValid} type="submit">Submit</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModal>

        </main>
      </React.Fragment>
    )
  }
}

export default categoryLists;