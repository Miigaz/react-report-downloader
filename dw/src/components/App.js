import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import NavBar from './NavBar';

class App extends Component {
  state = {
    token: null,
  }

  handleLogin = (token) => {
    this.setState({token});
    localStorage.setItem('token', token);
    this.props.history.push('/main');
    console.log("logged in... token: " + token);
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({token: null});
    this.props.history.push('/');
    console.log("Logged out");
  }

  render() {
    return (
      <div>
          <NavBar onLogout={this.handleLogout}/>
          <div className='container'>
            <Switch>
              <Route path="/main" component={Main} />
              <Route exact path="/" render={() => <Login onLogin={this.handleLogin}/>} />
            </Switch>
          </div>
      </div>
    );
  }
}


export default withRouter(App);
