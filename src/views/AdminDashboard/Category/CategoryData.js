import React, { Component } from 'react';
import { Button } from 'reactstrap';
import MUIDataTable from "mui-datatables";
class CategoryData extends Component {
  
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
  /* Edit Category Item */
  editCategoryItem(rowIndex){    
    this.props.editCategoryAction(rowIndex);
  }
  /*Delete Category*/
  deleteCategoryItem(rowIndex){    
    this.props.deleteCategoryAction(rowIndex);
  }
  
  render() {
    const columns = [
      {
        label: 'Name',
        name: 'name',
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

    let rowsItem = [];    
    for(const [i, cat] of this.props.data.entries()){
      let catInfo = {
        name: cat.categoryName,
        status: cat.status ? "Active" : "Inactive" ,       
        action: <p><button className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
          this.editCategoryItem(i)}><i className="fa fa-pencil"></i> </button>
          <button className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteCategoryItem(i)}><i className="fa fa-trash"></i></button></p>,       
      }      
      rowsItem.push(catInfo);
    }
    const options = {
      search: true,
      filter: false,
      searchOpen: false,
      print: false,
      viewColumns: true,
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
      fixedHeaderOptions: { xAxis: false, yAxis: false },
       customToolbar: () => {
        return (
          <Button color="" className="categoryAdd" type="button" onClick={this.props.toggle}><i className="fa fa-plus"></i> Add New</Button>
        );
      }

    };
    
    return (
      <MUIDataTable
        title={"Category"}
        data={rowsItem}        
        columns={columns}
        options={options}
      />
    );
  }
}

export default CategoryData;