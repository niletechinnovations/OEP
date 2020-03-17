import React from "react";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";

class AboutPage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);
  render() {
    return (
      <>
        
          <div className="main-content features-card"> 
            <section className="my-5 mt-5">
              <MDBContainer>
                <MDBRow>
                    <MDBCol md="12">
                        <h2 className="h2-responsive font-weight-bold mt-5 mb-4">
                        About Us
                        </h2>
                        <p >
                            RetailOEP is the premier retail inspection app that does it all. We make it super easy to inspect what you expect from your daily professional lives. We all have many things we need to review and inspect daily and RetailOEP allows you to do it from the palm of your hand. RetailOEP is the Operational Excellence Platform for all your retail needs and much more. The platform is 20 plus years in the making from actual retail walks and processes. Built by an operational retailer for retailers just like you. Retail OEP gives you the power to simply run a better business with your teams.
                        </p>
                        <p >
                          Our mission is simple: to make your life easier and much more process driven, which in turn will improve your sales, profits and team engagement. With millions of users around the globe and many new inspections every day, we're just getting started.
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
