import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  state = {
      email: null, 
      password: null, 
      error: null,
      loading: false,
  };

  handleType = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value, error: null});
  }

  handleClick = () => {
      console.log("clicked");
      axios.post("Put url here", {
        email: this.state.email,
        password: this.state.password
      }).then(result => {
        console.log(result.data.token);
        this.props.onLogin(result.data.token);
      }).catch(err => {
        this.setState({error: err.response.data.error.message});
      });
  }

  render() {
    return (
        <div>
            {this.state.error && <div className="notification is-warning">{this.state.error}</div>}
            <div className="field">
                <label className="label">Имэйл</label>
                <input className="input" name="email" type="text" onChange={this.handleType}/>
            </div>

            <div className="field">
                <label className="label">Нууц үг</label>
                <input className="input" name="password" type="text" onChange={this.handleType}/>
            </div>

            <div className="field">
                <button className="button is-link" onClick={this.handleClick}>Нэвтрэх</button>
            </div>
        </div>
    )
  }
}
