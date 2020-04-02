import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import commonFunction from '../../../core/functions/commonFunction';

class PaymentHistoryData extends Component {
  
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
        createdAt: commonFunction.getDate(subscriberInfo.createdAt  || " "),
        subscriberId: subscriberInfo.transactionProfileId || " ",
        status: subscriberInfo.statusLabel,   
        paymentMethod: subscriberInfo.paymentMethod || "PayPal",
        action: "",       
      } 
      if(subscriberInfo.organizationName)     
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
        label: 'Payment Method',
        name: 'paymentMethod',
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
        label: 'Payment Date',
        name: 'createdAt',
      },
      {
        label: 'Status',
        name: 'status'
      }
    ];
    const options = {
      search: true,
      filter: false,
      searchOpen: false,
      print: false,
      download: true,
      responsive: 'stacked',
      selectableRows: 'none',
      textLabels: {
        body: {
          noMatch: this.props.dataTableLoadingStatus ? "Processing........" : "No Records Found",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
      },
      fixedHeaderOptions: { xAxis: false, yAxis: false }

    };
    
    return (
      <MUIDataTable
        title={"Payment History"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default PaymentHistoryData;