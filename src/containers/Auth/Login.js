import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleOnChangeInput = (event) => {
    console.log(event.target.value);
    this.setState({
        username: event.target.value
    })
  }
  
  handleOnChangePassword = (event) => {
    console.log(event.target.value);
    this.setState({
        password: event.target.value
    })
  }

  handleLogin = () => {
    console.log(`Username: ${this.state.username}, Username: ${this.state.password}`);
    console.log('Allstate:' + this.state);
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group">
              <label for="input-name">Username:</label>
              <input
                type="text"
                className="form-control"
                id="input-name" 
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeInput(event)}
              ></input>
            </div>
            <div className="col-12 form-group">
              <label for="input-password">Password:</label>
              <input
                type="text"
                className="form-control"
                id="input-password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={(event) => this.handleOnChangePassword(event)}
              ></input>
            </div>
            <div className="col-12 form-group">
              <button className="button-login" onClick={()=>this.handleLogin()}>Login</button>
            </div>
            <div className="col-12 form-group">
              <span>Forgot your password?</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
