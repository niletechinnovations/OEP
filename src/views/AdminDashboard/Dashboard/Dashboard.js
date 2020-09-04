import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
/*import {
  Badge,
  Button,
  
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
} from 'reactstrap';*/
import {
  Card,
  CardBody,
  CardTitle,
  Col,  
  Row,
  FormGroup,
  Input
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import './Dashboard.css';

const brandPrimary = getStyle('--primary')
/*const brandSuccess = getStyle('--success')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')*/
const brandInfo = getStyle('--info')


// Card Chart 1
const lineChartData = (labels = [], data = [], labelName = '', fill = false, backgroundColor = 'rgba(255,255,255,.55)', borderColor = brandPrimary) =>  {
  return {
    labels: labels,
    datasets: [
      {
        label: labelName,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        fill: fill,
        data: data,
      },
    ],
  }
};

const lineChartOptions = (data = []) => {
 return {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },

        }],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, data) - 5,
            max: Math.max.apply(Math, data) + 5,
          },
        }],
    },
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    }
  }
}


// Card Chart 1
const cardChartData1 = (labels = [], data = []) =>  {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Score',
        backgroundColor: 'rgba(255,255,255,.55)',
        borderColor: brandPrimary,
        data: data,
      },
    ],
  }
};

const cardChartOpts1 = (data = []) => {
 return {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },

        }],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, data) - 5,
            max: Math.max.apply(Math, data) + 5,
          },
        }],
    },
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    }
  }
}


// Card Chart 2
const cardChartData2 = (labels = [], data = []) =>  {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Inspection Conducted',
        backgroundColor: brandInfo,
        borderColor: 'rgba(255,255,255,.55)',
        data: data,
      },
    ],
  }
};

const cardChartOpts2 = (data = []) => {
 return {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },

        }],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, data) - 5,
            max: Math.max.apply(Math, data) + 5,
          },
        }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  }
};

// Card Chart 3
const cardChartData3 = (labels = [], data = []) =>  {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Unique Inspection',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: data,
      },
    ],
  };
}

const cardChartOpts3 = (data = []) => {
 return {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
        }],
      yAxes: [
        {
          display: false,
        }],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };
}

// Card Chart 4
const cardChartData4 =  (labels = [], data = []) =>  {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Failed Item',
        backgroundColor: 'rgba(255,255,255,.3)',
        borderColor: 'transparent',

        data: data,
      },
    ],
  };
}
/*const cardChartData14 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'Data',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98,78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
      backgroundColor: 'rgba(99, 154, 255, 0.73)',
    },
  ],
};*/

const cardChartData14 = (labels = [], data = []) =>  {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Inspection',
        backgroundColor: 'rgba(99, 154, 255, 0.73)',
        fill: false,
        data: data,
      },
      
    ],
  }
};
const cardChartOpts14 = {
 
};

const cardChartOpts4  = (data = []) => {
 return {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
          barPercentage: 0.6,
        }],
      yAxes: [
        {
          display: false,
        }],
    },
  };
}


// BarCard Chart 2
const barChartData = (labels = [], data = [], labelName = '', backgroundColor = 'green', borderColor = 'rgba(255,255,255,.55)') =>  {
  return {
    labels: labels,
    datasets: [
      {
        label: labelName,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        data: data,
        fill: false
      },
    ],
  }
};

const barChartOptions = (data = [], options = {}) => {
 return {
    
  }
};





// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}



