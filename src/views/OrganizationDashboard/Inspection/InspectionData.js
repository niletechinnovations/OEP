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
      let inspectionInfo = {
        organizationName: inspection.organizationName,  
        inspectionName: inspection.inspectionName,
        employeeName: inspection.employeeName,
        templateName: inspection.templateName || " ",
        categoryName: inspection.categoryName || " ",
        subCategoryName: inspection.subCategoryName || " ",
        action: <p><Link to={`/organization/inspection/assign-inspection/${inspection.inspectionId}`} disabled={this.state.buttonProcessing} ><i className="fa fa-pencil"></i> </Link>
          <a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteInspectionItem(i)}><i className="fa fa-trash"></i></a></p>,       
      }      
      rowsItem.push(inspectionInfo);
    }
    const columns = [
      {
        label: 'Inspection',
        name: 'inspectionName',
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
          noMatch: this.props.dataTableLoadingStatus ? "Proccessing........" : "Sorry, no matching records found",
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