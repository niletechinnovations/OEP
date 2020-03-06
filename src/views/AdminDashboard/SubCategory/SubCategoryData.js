import React, { Component } from 'react';
import { Button } from 'reactstrap';
import MUIDataTable from "mui-datatables";

class SubCategoryData extends Component {
  
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
  /* Edit SubCategory Item */
  editSubCategoryItem(rowIndex){    
    this.props.editSubCategoryAction(rowIndex);
  }
  /*Delete SubCategory*/
  deleteSubCategoryItem(rowIndex){    
    this.props.deleteSubCategoryAction(rowIndex);
  }
  
  render() {
    
    let rowsItem = [];    
    for(const [i, cat] of this.props.data.entries()){
      console.log(i);
      let catInfo = {
        name: cat.subCategoryName,
        parentCategory: cat.categoryName,
        status: cat.status ? "Active" : "Inactive" ,       
        action: "",       
      }      
      rowsItem.push(catInfo);
    }    
    const columns = [
      {
        label: 'Name',
        name: 'name',
      },
      {
        label: 'Parent Category',
        name: 'parentCategory'
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
             <p><a href="#!"className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
              this.editSubCategoryItem(i)}><i className="fa fa-pencil"></i> </a>
              <a href="#!" className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => 
              this.deleteSubCategoryItem(i)}><i className="fa fa-trash"></i></a></p>
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
      fixedHeaderOptions: { xAxis: false, yAxis: false },
       customToolbar: () => {
        return (
          <Button color="" className="categoryAdd" type="button" onClick={this.props.toggle}><i className="fa fa-plus"></i> Add New</Button>
        );
      }
      

    };
    return (
      <MUIDataTable
        title={"Subcategory"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default SubCategoryData;