import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput } from 'mdbreact';
import SideNavigation from "../sideNavigation";
//import BreadcrumSection from '../sections/BreadcrumSection';
import AgentTableSection from './AgentData';

class agentLists extends Component {
  state = {
    modal: false,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    company_name: ""
  }
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
      
      return (
        <React.Fragment>
          <SideNavigation  />
          <main className="dashboard-content">
            <MDBContainer>
              <MDBRow className="mb-12">
                <MDBCol md="6">
                  <h2 className="section-heading mb-4">List of Agents</h2>
                </MDBCol>
                <MDBCol md="6">
                  <div className="text-right">
                    <MDBBtn size="sm" color="primary" className="px-2" onClick={this.toggle}>
                      <i className="fa fa-plus mt-0"></i> Add new agent
                    </MDBBtn>
                    <MDBBtn size="sm" color="purple" className="px-2">
                      <i className="fa fa-download mt-0"></i> Export
                    </MDBBtn>
                  </div>
                </MDBCol> 
                <MDBCol md="12">
                  <AgentTableSection />
                </MDBCol>
            </MDBRow>
          </MDBContainer>

          <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" className="cascading-modal">
            <form className="needs-validation" onSubmit={this.submitHandler} noValidate >
              <MDBModalHeader toggle={this.toggle} className="light-blue white-text">Create new agent</MDBModalHeader>
              <MDBModalBody>
              
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput value={this.state.first_name} name="first_name" onChange={this.changeHandler} type="text" id="first_name" label="First name" required ></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.last_name} name="last_name" onChange={this.changeHandler} type="text" id="last_name" label="Last name" required ></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.email} name="email" onChange={this.changeHandler} type="email" id="email" label="Email address" required ></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput name="email" onChange={this.changeHandler} type="password" id="password" label="Password" required ></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.company_name} name="company_name" onChange={this.changeHandler} type="text" id="company_name" label="Marriage beuro name" required >
                    </MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <span>&nbsp;</span>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="uploadLogo">
                          Upload
                        </span>
                      </div>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="beuroLogo" aria-describedby="uploadLogo" />
                        <label className="custom-file-label" htmlFor="beuroLogo">
                          your beuro logo
                        </label>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.phone} name="phone" onChange={this.changeHandler} type="text" id="phone" label="Phone number"></MDBInput>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput value={this.state.address} name="address" onChange={this.changeHandler} type="text" id="address" label="Address"></MDBInput>
                  </MDBCol>
                  
                </MDBRow>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>Cancel</MDBBtn>
                <MDBBtn color="primary" type="submit">Create Agent</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModal>

        </main>
      </React.Fragment>
    )
  }
}

export default agentLists;