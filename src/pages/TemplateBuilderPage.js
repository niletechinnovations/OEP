import React from "react";
import { MDBContainer } from "mdbreact";
import {ReactFormBuilder} from "./../components/form-builder/reactFormBuilder";
//import "./../assets/css/bootstrap.min.css";
import "./../assets/css/font-awesome.min.css";
import "react-form-builder2/dist/app.css";

class TemplateBuilderPage extends React.Component {
  render() {
    return (
      <>
      <div id="templateBuilderPage" className="my-5 pt-5">
        <MDBContainer>
          <ReactFormBuilder></ReactFormBuilder>         
        </MDBContainer>
      </div>  
      </>
    );
  }
}

export default TemplateBuilderPage;
