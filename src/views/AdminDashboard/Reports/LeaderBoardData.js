import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

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
    for(const [i, leaderBoardInfo] of this.props.data.entries()){
      console.log(i);
      let orgInfo = {   
        organizationName: leaderBoardInfo.organizationName || " ",      
        storeName: leaderBoardInfo.storeName || " ",
        score: leaderBoardInfo.score || " ",
        rank: leaderBoardInfo.rank || " ",
        globalRank: leaderBoardInfo.globalRank || " ",
        date: leaderBoardInfo.date || " ",
        address: leaderBoardInfo.storeInfo !== null && leaderBoardInfo.storeInfo !== undefined  ? `${leaderBoardInfo.storeInfo.address} ${leaderBoardInfo.storeInfo.city || ""} ${leaderBoardInfo.storeInfo.state || ""}` : " "
      }  
      if(leaderBoardInfo.storeName && leaderBoardInfo.organizationName)        
        rowsItem.push(orgInfo);
    }      
    
    const columns = [          
      {
        label: 'Organization Name',
        name: 'organizationName',
      },
      
      {
        label: 'Store Name',
        name: 'storeName',
      },
      {
        label: 'Address',
        name: 'address',
      },
      {
        label: 'Global Rank',
        name: 'globalRank',
      },
      {
        label: 'Rank',
        name: 'rank',
      },
      {
        label: 'Generated Date',
        name: 'date',
      },
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
        title={"Leaderboard"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default SubscriberData;