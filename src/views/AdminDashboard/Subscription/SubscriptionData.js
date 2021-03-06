import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

/*const getPlanType = (planType) => {
    if(planType === 1)
      return 'Monthly';
    else if(planType === 2)
      return 'Quaterly';
    if(planType === 3)
      return 'Half Yearly';
    if(planType === 4)
      return 'Yearly';
}*/
class SubscriptionData extends Component {
  
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
  /* Edit Store Info */
  editSubscriptionItem(rowIndex){    
    this.props.editSubscriptionAction(rowIndex);
  }

  deleteSubscriptionItem(rowIndex){    
    this.props.deleteSubscriptionAction(rowIndex);
  }

  render() {
    
    let rowsItem = [];
    for(const [i, plan] of this.props.data.entries()){
      console.log(i);
      let planVariation = plan.planVariation;
      let orgInfo = {   
        planId: plan.planId,      
        planName: plan.planName,        
        amount: `$${planVariation[0].amount} / $${planVariation[1].amount}`,
        duration: 'Monthly / Yearly',
        userAccess: plan.userAccess || " ",      
        templateAccess: plan.templateAccess || " ",
        status: plan.status ? 'Active' : 'Inactive',   
        action: "",       
      }      
      rowsItem.push(orgInfo);
    }      
    
    const columns = [ 
      {
        label: 'Plan Name',
        name: 'planName',
      },     
      {
        label: 'Amount',
        name: 'amount',
      },
      
      {
        label: 'Plan Type',
        name: 'duration',
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
               <p><button className="btn-edit" title="Edit Plan" disabled={this.state.buttonProcessing} onClick={() => 
                this.editSubscriptionItem(i)}><i className="fa fa-pencil"></i> </button>
                </p>
            );
          },
        }
      },
    ];
    const options = {
      search: true,viewColumns: false,
      filter: false,
      searchOpen: false,
      print: false,
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
      fixedHeaderOptions: { xAxis: false, yAxis: false }

    };
    
    return (
      <MUIDataTable
        title={"Subscription Plan List"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default SubscriptionData;