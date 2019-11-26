import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

class TemplateData extends Component {
  
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
    
    for(const [i, template] of this.props.data.entries()){
      let templateInfo = {
        templateName: template.templateName,  
        type: template.type === 'free' ? 'Default' : 'Paid',
        status: template.status ? 'Active' : 'Inactive',
        categoryName: template.categoryName || " ",
        subCategoryName: template.subCategoryName || " ",
        action: <Link to={`/admin/create-template/${template.templateId}`}><i className="fa fa-eye"></i> </Link>,       
      }      
      rowsItem.push(templateInfo);
    }
    const columns = [
      {
        label: 'Template Name',
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
        title={"Template"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default TemplateData;