import React, { Component } from 'react';
import { Table } from 'reactstrap';
function SubCategoryRow(props) {
  const SubCategory = props.SubCategory;

  const getStatus = (status) => {
    return status === true ? 'Active' : 'Inactive'
  }  
  return (
    <tr>      
      <td>{SubCategory.name}</td>
      <td>{SubCategory.parentCategory}</td>
      <td>{getStatus(SubCategory.status)}</td>
      <td>{SubCategory.action}</td>
    </tr>
  )
} 
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
      let catInfo = {
        name: cat.subCategoryName,
        parentCategory: cat.categoryName,
        status: cat.status || true ,       
        action: <p><a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.editSubCategoryItem(i)}><i className="fa fa-pencil"></i> </a>
          <a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteSubCategoryItem(i)}><i className="fa fa-trash"></i></a></p>,       
      }      
      rowsItem.push(catInfo);
    }    
   
    return (
      <Table responsive hover>
        <thead>
          <tr>            
            <th scope="col">Name</th> 
            <th scope="col">Parent Category</th>            
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rowsItem.map((SubCategory, index) =>
            <SubCategoryRow key={index} SubCategory={SubCategory}/>
          )}
        </tbody>
      </Table>
    );
  }
}

export default SubCategoryData;