class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      loading: false,
      dashBoardStats: {totalInspection: 0, avegareSocre: 0, totalFailedItem: 0},
      inspectionLabels: [],
      inspectionData: [],
      organizationLables: [],
      organizationData: [],
      totalStoreWalk: 0,
      storeWalkLables: [],
      storeWalkData: [],
      totalActiveSubscriber: 0,
      subscriberGraphData: [],
      subscriberGraphLables: [],
      conductedInspection: {labels: [], data: []},
      totalConductedInspection: {labels: [], data: []},
      totalAverageSocre: {labels: [], data: []},
      totalUniqueInspections: {labels: [], data: []},
      totalFailedItems: {labels: [], data: []},
      monthlyInspection: {labels: [], data: []},
      inspectionGraphType : 'daily',
      inspectionGraphYear : '',
      monthlyPerformance: {labels: [], data: []},
      performanceGraphType : 'weekly',
      performanceGraphYear : ''
    };
  }

  componentDidMount() { 
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('reports/overall-count')
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }   
          const responseData = res.data.data;
         
          this.setState({loading:false, dashBoardStats: res.data.data} )
        })
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else {
            this.setState( { loading: false } );
            toast.error(err.message);    
          }
        } )
    } )

    /*this.getConductedGraph();
    this.storeWalkGraph();
    this.subscriptionGraph();*/
    this.getInspectionConductedGraph();
    this.getInspectionAverageScoreGraph();
    this.getInspectionFailedItemGraph();
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    this.setState({inspectionGraphYear: year, performanceGraphYear: year})
    this.getMonthlyInspection(year, 'daily');
    this.getMonthlyPerformance(year, 'weekly');
    /*this.getWeeklyInspection(year);
    this.getDailyInspection(year);*/
  }

  getInspectionConductedGraph(){
      commonService.getAPIWithAccessToken('reports/inspection-reports?period=overall&duration=8')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        } 
       
        const responseData = res.data.data;  
        let totalConductedInspection = this.state.totalConductedInspection;
        totalConductedInspection.labels =  responseData.labels;
        totalConductedInspection.data =  responseData.data;
        this.setState({totalConductedInspection: totalConductedInspection});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState( { loading: false } );
          toast.error(err.message);    
        }
      } )
  }

  getInspectionAverageScoreGraph() {
      commonService.getAPIWithAccessToken('reports/inspection-scores?period=overall&duration=8')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        const responseData = res.data.data;
        let totalAverageSocre = this.state.totalAverageSocre;
        totalAverageSocre.labels =  responseData.labels;
        totalAverageSocre.data =  responseData.data;
        this.setState({totalAverageSocre: totalAverageSocre});    
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState( { loading: false } );
          toast.error(err.message);    
        }
      } )
  }
  getInspectionFailedItemGraph() {
      commonService.getAPIWithAccessToken('reports/inspection-failed-item?period=overall&duration=8')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        const responseData = res.data.data;
        let totalFailedItems = this.state.totalFailedItems;
        totalFailedItems.labels =  responseData.labels;
        totalFailedItems.data =  responseData.data;
        this.setState({totalFailedItems: totalFailedItems});    
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState( { loading: false } );
          toast.error(err.message);    
        }
      } )
  }
  /*Get Monthly Inspection*/
  getMonthlyInspection(year, type){
    
      let queryString = "&period="+type;
      commonService.getAPIWithAccessToken('reports/inspection-reports?years='+parseInt(year)+queryString)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        } 
        
        const responseData = res.data.data;  
        let monthlyInspection = this.state.monthlyInspection;
        monthlyInspection.labels =  responseData.labels;
        monthlyInspection.data =  responseData.data;
        this.setState({monthlyInspection: monthlyInspection});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState( { loading: false } );
          toast.error(err.message);    
        }
      } )
  }

  /*Get Monthly Performance*/
  getMonthlyPerformance(year, type){
    
      let queryString = "&period="+type;
      commonService.getAPIWithAccessToken('reports/inspection-scores?years='+parseInt(year)+queryString)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        } 
        
        const responseData = res.data.data;  
        let monthlyPerformance = this.state.monthlyPerformance;
        monthlyPerformance.labels =  responseData.labels;
        monthlyPerformance.data =  responseData.data;
        this.setState({monthlyPerformance: monthlyPerformance});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState( { loading: false } );
          toast.error(err.message);    
        }
      } )
  }
  /*Get Wekkly Inspection*/
  getWeeklyInspection(year){

      commonService.getAPIWithAccessToken('reports/inspection-reports?period=weekly&year='+year)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        } 
        
        const responseData = res.data.data;  
        let weeklyInspection = this.state.weeklyInspection;
        weeklyInspection.labels =  responseData.labels;
        weeklyInspection.data =  responseData.data;
        this.setState({weeklyInspection: weeklyInspection});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState( { loading: false } );
          toast.error(err.message);    
        }
      } )
  }
  /*Get Daily Inspection*/
  getDailyInspection(year){

      commonService.getAPIWithAccessToken('reports/inspection-reports?period=daily&year='+year)
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        } 
        
        const responseData = res.data.data;  
        let daily = this.state.daily;
        daily.labels =  responseData.labels;
        daily.data =  responseData.data;
        this.setState({daily: daily});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState( { loading: false } );
          toast.error(err.message);    
        }
      } )
  }
  getConductedGraph() {
    commonService.getAPIWithAccessToken('dashboard/conducted-inspection')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        const responseData = res.data.data;
        let conductedInspection = this.state.conductedInspection;
        conductedInspection.labels =  responseData.inspectionConducted.labels;
        conductedInspection.data =  responseData.inspectionConducted.data;
        this.setState({conductedInspection: conductedInspection});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState( { loading: false } );
          toast.error(err.message);    
        }
      } )
  }

  storeWalkGraph() {
    commonService.getAPIWithAccessToken('dashboard/store-walk-graph')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        const responseData = res.data.data;
        
        this.setState({totalStoreWalk: responseData.totalConductedInspection, storeWalkData: responseData.storeWalkStats.data, storeWalkLables: responseData.storeWalkStats.labels});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState( { loading: false } );
          toast.error(err.message);    
        }
      } )
  }

  subscriptionGraph() {
    commonService.getAPIWithAccessToken('dashboard/subscription-graph')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        const responseData = res.data.data;
        
        this.setState({totalActiveSubscriber: responseData.totalActiveSubscriber, subscriberGraphData: responseData.subscriptionData.data, subscriberGraphLables: responseData.subscriptionData.labels});     
       
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState( { loading: false } );
          toast.error(err.message);    
        }
      } )
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    let minOffset = 0, maxOffset = 10;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for(let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }

    const yearList = allYears.map((x) => {return(<option key={x}>{x}</option>)});

    return (
      <div className="animated fadeIn">
        

        <Row>
          <Col xs="12" sm="6" lg="6">
            <Card className=" ">
              <CardBody className="pb-0">
                
                
                <div>Total Inspections</div>
                <div className="text-value">{this.state.dashBoardStats.totalInspection}</div>
              </CardBody>
              
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <Line data={lineChartData(this.state.totalConductedInspection.labels, this.state.totalConductedInspection.data, 'Inspections', true, '#d1eecf', '#23ab20')} options={lineChartOptions(this.state.totalConductedInspection.data)} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="6">
            <Card className=" ">
              <CardBody className="pb-0">
                
                
                <div>Average Score</div>
                <div className="text-value">{this.state.dashBoardStats.avegareSocre}%</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <Line data={lineChartData(this.state.totalAverageSocre.labels, this.state.totalAverageSocre.data, 'Average Score', true, '#d3ecf6', '#2b9fd7')} options={lineChartOptions(this.state.totalAverageSocre.data)} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="6">
            <Card className=" ">
              <CardBody className="pb-0">
                
                
                <div>Total Unique Inspection</div>
                <div className="text-value">0</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <Line data={lineChartData(this.state.totalConductedInspection.labels, this.state.totalConductedInspection.data, 'Unique Inspection', true, '#fce6d5', '#f57e3a')} options={lineChartOptions(this.state.totalConductedInspection.data)} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="6">
            <Card className=" ">
              <CardBody className="pb-0">
                
                
                <div>Total Failed Items</div>
                <div className="text-value">{this.state.dashBoardStats.totalFailedItem}</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <Line data={lineChartData(this.state.totalFailedItems.labels, this.state.totalFailedItems.data, 'Failed Item', true, '#fadede', '#ea595c')} options={lineChartOptions(this.state.totalFailedItems.data)} height={70} />
              </div>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col>
            <Card className="">
              <CardBody>
                <div className="d-sm-flex align-items-center justify-content-between ">
                  <CardTitle className="mb-0 h4">Inspections Conducted</CardTitle>
                  
                  <div className="chart-options">
                        <div className="filter">
                            <FormGroup className="mr-2">
                              <label>Year</label>
                              <Input type = "select" value = {this.state.inspectionGraphYear} onChange = {(event) => {
                                
                                this.setState({inspectionGraphYear: event.target.value});
                                this.getMonthlyInspection(event.target.value, this.state.inspectionGraphType);
                              }} >
                                {yearList}
                              </Input>
                            </FormGroup>
                            <FormGroup className="mr-2">
                              <label>Graph Type</label>
                              <Input type = "select" value = {this.state.inspectionGraphType} onChange = {(event) => {
                                this.setState({inspectionGraphType: event.target.value});
                                this.getMonthlyInspection(this.state.inspectionGraphYear, event.target.value);
                              }} >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                              </Input>
                            </FormGroup>
                            <FormGroup className="">
                            
                            
                            <div className="d-flex"> 
                              <div className="mr-2">
                                <label></label> 
                                <div className="form-control mt-2">
                                  <i class="fa fa-bar-chart" aria-hidden="true"></i>
                                </div>
                              </div>
                              <div>
                                <label></label>
                                <div className="form-control mt-2">
                                  <i class="fa fa-line-chart"></i>
                                </div>
                              </div>
                              <div className="ml-2">
                                <label>Export</label>
                                <div className="mr-2">
                                  <Input type = "select" value = {this.state.inspectionGraphType} onChange = {(event) => {
                                    this.setState({inspectionGraphType: event.target.value});
                                    this.getMonthlyInspection(this.state.inspectionGraphYear, event.target.value);
                                  }} >
                                    <option value="daily">XLSX</option>
                                    <option value="weekly">CSV</option>
                                    <option value="monthly">JSON</option>
                                  </Input>
                                </div>
                              </div>
                            </div>
                            </FormGroup>
                            
                        </div>
                    </div>
                </div>
                
                <div className="chart-wrapper" >
                  <Line data={cardChartData14(this.state.monthlyInspection.labels, this.state.monthlyInspection.data)} options={cardChartOpts14}  />
                </div>
              </CardBody>              
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="">
              <CardBody>
               
                 
                  <div className="d-sm-flex align-items-center justify-content-between ">
                  <CardTitle className="mb-0 h4">Performance</CardTitle>
                  
                  <div className="chart-options">
                        <div className="filter">
                            <FormGroup className="mr-2">
                              <label>Year</label>
                              <Input type = "select" value = {this.state.inspectionGraphYear} onChange = {(event) => {
                                
                                this.setState({inspectionGraphYear: event.target.value});
                                this.getMonthlyInspection(event.target.value, this.state.inspectionGraphType);
                              }} >
                                {yearList}
                              </Input>
                            </FormGroup>
                            <FormGroup className="mr-2">
                              <label>Graph Type</label>
                              <Input type = "select" value = {this.state.inspectionGraphType} onChange = {(event) => {
                                this.setState({inspectionGraphType: event.target.value});
                                this.getMonthlyInspection(this.state.inspectionGraphYear, event.target.value);
                              }} >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                              </Input>
                            </FormGroup>
                            <FormGroup className="">
                            
                            
                            <div className="d-flex"> 
                              <div className="mr-2">
                                <label></label> 
                                <div className="form-control mt-2">
                                  <i class="fa fa-bar-chart" aria-hidden="true"></i>
                                </div>
                              </div>
                              <div>
                                <label></label>
                                <div className="form-control mt-2">
                                  <i class="fa fa-line-chart"></i>
                                </div>
                              </div>
                              <div className="ml-2">
                                <label>Export</label>
                                <div className="mr-2">
                                  <Input type = "select" value = {this.state.inspectionGraphType} onChange = {(event) => {
                                    this.setState({inspectionGraphType: event.target.value});
                                    this.getMonthlyInspection(this.state.inspectionGraphYear, event.target.value);
                                  }} >
                                    <option value="daily">XLSX</option>
                                    <option value="weekly">CSV</option>
                                    <option value="monthly">JSON</option>
                                  </Input>
                                </div>
                              </div>
                            </div>
                            </FormGroup>
                            
                        </div>
                    </div>
                </div>
                <div className="chart-wrapper" > 
                  <Bar data={barChartData(this.state.monthlyPerformance.labels, this.state.monthlyPerformance.data)} options={barChartOptions(this.state.monthlyPerformance.data)}  />
                </div>
              </CardBody>              
            </Card>
          </Col>
        </Row>
        

        
        
      </div>
    );
  }
}

export default Dashboard;
