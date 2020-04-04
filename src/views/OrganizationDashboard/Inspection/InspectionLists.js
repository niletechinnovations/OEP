import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import InProcessInspectionLists from './InProcessInspectionLists';
import CompletedInspectionLists from './CompletedInspectionLists';
import NotStartedInspectionLists from './NotStartedInspectionLists';
import './inspection.css'

class InspectionLists extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      visible: false,
      activeTab: '1'
    } 
    
  }
  // Fetch the organization List
  componentDidMount() { 
    
  }
  /*organization List API*/
  onDismiss = () => { this.setState({visible: false})}

  toggle = tab => {
    if(this.state.activeTab !== tab) this.setState({activeTab: tab});
  }

  render() {

    const { activeTab } = this.state;     
    return (
     <div className="tabs-info-card">
      
      <Nav tabs>
        <NavItem>
          <NavLink
            className={ activeTab === '1' ? "active" : "" }
            onClick={() => { this.toggle('1'); }}
          >
            Not Started Inspection
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={ activeTab === '2' ? "active" : "" }
            onClick={() => { this.toggle('2'); }}
          >
            Inprocess Inspection
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={ activeTab === '3' ? "active" : "" }
            onClick={() => { this.toggle('3'); }}
          >
            Completed Inspection
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
              <NotStartedInspectionLists history = { this.props.history}  />
        </TabPane>
        <TabPane tabId="2">
              <InProcessInspectionLists history = { this.props.history}  />
        </TabPane>
        <TabPane tabId="3">
              <CompletedInspectionLists history = { this.props.history}  />
        </TabPane>
      </TabContent>
    </div>

    )
  }
}


export default InspectionLists;
