import React, { Component } from 'react';
import { Table } from 'reactstrap';
function EmployeeRow(props) {
  const Employee = props.Employee;

  const getStatus = (status) => {
    return status === true ? 'Active' : 'Inactive'
  }  
  return (
    <tr>   
      <td>{Employee.firstName}</td>
      <td>{Employee.email}</td>
      <td>{Employee.roleName}</td>
      <td>{Employee.phoneNumber}</td>
      <td>{Employee.address}</td>
      <td>{Employee.city}</td>
      <td>{Employee.state}</td>
      <td>{Employee.country}</td>

      <td>{getStatus(Employee.status)}</td>
      <td>{Employee.action}</td>
    </tr>
  )
} 
class EmployeeData extends Component {
  
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
  /* Edit Employee Info */
  editEmployeeItem(rowIndex){    
    this.props.editEmployeeAction(rowIndex);
  }

  deleteEmployeeItem(rowIndex){    
    this.props.deleteEmployeeAction(rowIndex);
  }

  render() {
    
    let rowsItem = [];    
    for(const [i, employee] of this.props.data.entries()){
      let orgInfo = {         
        firstName: employee.firstName,
        email: employee.email,
        roleName: employee.roleName || " ",
        phoneNumber: employee.phoneNumber || " ",
        address: employee.address || " ",
        city: employee.city || " ",      
        state: employee.state || " ",
        country: employee.country || " ",
        status: employee.status || true,   
        action: <p><a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.editEmployeeItem(i)}><i className="fa fa-pencil"></i> </a>
          <a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteEmployeeItem(i)}><i className="fa fa-trash"></i></a></p>,       
      }      
      rowsItem.push(orgInfo);
    }      
    
    
    
    return (
      <Table responsive hover>
        <thead>
          <tr>
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
          {rowsItem.map((Employee, index) =>
            <EmployeeRow key={index} Employee={Employee}/>
          )}
        </tbody>
      </Table>
    );
  }
}

export default EmployeeData;