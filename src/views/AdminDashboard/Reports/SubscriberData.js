import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import commonFunction from '../../../core/functions/commonFunction';
const getStatusInfo = function(subscriberInfo) {
  let currentDate = new Date();
  if(subscriberInfo.status){
    let expiryDate = new Date(subscriberInfo.endDate);
    if(expiryDate.getTime() >= currentDate.getTime())
      return "Active";
    else
      return "Inactive";
  }
  else if(subscriberInfo.cancelDate)
    return "Cancelled";
  else
    return "Inactive";
  
}
class SubscriberData extends Component {
  
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
    for(const [i, subscriberInfo] of this.props.data.entries()){
      console.log(i);
      let orgInfo = {   
        organizationName: subscriberInfo.organizationName || " ",      
        planName: subscriberInfo.planName || " ",
        amount: subscriberInfo.amount || " ",
        startDate: commonFunction.getDate(subscriberInfo.startDate || " "),
        endDate: commonFunction.getDate(subscriberInfo.endDate  || " "),
        subscriberId: subscriberInfo.subscriberId || " ",
        status: getStatusInfo(subscriberInfo),   
        action: "",       
      }      
      rowsItem.push(orgInfo);
    }      
    
    const columns = [          
      {
        label: 'Organization Name',
        name: 'organizationName',
      },
      
      {
        label: 'Plan Name',
        name: 'planName',
      },
      {
        label: 'Subscription Id',
        name: 'subscriberId',
      },
      {
        label: 'Amount',
        name: 'amount',
      },
      {
        label: 'Start Date',
        name: 'startDate',
      },
      {
        label: 'Expiry Date',
        name: 'endDate',
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
          noMatch: this.props.dataTableLoadingStatus ? "Processing........" : "Sorry, no matching records found",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
      },
      fixedHeaderOptions: { xAxis: false, yAxis: false }

    };
    
    return (
      <MUIDataTable
        title={"Subscriber List"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default SubscriberData;