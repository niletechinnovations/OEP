import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import  { Link } from 'react-router-dom';

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
      console.log(i);
      let orgInfo = {   
        organizationName: employee.organizationName,      
        firstName: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        roleName: employee.roleName || " ",
        phoneNumber: employee.phoneNumber || " ",
        address: employee.address || " ",
        city: employee.city || " ",      
        state: employee.state || " ",
        country: employee.country || " ",
        status: employee.status ? "Active": "Inactive",   
        action: "",       
        isSingleUserSubscription: employee.isSingleUserSubscription,
        isActiveSubscription: employee.isActiveSubscription,
        subscriberId: employee.subscriberId,
        authId: employee.authId
      }      
      rowsItem.push(orgInfo);
    }        
    const columns = [ 
      {
        label: 'Employee Name',
        name: 'firstName',
      },  
      {
        label: 'Email',
        name: 'email',
      },
      {
        label: 'Phone Number',
        name: 'phoneNumber',
      },
      {
        label: 'Address',
        name: 'address',
      },
      {
        label: 'Status',
        name: 'status',
      },
      {
        label: 'Action',
        name: 'action',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            let i = tableMeta.rowIndex;
            let employeeInfo = rowsItem[i];
            return (
              <p><button className="btn-edit" title="Edit Employee"  disabled={this.state.buttonProcessing} onClick={() => 
              this.editEmployeeItem(i)}><i className="fa fa-pencil"></i> </button>
              {employeeInfo.isSingleUserSubscription ? employeeInfo.isActiveSubscription ? <button className="btn-delete" title="Cancel Subscription"  disabled={this.state.buttonProcessing} onClick={() => 
              {if( window.confirm('Are you sure cancel employee subscription?')) this.props.cancelSubscription(i);}}><i className="fa fa-times"></i> </button>: <Link to ={`/organization/subscription/employee-subscription/${employeeInfo.authId}`} className="btn-edit" title="Buy Subscription"><i className="fa fa-plus"></i></Link> :  ""}
              <button className="btn-delete"  title="Delete Employee" disabled={this.state.buttonProcessing} onClick={() => {if( window.confirm('Are you sure you wish to delete this employee?'))
                  this.deleteEmployeeItem(i);}}><i className="fa fa-trash"></i></button></p>
            );
          },
        }
      },
    ];
    
   
   const options = {
      search: true,viewColumns: false,
      filter: false,
      searchOpen: false,
      print: false,
      download: false,
      responsive: 'stacked',
      selectableRows: 'none',
      textLabels: {
        body: {
          noMatch: this.props.dataTableLoadingStatus ? "Processing........" : "",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
      },
      fixedHeaderOptions: { xAxis: false, yAxis: false }

    };
    
    return (
      <MUIDataTable
        title={"Employee List"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default EmployeeData;