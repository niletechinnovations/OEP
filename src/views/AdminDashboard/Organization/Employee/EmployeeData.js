import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

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
        firstName: employee.firstName,
        email: employee.email,
        roleName: employee.roleName || " ",
        phoneNumber: employee.phoneNumber || " ",
        address: employee.address || " ",
        city: employee.city || " ",      
        state: employee.state || " ",
        country: employee.country || " ",
        status: employee.status ? "Active" : "Inactive",   
        action: "",       
      }      
      rowsItem.push(orgInfo);
    }      
    
    const columns = [ 
      {
        label: 'Employee Name',
        name: 'firstName',
      },     
      {
        label: 'Organization Name',
        name: 'organizationName',
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
           
            return (
             <p><button className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
              this.editEmployeeItem(i)}><i className="fa fa-pencil"></i> </button>
              <button className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => {if( window.confirm('Are you sure you wish to delete this employee?'))
              this.deleteEmployeeItem(i)}}><i className="fa fa-trash"></i></button></p>
            );
          },
        }
      },
    ];
    const options = {
      search: true,
      filter: false,
      searchOpen: false,
      print: false,
      download: true,
      responsive: 'stacked',
      selectableRows: 'none',
      textLabels: {
        body: {
          noMatch: this.props.dataTableLoadingStatus ? "Processing........" : "Sorry, no matching records found",
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