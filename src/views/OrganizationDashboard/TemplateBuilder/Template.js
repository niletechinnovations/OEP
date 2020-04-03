import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import DefaultTemplate from './DefaultTemplate';
import CustomTemplate from './CustomTemplate';
import UploadedTemplate from './UploadedTemplate';
import './Template.css'

class SetUpPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      activeTab: '1'
    } 
    
  }
  componentDidMount() { 
    //this.userList();
  }


  toggle = tab => {
    if(this.state.activeTab !== tab) this.setState({activeTab: tab});
  }  

  render() {

    const { activeTab } = this.state;     
    return (
     <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={ activeTab === '1' ? "active" : "" }
            onClick={() => { this.toggle('1'); }}
          >
            Default Template
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={ activeTab === '2' ? "active" : "" }
            onClick={() => { this.toggle('2'); }}
          >
            Custom Template
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={ activeTab === '3' ? "active" : "" }
            onClick={() => { this.toggle('3'); }}
          >
            Uploaded Template
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <DefaultTemplate history = { this.props.history} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <CustomTemplate history = { this.props.history} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <UploadedTemplate history = { this.props.history} />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>

    )
  }
}

export default SetUpPage;
