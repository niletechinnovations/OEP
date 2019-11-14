import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import './Login.css'
class Login extends Component {

  constructor( props ){
    super( props );

    this.state = {
      email: '',
      password: '',
      userName: '',
      loggedIn: false,
      loading: false,
    };
  }

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if(this.state.email === "" || this.state.password === "") {
      toast.error("All field are required");
      return;
    }
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState( { loading: true }, () => {
      commonService.postAPI( `auth/sign-in`, loginData )
        .then( res => {
         
          console.log(res);
          if ( undefined === res.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }
  
          const loggedInfo = res.data;
          if(loggedInfo.data.role.toLowerCase() !== 'admin') {
            this.setState( { loading: false } );
            toast.error("Invalid login access");
            return false
          }
          localStorage.setItem( 'accessToken', loggedInfo.data.accessToken );
          localStorage.setItem( 'refreshToken', loggedInfo.data.refreshToken );
          localStorage.setItem( 'role', loggedInfo.data.role );
          localStorage.setItem( 'userName', loggedInfo.data.firstName );
  
          this.setState( {
            loading: false,              
            loggedIn: true
          } )
          toast.success(res.data.message);
          this.props.history.push('/admin/dashboard');
          
        } )
        .catch( err => {
          debugger;
          toast.error(err.message);
          this.setState( { loading: false} );
        } )
    } )

  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, loggedIn, loading } = this.state;

    if ( loggedIn || localStorage.getItem( 'token' ) ) {
      return ( <Redirect to={`/admin/dashboard`} noThrow /> )
    }

    let loaderElement = <>Sign IN <div className="spinner-border text-success buttonloader" role="status">
                  <span className="sr-only">Loading...</span>
              </div></>;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <ToastContainer /> 
                    <Form onSubmit={this.submitHandler}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username *" autoComplete="username" name="email" value={email} onChange={this.changeHandler} required />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password *" name="password" value={password} autoComplete="current-password" onChange={this.changeHandler} required />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type="submit" disabled = {loading ? true: false}>{loading ? loaderElement : 'SIGN IN'}</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
