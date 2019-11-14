import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
function TemplateRow(props) {
  const templateInfo = props.templateInfo;

  const getStatus = (status) => {
    return status === true ? 'Active' : 'Inactive'
  }  
  return (
    <tr>      
      <td>{templateInfo.templateName}</td>
      <td>{templateInfo.categoryName}</td>
      <td>{templateInfo.subCategoryName}</td>
      <td>{templateInfo.type === 'free' ? 'Default' : 'Paid'}</td>
      <td>{getStatus(templateInfo.status || true)}</td>
      <td><Link to={`/admin/create-template/${templateInfo.templateId}`}><i className="fa fa-eye"></i> </Link></td>
    </tr>
  )
} 
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
    
    let rowsItem = this.props.data || []; 

    return (
      <Table responsive hover>
        <thead>
          <tr>            
            <th scope="col">Template Name</th>
            <th scope="col">Category Name</th>
            <th scope="col">Subcategory Name</th>   
            <th scope="col">Template Type</th>            
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rowsItem.map((templateInfo, index) =>
            <TemplateRow key={index} templateInfo={templateInfo}/>
          )}
        </tbody>
      </Table>
    );
  }
}

export default TemplateData;