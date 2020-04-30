import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Input, FormGroup, Label} from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import Loader from '../../Loader/Loader';
import TemplateDataCard from './TemplateDataCard';
import './Template.css';

class CustomTemplate extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      displayContentCount: 10,
      displayContentSize: 10,
      organizationList: [],
      templateList: [],      
      subCategoryList: [],
      categoryList: [], 
      filterItem: { organizationId: '', categoryId: '', subCategoryId: ''},
    } 
    this.filterTemplateList = this.filterTemplateList.bind(this);
    this.loadMoreContent = this.loadMoreContent.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
  }
  componentDidMount() { 
    this.templateList();
    this.categoryList();
    this.organizationList();
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

  organizationList() {   
    
    commonService.getAPIWithAccessToken('organization')
      .then( res => {       
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( { loading: false } );
          toast.error(res.data.message);
          return;
        }   

        this.setState({loading:false, organizationList: res.data.data});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else 
          this.setState( { loading: false } );
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
    this.setState({displayContentCount: this.state.displayContentSize});
    this.templateList(filterItem);
  }

  loadMoreContent() {
    let totalTemplateCount = this.state.templateList.length;
    let currentDisplayCount = this.state.displayContentCount;
    let displayContentCount = currentDisplayCount + this.state.displayContentSize;
    if(totalTemplateCount <= displayContentCount)
      displayContentCount = totalTemplateCount;
    this.setState({displayContentCount: displayContentCount});
      
  }

  deleteTemplate(index){
    const templateInfo = this.state.templateList[index];
    
    this.setState( { loading : true}, () => {   
      commonService.deleteAPIWithAccessToken(`template/${templateInfo.templateId}`)
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

  render() {

    const { templateList, loading, categoryList, subCategoryList, displayContentCount, organizationList } = this.state; 
    let loaderElement = '';
    let displayTemplateData = [];
    if(templateList.length >= displayContentCount){
      displayTemplateData = templateList.slice(0, displayContentCount);
    }
    else if(templateList.length > 0 ) {
      displayTemplateData = templateList.slice(0, templateList.length);
    }
    if(loading) 
      loaderElement = <Loader />

    return (
      <div className="animated fadeIn">
        <Row>
         
          {loaderElement}
          <Col lg={12}>
            <Card className="oep-card">
              <CardHeader className="mainHeading">
                <strong>Custom Template</strong> 
              </CardHeader>
              <CardBody>
               
                <Row>
                  <Col md={12}>
                    <div className="search-filter">
                    <Row>
                      <Col md={"3"}>
                        <FormGroup> 
                          <Label htmlFor="organizationId">Organization</Label>            
                          <Input type="select" placeholder="Organization *" id="organizationId" name="organizationId" value={this.state.filterItem.organizationId} onChange={this.changeFilterHandler} >
                            <option value="">Select Organization</option>
                            {organizationList.map((organizationInfo, index) =>
                              <SetOrganizationDropDownItem key={index} organizationInfo={organizationInfo} />
                            )}
                          </Input>
                        </FormGroup>  
                      </Col>
                      <Col md={"3"} lg={"3"}>
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
                      <Col md={"3"} lg={"3"}>
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
                      <Col md={"3"} lg={"3"}>
                        <FormGroup className="filter-button-section"> 
                          <Label htmlFor="searchButton">&nbsp;</Label> 
                          <Button color="success" className="search-btn" id="searchButton" type="button" onClick={this.filterTemplateList}> Search</Button> 
                        </FormGroup>             
                      </Col>
                    </Row> 
                    </div> 
                  </Col>
                  <Col md={12}>
                    <TemplateDataCard data={displayTemplateData} deleteTemplate = {this.deleteTemplate} editTemplateFile="" apiUrl = {commonService.getAPIUrl()} dataTableLoadingStatus = {this.state.loading} />
                    
                  </Col>
                  {templateList.length > 0 && templateList.length > displayContentCount ? 
                  <Col md={12}>
                    <div className="load-more-section">
                      <button className="btn-Edit" onClick={this.loadMoreContent}>Load More</button>
                    </div>
                  </Col> : ""}
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
function SetOrganizationDropDownItem (props) {
  const organizationInfo = props.organizationInfo;
  return (<option value={organizationInfo.authId} >{organizationInfo.organizationName}</option>)
}
function SetSubCategoryDropDownItem (props) {
  const subCategoryItem = props.subCategoryItem;
  return (<option value={subCategoryItem.subCategoryId} >{subCategoryItem.subCategoryName}</option>)
}
export default CustomTemplate;
