import React, { Component } from 'react';
import { Table } from 'reactstrap';
function OrganizationRow(props) {
  const Organization = props.Organization;

  const getStatus = (status) => {
    return status === true ? 'Active' : 'Inactive'
  }  
  return (
    <tr>      
      <td>{Organization.organizationName}</td>
      <td>{Organization.firstName}</td>
      <td>{Organization.email}</td>
      <td>{Organization.roleName}</td>
      <td>{Organization.phoneNumber}</td>
      <td>{Organization.address}</td>
      <td>{Organization.city}</td>
      <td>{Organization.state}</td>
      <td>{Organization.country}</td>

      <td>{getStatus(Organization.status)}</td>
      <td>{Organization.action}</td>
    </tr>
  )
} 
class OrganizationData extends Component {
  
  constructor(props){
    super(props);   
    this.state = {
      buttonProcessing: false,
      rowIndex: '',
      dataTableItem: []
    };
    
  }
  componentDidMount() {   
  }
  /* Edit Organization Info */
  editOrganizationItem(rowIndex){    
    this.props.editOrganizationAction(rowIndex);
  }

  deleteOrganizationItem(rowIndex){    
    this.props.deleteOrganizationAction(rowIndex);
  }

  render() {
    
    let rowsItem = [];    
    for(const [i, orgnization] of this.props.data.entries()){
      let orgInfo = {
        organizationName: orgnization.organizationName,  
        firstName: orgnization.firstName,
        email: orgnization.email,
        roleName: orgnization.roleName || " ",
        phoneNumber: orgnization.phoneNumber || " ",
        address: orgnization.address || " ",
        city: orgnization.city || " ",      
        state: orgnization.state || " ",
        country: orgnization.country || " ",
        status: orgnization.status || true,   
        action: <p><a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.editOrganizationItem(i)}><i className="fa fa-pencil"></i> </a>
          <a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteOrganizationItem(i)}><i className="fa fa-trash"></i></a></p>,       
      }      
      rowsItem.push(orgInfo);
    }      
    
    
    
    return (
      <Table responsive hover>
        <thead>
          <tr>            
            <th scope="col">Organization Name</th> 
            <th scope="col">Contact Person</th>
            <th scope="col">Email</th>   
            <th scope="col">Role</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Address</th>       
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Country</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rowsItem.map((Organization, index) =>
            <OrganizationRow key={index} Organization={Organization}/>
          )}
        </tbody>
      </Table>
    );
  }
}

export default OrganizationData;