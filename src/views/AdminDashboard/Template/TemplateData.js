import React, { Component } from 'react';
import { Table } from 'reactstrap';
function TemplateRow(props) {
  const templateInfo = props.templateInfo;

  const getStatus = (status) => {
    return status === true ? 'Active' : 'Inactive'
  }  
  return (
    <tr>      
      <td>{templateInfo.userName}</td>
      <td>{templateInfo.categoryName}</td>
      <td>{templateInfo.caption}</td>
      <td>{getStatus(templateInfo.status || true)}</td>
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
            <th scope="col">User Name</th>
            <th scope="col">Category Name</th>
            <th scope="col">Caption</th>           
            <th scope="col">Status</th>
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