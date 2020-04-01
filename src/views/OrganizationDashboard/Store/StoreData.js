import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

class StoreData extends Component {
  
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
  /* Edit Store Info */
  editStoreItem(rowIndex){    
    this.props.editStoreAction(rowIndex);
  }

  deleteStoreItem(rowIndex){    
    this.props.deleteStoreAction(rowIndex);
  }

  render() {
    
    let rowsItem = []; 
    for(const [i, Store] of this.props.data.entries()){
      let orgInfo = {  
        storeName: Store.storeName,        
        phoneNumber: Store.phoneNumber || " ",
        address: Store.address || " ",
        city: Store.city || " ",      
        state: Store.state || " ",
        country: Store.country || " ",
        storeLevelStatus: Store.storeLevelStatus ? (Store.storeLevelStatus === 1 ? "Silver" : Store.storeLevelStatus === 2 ? "Gold" : "Platinum") : 'Silver',
        status: Store.status ? 'Active' : 'Inactive',   
        action: <p><button className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
          this.editStoreItem(i)}><i className="fa fa-pencil"></i> </button>
          <button href className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteStoreItem(i)}><i className="fa fa-trash"></i></button></p>,       
      }      
      rowsItem.push(orgInfo);
    }      
    
    const columns = [ 
      {
        label: 'Store Name',
        name: 'storeName',
      }, 
      {
        label: 'Address',
        name: 'address',
      },
      {
        label: 'Phone Number',
        name: 'phoneNumber',
      },
      {
        label: 'Store Level',
        name: 'storeLevelStatus',
      },
      {
        label: 'Status',
        name: 'status',
      },
      {
        label: 'Action',
        name: 'action',
      },
    ];
    const options = {
      search: true,
      filter: false,
      searchOpen: false,
      print: false,
      download: false,
      responsive: 'stacked',
      selectableRows: 'none',
      textLabels: {
        body: {
          noMatch: this.props.dataTableLoadingStatus ? "Processing........" : "No Records Found",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
      },
      fixedHeaderOptions: { xAxis: false, yAxis: false }

    };
    
    return (
      <MUIDataTable
        title={"Store List"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default StoreData;