import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Input, FormGroup, Label} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import Loader from '../../Loader/Loader';
import TemplateData from './TemplateData';
import './Template.css';

class Template extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      templateList: [],      
      subCategoryList: [],
      categoryList: [], 
      filterItem: { organizationId: '', categoryId: '', subCategoryId: ''},
    } 
    this.filterTemplateList = this.filterTemplateList.bind(this);
  }
  componentDidMount() { 
    this.templateList();
    this.categoryList();
  }

  /*User List API*/
  templateList(filterItem = {}) {
    let queryString = "";
    queryString += "?owntemplate=yes";
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
  /*Handle catgeory Input Change and bind subcategory*/
  changeCategoryHandle = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
    this.getSubCategoryList(value);
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

  render() {

    const { templateList, loading, categoryList, subCategoryList } = this.state; 
    let loaderElement = '';
    if(loading) 
      loaderElement = <Loader />

    return (
      <div className="animated fadeIn">
        <Row>
         
          {loaderElement}
          <Col lg={12}>
            <Card>
              <CardHeader className="mainHeading">
                <strong>Template List</strong> 
              </CardHeader>
              <CardBody>
               
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col lg={3}>
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
                      <Col lg={3}>
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
                      <Col md={"3"}>
                        <FormGroup className="filter-button-section"> 
                          <Label htmlFor="searchButton">&nbsp;</Label> 
                          <Button color="success" id="searchButton" type="button" onClick={this.filterTemplateList}>Search</Button> 
                        </FormGroup>             
                      </Col>
                    </Row>  
                  </Col>
                  <Col md={12}>
                    <TemplateData data={templateList} dataTableLoadingStatus = {this.state.loading} />
                  </Col>
                </Row>
                  
              </CardBody>
            </Card>
          </Col>
        </Row>
        
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
export default Template;
