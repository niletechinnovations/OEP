import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

  
  
class InspectionFeedBackData extends Component {
  
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
    const inspectionInfo = this.props.inspectionInfo;
    for(const [i, feedback] of this.props.data.entries()){
      
      let feedbackInfo = {
        inspectionName: inspectionInfo.inspectionName,
        organizationName: inspectionInfo.organizationName,  
        employeeName: inspectionInfo.employeeFirstName+" "+inspectionInfo.employeeLastName,
        score: `${feedback.score * 100}%`,
        failedItem: feedback.wrongQuestion,
        templateName: inspectionInfo.templateName || " ",
        date: feedback.createdAt || " ",
        action: <p><Link to={`/admin/inspection/feedback/${feedback._id}`} className="btn-view" disabled={this.state.buttonProcessing} ><i className="fa fa-eye"></i> </Link>
          <a href="#!" className="btn-delete" disabled={this.state.buttonProcessing}><i className="fa fa-trash"></i></a></p>,       
      }      
      rowsItem.push(feedbackInfo);
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
        label: 'Score',
        name: 'score',
      },
      {
        label: 'Failed Item',
        name: 'failedItem',
      },
      {
        label: 'Date',
        name: 'date',
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
        title={"Inspection Feedback"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default InspectionFeedBackData;