
import React, { Component } from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
  state = {
    isLogin : true
  }

  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.usernameEl=React.createRef();
    this.passwordEl=React.createRef();
  }
//reverting value 
  switchModeHandler = () => {
    this.setState(prevState => {
      return {isLogin : !prevState.isLogin}
    })
  }

  submitHandler= (event) => {
    event.preventDefault()
    const username = this.usernameEl.current.value;
    const password = this.passwordEl.current.value;
    if(username.trim().length === 0 || password.trim().length === 0){
      return ;
    }
    


    let requestBody= {
      query: `
      query {
        login(username: "${username}", password:"${password}"){
          userId
          token
          tokenExpiration
        }
      }
      `
    }

    if(!this.state.isLogin){
      requestBody = {
        query : `
          mutation {
            createUser(userInput: {username : "${username}", password: "${password}"}){
              _id
              username
            }
          }
        `
      }
    }
    console.log(username,password);
    
    fetch("http://localhost:4000/graphql", {
    method: 'POST',
    body: JSON.stringify(requestBody), 
    headers : {
    'Content-Type' : 'application/json'
  }}).then(res => {
    if(res.status !== 200 && res.status!== 201){
      throw new Error("Failed!");
    }
    //console.log("LAAAA");
    return res.json();
  }).then(resData =>{
    console.log("ON EST LA");
    console.log('resData is : ' + JSON.stringify(resData.data));
    if(resData.data.login.token){
      this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration);
    };
    this.props.history.push('/subreddits')
    
  })
  .catch(err =>{console.log(err);})

  };

 
  

  render() {

        return (

          <Form onSubmit={this.submitHandler} >
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Username</Form.Label>

            <Col sm={10}>
            <Form.Control ref={this.usernameEl} type="text" placeholder="Enter username" id="username" />
            </Col>
            
          </Form.Group>
        
          <Form.Group as={Row} >
            <Form.Label column sm={2}>Password</Form.Label>

            <Col sm={10}>
            <Form.Control ref={this.passwordEl} type="password" placeholder="Password" id="password" />
            </Col>
          </Form.Group>

          <Button  type="button" variant="secondary" onClick={this.switchModeHandler}> 
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </Button>
          <Button variant="primary" type="submit">
          OK
          </Button>
        </Form>

          )
       
   }}
export default AuthPage;
