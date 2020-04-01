import React, { Component } from 'react';
//import  { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

  
  
class ActionData extends Component {
  
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
  
  deleteActionItem(rowIndex){    
    this.props.deleteAction(rowIndex);
  }
  
  
  render() {
    
    let rowsItem = [];
    
    for(const [i, inspection] of this.props.data.entries()){
      console.log(i);
      let inspectionInfo = {
       description: inspection.description,
       createdBy: inspection.AssignBy !== undefined ? inspection.AssignBy.firstName + ' '+ inspection.AssignBy.lastName : '',
       assignTo: inspection.AssignTo !== undefined ? inspection.AssignTo.firstName + ' '+  inspection.AssignTo.lastName : '', 
       dueDate: inspection.dueDate,   
       priority: inspection.priority === 1 ? 'Low' : (inspection.priority === 2  ? 'Medium': 'High'),
       status: inspection.status === 1 ? 'To Do' : (inspection.status === 2  ? 'In Process': 'Completed'), 
       action: '' 
      }      
      rowsItem.push(inspectionInfo);
    }
    const columns = [
      {
        label: 'Description',
        name: 'description',
      },
      {
        label: 'Created By',
        name: 'createdBy',
      },
      {
        label: 'Assign To',
        name: 'assignTo',
      },
      {
        label: 'Due Date',
        name: 'dueDate',
      },
      {
        label: 'Priority',
        name: 'priority',
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
             <p><button className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => 
                {if (window.confirm('Are you sure you wish to delete this action?')) this.deleteActionItem(i)}}><i className="fa fa-trash"></i></button></p>
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
        title={"Inspection"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default ActionData;