import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import { FormErrors } from '../../Formerrors/Formerrors';
import AutoCompletePlaces from '../../../core/google-map/AutoCompletePlaces';
import Loader from '../../Loader/Loader';
import StoreData from './StoreData';
import './Store.css'

class Store extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      storeList: [],      
      loading: true,
      formProccessing: false,
      rowIndex: -1,
      formField: { store_name: '', phoneNumber: '', latitude: '', longitude: '', address: '', city: '', state: '', country: '', postalCode: ''},
      formErrors: { store_name: '', error: ''},
      formValid: false,
      filterItem: { filter_organization_id: '', country: '', state: '', custom_search: ''},
    } 
    this.handleEditStore = this.handleEditStore.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleDeleteStore = this.handleDeleteStore.bind(this);
    this.filterStoreList = this.filterStoreList.bind(this);
    this.resetSearchFilter = this.resetSearchFilter.bind(this);
    this.setLatitudeLongitude = this.setLatitudeLongitude.bind(this);
    
  }
  // Fetch the Employee List
  componentDidMount() {     
    this.storeList({});   
    
  }

  setLatitudeLongitude(address, latLng, city, state, country, postal_code){
    let formField = this.state.formField;
    formField.state = state;
    formField.country = country;formField.city = city;formField.postalCode = postal_code;
    formField.address = address
    this.setState({ formField: formField })
  }
  /*Employee List API*/
  storeList(filterItem = {}) {
    let stroreWalkQuery = "";
    
    if(filterItem.country !== undefined && filterItem.country !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&country="+filterItem.country: "?country="+filterItem.country;
    if(filterItem.state !== undefined && filterItem.state !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&state="+filterItem.state: "?state="+filterItem.state;
    if(filterItem.custom_search !== undefined && filterItem.custom_search !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&keyword="+filterItem.custom_search: "?keyword="+filterItem.custom_search;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('store'+stroreWalkQuery)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, storeList: res.data.data});     
         
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

  
  filterStoreList(){
    const filterItem = this.state.filterItem;
    this.storeList(filterItem);
  }
  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    this.setState( { formProccessing: true}, () => {
      const formInputField = this.state.formField;
      const formData = {       
        "storeName": formInputField.store_name, 
        "phoneNumber": formInputField.phoneNumber, 
        "address": formInputField.address, 
        "city": formInputField.city, 
        "state": formInputField.state, 
        "country": formInputField.country, 
        "postalCode": formInputField.postalCode,      
      };
      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        const storeInfo = this.state.storeList[rowIndex];

        commonService.putAPIWithAccessToken('store/'+storeInfo.storeId, formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.storeList();
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { formProccessing: false } );
            toast.error(err.message);
        } )
      }
      else{
        commonService.postAPIWithAccessToken('store', formData)
        .then( res => {
         
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.storeList();
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { formProccessing: false } );
            toast.error(err.message);
        } )
      }
    } );
    
  };
  /* Input Field On changes*/
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField },
                  () => { this.validateField(name, value) });
  };

  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };
  
  /* Validate Form Field */
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.error = '';
   
    switch(fieldName) {   
      
      case 'store_name':        
        fieldValidationErrors.store_name = (value !== '') ? '' : ' is required';
        break;
                 
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,       
                  }, this.validateForm);
  }
  /* Validate Form */
  validateForm() {
    
    const formErrors = this.state.formErrors;
    const formField = this.state.formField;
    this.setState({formValid: 
      (formErrors.store_name === "" && formField.store_name !== "") 
      ? true : false});
  }
  /* Set Error Class*/
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      formProccessing : false,
      rowIndex: -1,
      formValid: false,
      formField: { store_name: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '' },
      formErrors: {store_name: '', error: ''}
    });
  }
  /* Edit Employee*/
  handleEditStore(rowIndex){
      const storeInfo = this.state.storeList[rowIndex];
      const formField = {        
        store_name: storeInfo.storeName, 
        phoneNumber: storeInfo.phoneNumber, 
        address: storeInfo.address, 
        city: storeInfo.city, 
        state: storeInfo.state, 
        country: storeInfo.country, 
        postalCode: storeInfo.postalCode };
      this.setState({rowIndex: rowIndex, formField: formField, formProccessing : false, modal: true, formValid: true});
  }
  /* Delete Employee*/
  handleDeleteStore(rowIndex){
   
    const storeInfo = this.state.storeList[rowIndex];
    
    this.setState( { loading : true}, () => {   
      commonService.deleteAPIWithAccessToken('store', {storeId: storeInfo.storeId})
      .then( res => {
        
         
        if ( undefined === res.data.data || !res.data.status ) {
         
          this.setState( { loading : false} );
          toast.error(res.data.message);
          return;
        } 
        
        this.setState({ modal: false, loading : false});
        toast.success(res.data.message);
        this.storeList();
       
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
  selectCountry (val) {
    let formField = this.state.formField;
    formField.country = val
    this.setState({ formField: formField });
  }
 
  selectRegion (val) {
    let formField = this.state.formField;
    formField.state = val
    this.setState({ formField: formField });
  }

  selectFilterCountry (val) {
    let filterItem = this.state.filterItem;
    filterItem.country = val
    this.setState({ filterItem: filterItem });
  }
 
  selectFilterRegion (val) {
    let filterItem = this.state.filterItem;
    filterItem.state = val
    this.setState({ filterItem: filterItem });
  }
  resetSearchFilter() {
    this.setState({filterItem: { filter_organization_id: '', country: '', state: '', custom_search: ''}});
    this.storeList();
  }
  render() {

    const { storeList, loading, modal, formProccessing } = this.state;     
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;
    const priorityCountry = ['US'];
    return (
      <div className="animated fadeIn">
        <Row>
          
          {loaderElement}
          <Col lg={12}>
            <div className="oep-em-info">
            <Card className="oep-card">
              <CardHeader className="mainHeading">
                <strong>Store List</strong> <Button color="abc" className="categoryAdd" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Add Store</Button>
              </CardHeader>
              <CardBody>
                
                <Row>
                  <Col md={12}>
                    <div className="search-filter">
                      <Row>                     
                        <Col md={"4"} lg={"3"}>
                          <FormGroup> 
                            <Label htmlFor="filter_organization_id">Country</Label>            
                            <CountryDropdown id="filterCountry" name="filterCountry" priorityOptions={priorityCountry} className="form-control" value={this.state.filterItem.country}  onChange={(val) => this.selectFilterCountry(val)} />
                          </FormGroup>  
                        </Col>
                        <Col md={"4"} lg={"3"}>
                          <FormGroup> 
                            <Label htmlFor="filter_organization_id">State</Label>            
                            <RegionDropdown  id="filterState" name="filterState" className="form-control" country={this.state.filterItem.country} defaultOptionLabel="Select State" blankOptionLabel="Select State"   value={this.state.filterItem.state}  onChange={(val) => this.selectFilterRegion(val)} /> 
                          </FormGroup>  
                        </Col>
                        <Col md={"4"} lg={"3"}>
                          <FormGroup> 
                            <Label htmlFor="filter_organization_id">Search By Store/ City</Label>            
                            <Input type="text" placeholder="Search By Store/ City" id="custom_search" name="custom_search" value={this.state.formField.custom_search} onChange={this.changeFilterHandler} />
                          </FormGroup>  
                        </Col>
                        <Col md={"6"} lg={"3"}>
                          <FormGroup className="filter-button-section"> 
                            <Label htmlFor="filter_organization_id">&nbsp;</Label> 
                            <Button className="search-btn"  type="button" onClick={this.filterStoreList}>Search</Button> 
                            <Button className="reset-btn" id="resetButton" type="button" onClick={this.resetSearchFilter}>Reset</Button> 
                          </FormGroup>   
                                  
                        </Col>
                      </Row>  
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="oep-table">
                    <StoreData data={storeList} editStoreAction={this.handleEditStore} deleteStoreAction={this.handleDeleteStore} dataTableLoadingStatus = {this.state.loading} />
                    </div>
                  </Col>
                  {this.props.previousStep ? 
                  <Col md={6} className="floating-prev-next">
                      <Button className="search-btn" onClick={() => this.props.previousStep()}>Previous Step</Button>
                  </Col> : ""}
                  {this.props.finishSetup ? 
                  <Col md={6} className="floating-prev-next">
                      <Button className="search-btn pull-right" onClick={() => this.props.finishSetup()}>Finish</Button>
                  </Col> : ""}
                </Row> 
              </CardBody>
            </Card>
            </div>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={this.toggle} className=" oep-model store-modal">
          <ModalHeader toggle={this.toggle}>Store</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate>
            <ModalBody>
              <FormErrors formErrors={this.state.formErrors} />
              <Row>                
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="store_name">Store Name</Label>            
                    <Input type="text" placeholder="Store Name *" id="store_name" name="store_name" value={this.state.formField.store_name} onChange={this.changeHandler} required />
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="phoneNumber">Contact Number</Label>            
                    <Input type="text" placeholder="Contact Number " id="phoneNumber" name="phoneNumber" value={this.state.formField.phoneNumber} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="address">Address</Label>            
                    <AutoCompletePlaces  setLatitudeLongitude={this.setLatitudeLongitude} address = {this.state.formField.address} />
                  </FormGroup>
                </Col>
                {/*
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="country">Country</Label>     
                    <CountryDropdown id="country" name="country" priorityOptions={priorityCountry} className="form-control" value={this.state.formField.country}  onChange={(val) => this.selectCountry(val)} />       
                    
                  </FormGroup>
                </Col>                
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="state">State</Label>  
                    <RegionDropdown  id="state" name="state" className="form-control" country={this.state.formField.country} defaultOptionLabel="Select State" blankOptionLabel="Select State"   value={this.state.formField.state}  onChange={(val) => this.selectRegion(val)} /> 
                  </FormGroup>
                </Col>
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="city">City</Label>            
                    <Input type="text" placeholder="City" id="city" name="city" value={this.state.formField.city} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col> */}
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="postalCode">Postal Code</Label>            
                    <Input type="text" placeholder="Postal Code" id="postalCode" name="postalCode" value={this.state.formField.postalCode} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button className="submit-btn" color="primary" disabled={!this.state.formValid || formProccessing} type="submit">{formProccessing ? processingBtnText : 'Submit' }</Button>
              <Button className="btnCancel" color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

    )
  }
}

export default Store;
