import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBDataTable, MDBIcon } from 'mdbreact';


  
  
class organizationData extends Component {
  
  constructor(props){
    super(props);   
    this.state = {
      buttonProcessing: false,
      rowIndex: '',
      dataTableItem: []
    };
    
  }
  componentDidMount() {     
    let rowsItem = [];
    
    for(const [i, cat] of this.props.data.entries()){
      let catInfo = {
        name: cat.categoryName,        
        action: <p><a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.editOrganizationItem(i)}><MDBIcon icon="edit"></MDBIcon> </a>
          <a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteOrganizationItem(i)}><MDBIcon icon="trash"></MDBIcon></a></p>,       
      }      
      rowsItem.push(catInfo);
    }    
    this.setState({dataTableItem: rowsItem});
  }
  /* Edit Organization Info */
  editOrganizationItem(rowIndex){    
    this.props.editOrganizationAction(rowIndex);
  }

  deleteOrganizationItem(rowIndex){    
    this.props.deleteOrganizationAction(rowIndex);
  }
  
  render() {
    let data = {
      columns: [
        {
          label: 'Organization Name',
          field: 'organizationName',
          sort: 'asc',
        },
        {
          label: 'Contact Person',
          field: 'firstName',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'roleName',
          sort: 'asc',
        },
        {
          label: 'Phone Number',
          field: 'phoneNumber',
          sort: 'asc',
        },
        {
          label: 'Address',
          field: 'address',
          sort: 'asc',
        },
        {
          label: 'City',
          field: 'city',
          sort: 'asc',
        },
        {
          label: 'State',
          field: 'state',
          sort: 'asc',
        },
        {
          label: 'Country',
          field: 'country',
          sort: 'asc',
        },
        {

          label: "Action",

          field: "action"

        }
      ],
      rows: this.state.dataTableItem
    };
    let rowsItem = [];
    
    for(const [i, orgnization] of this.props.data.entries()){
      let orgnizationInfo = {
        organizationName: orgnization.organizationName,  
        firstName: orgnization.firstName,
        email: orgnization.email,
        roleName: orgnization.roleName || " ",
        phoneNumber: orgnization.phoneNumber || " ",
        address: orgnization.address || " ",
        city: orgnization.city || " ",      
        state: orgnization.state || " ",
        country: orgnization.country || " ",
        action: <p><a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.editOrganizationItem(i)}><MDBIcon icon="edit"></MDBIcon> </a>
          <a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteOrganizationItem(i)}><MDBIcon icon="trash"></MDBIcon></a></p>,       
      }      
      rowsItem.push(orgnizationInfo);
    }
    data.rows = rowsItem;

    return (
      <MDBCard narrow>
      <MDBCardBody cascade>

        <MDBDataTable
          striped
          bordered
          hover
          responsive
          data={data}

        />
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default organizationData;