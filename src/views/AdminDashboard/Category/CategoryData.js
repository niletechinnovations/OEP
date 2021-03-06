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
        label: 'Image',
        name: 'image',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
             <p className="imagePreview"><img src={value} alt="" /></p>
            );
          },
        }
      },
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
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            let i = tableMeta.rowIndex;
           
            return (
             <p><button className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
              this.editCategoryItem(i)}><i className="fa fa-pencil"></i> </button>
              <button className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => 
              this.deleteCategoryItem(i)}><i className="fa fa-trash"></i></button></p>
            );
          },
        }
      },
    ];

    let rowsItem = [];    
    for(const [i, cat] of this.props.data.entries()){
      console.log(i);
      let catInfo = {
        name: cat.categoryName,
        image: cat.imagUrl,
        status: cat.status ? "Active" : "Inactive" ,       
        action: "",       
      }      
      rowsItem.push(catInfo);
    }
    const options = {
      search: true,
      filter: false,
      searchOpen: false,
      print: false,
      viewColumns: false,
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
      fixedHeaderOptions: { xAxis: false, yAxis: false },
       customToolbar: () => {
        return (
          <Button color="" className="categoryAdd" type="button" onClick={this.props.toggle}><i className="fa fa-plus"></i> Add Category</Button>
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