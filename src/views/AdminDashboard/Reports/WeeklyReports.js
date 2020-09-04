import React, { Component } from 'react';
import { Bar, Line, HorizontalBar } from 'react-chartjs-2';
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
import './WeeklyReports.css';

const brandPrimary = getStyle('--primary')
/*const brandSuccess = getStyle('--success')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')*/
const brandInfo = getStyle('--info')


// Card Chart 1
const cardChartData1 = (labels = [], data = []) =>  {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Score',
        backgroundColor: '#c6a5a5',
        borderColor: 'rgba(255,255,255,.55)',
        data: data,
        fill: false
      },
    ],
  }
};

const cardChartOpts1 = (data = []) => {
 return {
    
  }
}


// Card Chart 2
const cardChartData2 = (labels = [], data = []) =>  {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Inspection',
        backgroundColor: '#c6a5a5',
        borderColor: 'rgba(255,255,255,.55)',
        data: data,
        fill: false
      },
    ],
  }
};

const cardChartOpts2 = (data = []) => {
 return {
    
  }
};


// BarCard Chart 2
const barChartData = (labels = [], data = [], labelName = '', backgroundColor = '#c6a5a5', borderColor = 'rgba(255,255,255,.55)') =>  {
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

const barChartOptions = (data = [], options = {xfontSize: 8, yfontSize: 8}) => {
 return {
    
  scales: {
    xAxes: [
      {
        
        ticks: {
          fontColor: "#000",
          fontSize: options.xfontSize
        },
      }
    ],yAxes: [
      {
        
        ticks: {
          fontColor: "#000",
          fontSize: options.yfontSize
        },
      }
    ],}

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
        fill: false
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
        fill: false
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
        fill: false
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



class WeeklyReports extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      loading: false,
      dashBoardStats: {organizationCount: 0, inspectionCount: 0},
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
      lastWeekTopStore: {labels: [], data: []},
      lastWeekLowestScore: {labels: [], data: []},
      monthlyInspection: {labels: [], data: []},
      inspectionGraphType : 'daily',
      inspectionGraphYear : '',
      top10StoreScore: {labels: [], data: []},
      top5FailedItemYearly: {labels: [], data: []},
      top5FailedItemLastWeek: {labels: [], data: []},
      top10OrganizationInspection: {labels: [], data: []},
      top10ScoreingByArea: {labels: [], data: []},
      totalInspectionConductedLastWeek: {labels: [], data: []},
    };
  }

  componentDidMount() { 
    
    this.getLast4WeekInspection();
    this.getLast4WeekScore();
    this.getLastHighestScoreStore();
    this.getLastLowestScoreStore();
    this.getTop10StoreScore();
    this.getTop5FailedItemYearly();
    this.getTop5FailedItemLastWeek();
    this.getTop10OrganizationInspection();
    this.getScoreingByArea();
    this.getInspectionConductedLastWeek();
    document.body.classList.add("weekly-graph-page");
  }
  
  componentWillUnmount() {
    document.body.classList.remove("weekly-graph-page");
  }

  getLast4WeekInspection(){
      commonService.getAPIWithAccessToken('reports/inspection-reports?period=week&duration=4')
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

  getLast4WeekScore() {
      commonService.getAPIWithAccessToken('reports/inspection-scores?period=week&duration=4')
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

  getLastHighestScoreStore(){
      commonService.getAPIWithAccessToken('reports/top-store-score?period=lastWeek')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        } 
        
        const responseData = res.data.data;  
        let lastWeekTopStore = this.state.lastWeekTopStore;
        lastWeekTopStore.labels =  responseData.labels;
        lastWeekTopStore.data =  responseData.data;
        this.setState({lastWeekTopStore: lastWeekTopStore});     
       
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

  getLastLowestScoreStore() {
      commonService.getAPIWithAccessToken('reports/top-store-score?period=lastWeek&orderBy=1')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        const responseData = res.data.data;
        let lastWeekLowestScore = this.state.lastWeekLowestScore;
        lastWeekLowestScore.labels =  responseData.labels;
        lastWeekLowestScore.data =  responseData.data;
        this.setState({lastWeekLowestScore: lastWeekLowestScore});    
       
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

  getTop10StoreScore(){
    commonService.getAPIWithAccessToken('reports/top-store-score?period=yearly&limit=10')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        const responseData = res.data.data;
        let top10StoreScore = this.state.top10StoreScore;
        top10StoreScore.labels =  responseData.labels;
        top10StoreScore.data =  responseData.data;
        this.setState({top10StoreScore: top10StoreScore});    
       
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

  getTop5FailedItemYearly() {
      commonService.getAPIWithAccessToken('reports/top-failed-item?period=yearly&limit=5')
      .then( res => {
        
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        const responseData = res.data.data;
        let top5FailedItemYearly = this.state.top5FailedItemYearly;
        top5FailedItemYearly.labels =  responseData.labels;
        top5FailedItemYearly.data =  responseData.data;
        this.setState({top5FailedItemYearly: top5FailedItemYearly});    
       
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

  getTop5FailedItemLastWeek(){
    commonService.getAPIWithAccessToken('reports/top-failed-item?period=week&limit=5')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        }   
        const responseData = res.data.data;
        let top5FailedItemLastWeek = this.state.top5FailedItemLastWeek;
        top5FailedItemLastWeek.labels =  responseData.labels;
        top5FailedItemLastWeek.data =  responseData.data;
        this.setState({top5FailedItemLastWeek: top5FailedItemLastWeek});    
       
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

  getTop10OrganizationInspection(){
      commonService.getAPIWithAccessToken('reports/inspection-by-organization?period=yearly&limit=10')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        } 
        
        const responseData = res.data.data;  
        let top10OrganizationInspection = this.state.top10OrganizationInspection;
        top10OrganizationInspection.labels =  responseData.labels;
        top10OrganizationInspection.data =  responseData.data;
        this.setState({top10OrganizationInspection: top10OrganizationInspection});     
       
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

  getScoreingByArea(){
      commonService.getAPIWithAccessToken('reports/score-by-area?period=yearly&limit=10')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        } 
        
        const responseData = res.data.data;  
        let top10ScoreingByArea = this.state.top10ScoreingByArea;
        top10ScoreingByArea.labels =  responseData.labels;
        top10ScoreingByArea.data =  responseData.data;
        this.setState({top10ScoreingByArea: top10ScoreingByArea});     
       
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

  getInspectionConductedLastWeek(){
      commonService.getAPIWithAccessToken('reports/inspection-reports?period=lastWeek')
      .then( res => {
        console.log(res);
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( {  loading: false } );
          toast.error(res.data.message);    
          return;
        } 
        
        const responseData = res.data.data;  
        let totalInspectionConductedLastWeek = this.state.totalInspectionConductedLastWeek;
        totalInspectionConductedLastWeek.labels =  responseData.labels;
        totalInspectionConductedLastWeek.data =  responseData.data;
        this.setState({totalInspectionConductedLastWeek: totalInspectionConductedLastWeek});     
       
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
        
        <div className="storewalk-H grey-bg">
          <p>Storewalks</p>
        </div>

        <Row>
          <Col xs="12" sm="6" lg="3">
            <h5>Weekly Storewalks Frequency (Last 4 Weeks)</h5>
            <Card className="text-white ">
              
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <Bar data={barChartData(this.state.totalConductedInspection.labels, this.state.totalConductedInspection.data,'Inspection','#ffc592', '#000')} options={barChartOptions(this.state.totalConductedInspection.data, {xfontSize: 8, yfontSize: 8})} height={200} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <h5>Weekly Storewalks Score (Last 4 Weeks)</h5>
            <Card className="text-white">
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <Bar data={barChartData(this.state.totalAverageSocre.labels, this.state.totalAverageSocre.data, 'Avg Score','#ffc592', '#000')} options={barChartOptions(this.state.totalAverageSocre.data, {xfontSize: 8, yfontSize: 8})} height={200} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <h5>5 Lowest Scoring Stores (Last Week)</h5>
            <Card className="text-white">
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <Bar data={barChartData(this.state.lastWeekLowestScore.labels, this.state.lastWeekLowestScore.data, 'Score', '#c10000', 'rgba(255,255,255,.55)')} options={barChartOptions(this.state.lastWeekLowestScore.data, {xfontSize: 8, yfontSize: 8})} height={200} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <h5>5 Highest Scoring Stores (Last Week)</h5>
            <Card className="text-white">
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <Bar data={barChartData(this.state.lastWeekTopStore.labels, this.state.lastWeekTopStore.data, 'Score', '#0070c1', 'rgba(255,255,255,.55)')} options={barChartOptions(this.state.lastWeekTopStore.data, {xfontSize: 8, yfontSize: 8})} height={200} />
              </div>
            </Card>
          </Col>
        </Row>

        <div className="storewalk-H light-blue-bg">
          <p>Area Performance</p>
        </div>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <h5>Top 5 Failed Items (YTD)</h5>
            <Card className="text-white light-blue-bd">
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <HorizontalBar data={barChartData(this.state.top5FailedItemYearly.labels, this.state.top5FailedItemYearly.data, 'Failed Item', '#5b7ca4', 'rgba(255,255,255,.55)')} options={barChartOptions(this.state.top5FailedItemYearly.data, {xfontSize: 8, yfontSize: 8})} height={200} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <h5>Top 5 Failed Items (Last Week)</h5>
            <Card className="text-white light-blue-bd">
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <HorizontalBar data={barChartData(this.state.top5FailedItemLastWeek.labels, this.state.top5FailedItemLastWeek.data, 'Failed Item', '#fe9129', 'rgba(255,255,255,.55)')} options={barChartOptions(this.state.top5FailedItemLastWeek.data, {xfontSize: 8, yfontSize: 8})} height={200} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <h5>Storewalks Scoring by Store Format (YTD)</h5>
            <Card className="text-white light-blue-bd">
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <HorizontalBar data={barChartData(this.state.top10StoreScore.labels, this.state.top10StoreScore.data, 'Score', '#4e81bd', 'rgba(255,255,255,.55)')} options={barChartOptions(this.state.top10StoreScore.data, {xfontSize: 8, yfontSize: 8})} height={200} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <h5>Storewalks Frequency by Managers (YTD)</h5>
            <Card className="text-white light-blue-bd">
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <HorizontalBar data={barChartData(this.state.top10OrganizationInspection.labels, this.state.top10OrganizationInspection.data, 'Frequency', '#d2c0ec', 'rgba(255,255,255,.55)')} options={barChartOptions(this.state.top10OrganizationInspection.data, {xfontSize: 8, yfontSize: 8})} height={200} />
              </div>
            </Card>
          </Col>
          </Row>

          <div className="storewalk-H light-orange-bg">
            <p>Failed Items</p>
          </div>
          <Row>
          <Col xs="12" sm="6" lg="3">
            <h5>Storewalks Scoring by Area (YTD)</h5>
            <Card className="text-white light-orange-bd">
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <HorizontalBar data={barChartData(this.state.top10ScoreingByArea.labels, this.state.top10ScoreingByArea.data, 'Score', '#fdaa66', 'rgba(255,255,255,.55)')} options={barChartOptions(this.state.top10ScoreingByArea.data, {xfontSize: 8, yfontSize: 8})} height={200} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <h5>All Storewalks Conducted (Last Week)</h5>
            <Card className="text-white light-orange-bd">
              <div className="chart-wrapper mx-3" style={{ height: '150px' }}>
                <Bar data={barChartData(this.state.totalInspectionConductedLastWeek.labels, this.state.totalInspectionConductedLastWeek.data, 'Inspection', '#6b94c9', 'rgba(255,255,255,.55)')} options={barChartOptions(this.state.totalInspectionConductedLastWeek.data, {xfontSize: 8, yfontSize: 8})} height={200} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WeeklyReports;
