import React from "react";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";

class AboutPage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);
  render() {
    return (
      <>
        
          <div className="main-content"> 
            <section className="my-5 mt-5">
              <MDBContainer>
                <MDBRow>
                    <MDBCol md="12">
                        <h2 className="h2-responsive font-weight-bold mt-5 mb-4">
                        About Us
                        </h2>
                        <p className="lead grey-text mb-3">
                            RetailOEP is the premier retail inspection app that does it all. We make itsuper easy to inspect what you expect from your daily professionallives. We all have many things we need to review and inspect dailyand Retail OEP allows you to do it from the palm of your hand. RetailOEP is the Operational Excellence Platform for all your retail needsand much more. The platform is 20 plus years in the making fromactual retail walks and processes. Built by an operational retailerfor retailers just like you. Retail OEP gives you the power to simplyrun a better business with your teams.
                        </p>
                        <p className="lead grey-text mb-3">
                          Ourmission is simple: to make your life easier and much more processdriven, which in turn will improve your sales, profits and teamengagement. With millions of users around the globe and many newinspections every day, we're just getting started.
                        </p>
                        
                    </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>  
          </div>
            
      </>
    );
  }
}

export default AboutPage;
