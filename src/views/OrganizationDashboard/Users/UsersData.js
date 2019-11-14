import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
function UsersRow(props) {
  const Users = props.Users;

  const getStatus = (status) => {
    return status === true ? 'Active' : 'Inactive'
  }  
  return (
    <tr>      
      <td>{Users.firstName}</td>
      <td>{Users.email}</td>
      <td>{Users.phoneNumber}</td>
      <td>{getStatus(Users.status)}</td>
      <td>{Users.action}</td>
    </tr>
  )
} 
class UsersData extends Component {
  
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
  
  render() {
    
    let rowsItem = [];
    
    for(const [i, userInfo] of this.props.data.entries()){    
      let userDetail = {
        firstName: userInfo.firstName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber || " ",
        address: userInfo.address || " ",
        status: userInfo.status || true,
        action: <p><Link to={`/admin/users/${userInfo.profileId}`}><i className="fa fa-eye"></i> </Link>
          <a href="#!" disabled={this.state.buttonProcessing} ><i className="fa fa-trash"></i></a></p>,

      }  
      rowsItem.push(userDetail);
    }       
    
    
    
    return (
      <Table responsive hover>
        <thead>
          <tr>            
            <th scope="col">Name</th> 
            <th scope="col">Email</th>
            <th scope="col">Phone</th>          
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rowsItem.map((Users, index) =>
            <UsersRow key={index} Users={Users}/>
          )}
        </tbody>
      </Table>
    );
  }
}

export default UsersData;