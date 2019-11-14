import React, { Component } from 'react';
import { Table } from 'reactstrap';
function CategoryRow(props) {
  const category = props.category;

  const getStatus = (status) => {
    return status === true ? 'Active' : 'Inactive'
  }  
  return (
    <tr>      
      <td>{category.name}</td>
      <td>{getStatus(category.status)}</td>
      <td>{category.action}</td>
    </tr>
  )
} 
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
    
    let rowsItem = [];    
    for(const [i, cat] of this.props.data.entries()){
      let catInfo = {
        name: cat.categoryName,
        status: cat.status || true ,       
        action: <p><a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.editCategoryItem(i)}><i className="fa fa-pencil"></i> </a>
          <a href="#!" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteCategoryItem(i)}><i className="fa fa-trash"></i></a></p>,       
      }      
      rowsItem.push(catInfo);
    }
    
    debugger;
    return (
      <Table responsive hover>
        <thead>
          <tr>            
            <th scope="col">Name</th>            
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rowsItem.map((category, index) =>
            <CategoryRow key={index} category={category}/>
          )}
        </tbody>
      </Table>
    );
  }
}

export default CategoryData;