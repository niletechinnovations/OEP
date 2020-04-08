import React, { Component } from 'react';

import  { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

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
      console.log(i);
      let orgInfo = {
        organizationName: orgnization.organizationName,  
        firstName: `${orgnization.firstName} ${orgnization.lastName}`,
        email: orgnization.email,
        roleName: orgnization.organizationRole || " ",
        phoneNumber: orgnization.phoneNumber || " ",
        address: orgnization.address || " ",
        city: orgnization.city || " ",      
        state: orgnization.state || " ",
        country: orgnization.country || " ",
        status: orgnization.status ? "Active" : "Inactive",   
        action: "",
        organizationAuthId: orgnization.authId

      }      
      rowsItem.push(orgInfo);
    }      
    const columns = [      
      {
        label: 'Organization Name',
        name: 'organizationName',
      },
      {
        label: 'Contact Person',
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
            let rowInfo = this.props.data[i];
            let authId = rowInfo.authId;
            return (
             <p><button title="Edit Organization" className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
          this.editOrganizationItem(i)}><i className="fa fa-pencil"></i> </button>
          <Link title="View Employee" className="btn-view" to={`/admin/manage-organization/employee/${authId}`}><i className="fa fa-user"></i> </Link>
          <Link title="View Store" className="btn-view" to={`/admin/manage-organization/store/${authId}`}><i className="fa fa-venus"></i> </Link>
          <button title="Delete Folder" className="btn-delete" color="warning" disabled={this.state.buttonProcessing} onClick={() => {if( window.confirm('Are you sure you wish to delete this organization?'))
          this.deleteOrganizationItem(i)}}><i className="fa fa-trash"></i></button></p>
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
      download: true,
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
        title={"Organization"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default OrganizationData;