import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

  
  
class InspectionData extends Component {
  
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
  
  deleteInspectionItem(rowIndex){    
    this.props.deleteInspectionAction(rowIndex);
  }
  
  render() {
    
    let rowsItem = [];
    
    for(const [i, inspection] of this.props.data.entries()){
      console.log(i);
      let inspectionInfo = {
        organizationName: inspection.organizationName,  
        inspectionName: inspection.inspectionName,
        employeeName: inspection.employeeName,
        templateName: inspection.templateName || " ",
        categoryName: inspection.categoryName || " ",
        subCategoryName: inspection.subCategoryName || " ",
        status: inspection.currentStatus === 1 ? "Pending" : inspection.currentStatus === 2 ? "Proccessing" : "Completed",
        action: "",       
      }      
      rowsItem.push(inspectionInfo);
    }
    const columns = [
      {
        label: 'Inspection',
        name: 'inspectionName',
      },
      {
        label: 'Organization',
        name: 'organizationName',
      },
      {
        label: 'Employee',
        name: 'employeeName',
      },
      {
        label: 'Template',
        name: 'templateName',
      },
      {
        label: 'Category',
        name: 'categoryName',
      },
      {
        label: 'Subcategory',
        name: 'subCategoryName',
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
            return (
             <p><Link to={`/admin/manage-inspection/assign-inspection/${rowInfo.inspectionId}`} className="btn-edit" disabled={this.state.buttonProcessing} ><i className="fa fa-pencil"></i> </Link> <Link to={`/admin/manage-inspection/inspection/${rowInfo.inspectionId}`} title="View Feedback" className="btn-edit" disabled={this.state.buttonProcessing} ><i className="fa fa-eye"></i> </Link> 
              <button className="btn-delete" color="warning" disabled={this.state.buttonProcessing} onClick={() => 
              this.deleteInspectionItem(i)}><i className="fa fa-trash"></i></button></p>
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
          noMatch: this.props.dataTableLoadingStatus ? "Processing........" : "Sorry, no matching records found",
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

export default InspectionData;