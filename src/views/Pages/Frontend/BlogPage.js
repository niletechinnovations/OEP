import React from "react";
import {  
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn,
    MDBPagination, MDBPageItem, MDBPageNav
} from "mdbreact";

const BlogPage = () => {
  return (
    <div className="main-content"> 
        <section className="my-5 mt-5">
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12">
                        <h2 className="h2-responsive font-weight-bold mt-5 mb-4"> Recent posts</h2>
                    </MDBCol>
                </MDBRow>
               
                    
                    <MDBRow>
                    <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
                        <MDBCard >
                            <MDBCardBody className="text-center">
                                <MDBView hover className="rounded z-depth-2 mb-4" waves>
                                <img
                                    className="img-fluid"
                                    src="https://mdbootstrap.com/img/Photos/Others/images/81.jpg"
                                    alt=""
                                />
                                <MDBMask overlay="white-slight" />
                                </MDBView>
                                <a href="#!" className="pink-text">
                                <h6 className="font-weight-bold mb-3">
                                    <MDBIcon icon="map" className="pr-2" />
                                    Adventure
                                </h6>
                                </a>
                                <h4 className="font-weight-bold mb-3">
                                <strong>Title of the news</strong>
                                </h4>
                                <p>
                                by <a href="#!" className="font-weight-bold">Billy Forester</a>,
                                15/07/2018
                                </p>
                                <p className="dark-grey-text">
                                Nam libero tempore, cum soluta nobis est eligendi optio cumque
                                nihil impedit quo minus id quod maxime placeat facere possimus
                                voluptas.
                                </p>
                                <MDBBtn className="bg-grey-oep text-white" rounded size="md">
                                Read more
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>        
                    </MDBCol>
                    <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
                        <MDBCard >
                            <MDBCardBody className="text-center">
                                <MDBView hover className="rounded z-depth-2 mb-4" waves>
                                
                                <img
                                    className="img-fluid"
                                    src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                                    alt=""
                                />
                                <MDBMask overlay="white-slight" />
                                </MDBView>
                                <a href="#!" className="deep-orange-text">
                                <h6 className="font-weight-bold mb-3">
                                    <MDBIcon icon="graduation-cap" className="pr-2" />
                                    Education
                                </h6>
                                </a>
                                <h4 className="font-weight-bold mb-3">
                                <strong>Title of the news</strong>
                                </h4>
                                <p>
                                by <a href="#!" className="font-weight-bold">Billy Forester</a>,
                                13/07/2018
                                </p>
                                <p className="dark-grey-text">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                                blanditiis voluptatum deleniti atque corrupti quos dolores.
                                </p>
                                <MDBBtn className="bg-grey-oep text-white" rounded size="md">
                                Read more
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
                        <MDBCard >
                            <MDBCardBody className="text-center">
                                <MDBView hover className="rounded z-depth-2 mb-4" waves>
                                <img
                                    className="img-fluid"
                                    src="https://mdbootstrap.com/img/Photos/Others/images/13.jpg"
                                    alt=""
                                />
                                <MDBMask overlay="white-slight" />
                                </MDBView>
                                <a href="#!" className="blue-text">
                                <h6 className="font-weight-bold mb-3">
                                    <MDBIcon icon="fire" className="pr-2" />
                                    Culture
                                </h6>
                                </a>
                                <h4 className="font-weight-bold mb-3">
                                <strong>Title of the news</strong>
                                </h4>
                                <p>
                                by <a href="#!" className="font-weight-bold">Billy Forester</a>,
                                11/07/2018
                                </p>
                                <p className="dark-grey-text">
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                                aut fugit, sed quia consequuntur magni dolores eos qui ratione.
                                </p>
                                <MDBBtn className="bg-grey-oep text-white" rounded size="md">
                                Read more
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>        
                    </MDBCol>
                    </MDBRow>

                    {/* Pagination */}
                    <MDBRow className="mt-5">
                        <MDBCol>
                            <MDBPagination className="justify-content-center" >
                            <MDBPageItem disabled>
                                <MDBPageNav className="page-link">
                                <span>First</span>
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem disabled>
                                <MDBPageNav className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem active>
                                <MDBPageNav className="page-link">
                                1 <span className="sr-only">(current)</span>
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className="page-link">
                                2
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className="page-link">
                                3
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className="page-link">
                                4
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className="page-link">
                                5
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className="page-link">
                                &raquo;
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className="page-link">
                                Last
                                </MDBPageNav>
                            </MDBPageItem>
                            </MDBPagination>
                        </MDBCol>
                        </MDBRow>
                </MDBContainer>
            </section>  
        </div>
  );
}

export default BlogPage;