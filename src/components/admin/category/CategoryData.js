import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBDataTable, MDBIcon } from 'mdbreact';


  
  
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
    let rowsItem = [];
    let indexCount = 0;
    for(const [i, cat] of this.props.data.entries()){
      let catInfo = {
        name: cat.categoryName,        
        action: <p><a disabled={this.state.buttonProcessing} onClick={() => 
          this.editCategoryItem(i)}><MDBIcon icon="edit"></MDBIcon> </a>
          <a disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteCategoryItem(i)}><MDBIcon icon="trash"></MDBIcon></a></p>,       
      }      
      rowsItem.push(catInfo);
    }    
    this.setState({dataTableItem: rowsItem});
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
    let data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {

          label: "Action",

          field: "action"

        }
      ],
      rows: this.state.dataTableItem
    };
    let rowsItem = [];
    let indexCount = 0;
    for(const [i, cat] of this.props.data.entries()){
      let catInfo = {
        name: cat.categoryName,        
        action: <p><a disabled={this.state.buttonProcessing} onClick={() => 
          this.editCategoryItem(i)}><MDBIcon icon="edit"></MDBIcon> </a>
          <a disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteCategoryItem(i)}><MDBIcon icon="trash"></MDBIcon></a></p>,       
      }      
      rowsItem.push(catInfo);
    }
    data.rows = rowsItem;
    return (
      <MDBCard narrow>
      <MDBCardBody cascade>

        <MDBDataTable
          striped
          bordered
          hover
          data={data}
        />
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default CategoryData;