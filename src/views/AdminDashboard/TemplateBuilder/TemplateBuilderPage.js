import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label} from 'reactstrap';
import {ReactFormBuilder} from "../../FormBuilder/reactFormBuilder";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
//import "./../assets/css/bootstrap.min.css";
import "../../../assets/css/font-awesome.min.css";
import "react-form-builder2/dist/app.css";
import "./TemplateBuilderPage.css";
class TemplateBuilderPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {      
      subCategoryList: [],      
      loading: false,      
      categoryList: [], 
      formField: { categoryId: '', subCategoryId: '', template_name: ''},
      formProccessing: false
    }     
    this.getSubCategoryList = this.getSubCategoryList.bind(this);    
  }

  // Fetch the subCategory List
  componentDidMount() {   
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
  getSubCategoryList(categoryId) {
    const formField = this.state.formField;
    if(categoryId === "") {      
      formField.subCategoryId = '';
      this.setState({ formField: formField, subCategoryList: [] });
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
        formField.subCategoryId = '';
        this.setState({subCategoryList: res.data.data, formField: formField, loading: false});     
       
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

  /*Handle Input Change*/
  /* Input Field On changes*/
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField });
  };

  changeCategoryHandle = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField });
    this.getSubCategoryList(value);
  }

  render() {
    const { subCategoryList, loading, categoryList } = this.state;     
    let loaderElement ='';
    if(loading)
      loaderElement = <Loader />
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>Create Template</strong>
              </CardHeader>
              <CardBody>
                {loaderElement}
                <ToastContainer />
                <Form>
                  <Row>
                    <Col lg={6}>
                      <FormGroup> 
                        <Label htmlFor="categoryId">Category <span className="mandatory">*</span></Label>            
                        <Input type="select" placeholder="category Name *" id="categoryId" name="categoryId" value={this.state.formField.categoryId} onChange={this.changeCategoryHandle} required >
                          <option value="">Select Category</option>
                          {categoryList.map((categoryItem, index) =>
                            <SetCategoryDropDownItem key={index} categoryItem={categoryItem} selectedCategory={this.state.formField.categoryId} />
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup> 
                        <Label htmlFor="subCategoryId">Subcategory <span className="mandatory">*</span></Label>            
                        <Input type="select" placeholder="Subcategory Name *" id="subCategoryId" name="subCategoryId" value={this.state.formField.subCategoryId} onChange={this.changeHandler} required >
                          <option value="">Select Subcategory</option>
                          {subCategoryList.map((subCategoryItem, index) =>
                            <SetSubCategoryDropDownItem key={index} subCategoryItem={subCategoryItem} selectedCategory={this.state.formField.subCategoryId} />
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup>
                          <Label htmlFor="template_name">Template Name</Label>            
                          <Input type="text" placeholder="Template Name *" value={this.state.formField.template_name} onChange={this.changeHandler} id="template_name" name="template_name" required />
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <FormGroup>
                        <Label htmlFor="templateBuilderPage">Form Builder Area</Label>
                        <div id="templateBuilderPage" className="">
                          <ReactFormBuilder></ReactFormBuilder>  
                        </div>
                      </FormGroup>
                    </Col>
                    <Button color="primary" type="submit">Save</Button>
                    <Button color="secondary">Cancel</Button>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>  
        </Row>
      </div>
    );
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

export default TemplateBuilderPage;
