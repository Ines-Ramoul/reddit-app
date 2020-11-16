import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import AuthPage from './components/Auth.js';
import SearchSubreddit from './components/SearchReddit';
import MainNavBar from './components/MainBar'
import './App.css';
import AuthContext from './context/auth-context';


class App extends Component {

  state = {
    token: null,
    userId: null
  }
  login = (token, userId, tokenExpiration)=>{
    this.setState({token: token, userId: userId});
  }

  logout = () => {
    this.setState({token: null, userId: null});
  }

  render(){
  return (
    
    <BrowserRouter>
    <React.Fragment>
      <AuthContext.Provider value = {{token:this.state.token, userId: this.state.userId, login : this.login, logout: this.logout}}>
      <MainNavBar/>
      <Switch>
      {!this.state.token && <Redirect from="/" to="/auth" exact/>}
      {!this.state.token && <Route path="/auth" component={AuthPage}/>}
      {this.state.token && <Route path="/subreddits" component={SearchSubreddit}/>}
      </Switch>
      </AuthContext.Provider>
    </React.Fragment>
    </BrowserRouter>
  );
}}

export default App;
