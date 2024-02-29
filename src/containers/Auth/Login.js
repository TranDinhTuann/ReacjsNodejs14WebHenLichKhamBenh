import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import {handleLoginApi} from "../../services/userServices";
import { userLoginSuccess } from "../../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isShowPassword: false,
      errMessage: ''
    };
  }

  handleOnChangeInput = (event) => {
    // console.log(event.target.value);
    this.setState({
        username: event.target.value

    })
  }
  
  handleOnChangePassword = (event) => {
    // console.log(event.target.value);
    this.setState({
        password: event.target.value
    })
  }

  handleLogin = async () => {
    this.setState({
      errMessage: ''
    })
    // console.log(`Username: ${this.state.username}, Password: ${this.state.password}`);
    // console.log('all state:', this.state);
    try {
      let  data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0){
        this.setState({
          errMessage: data.message
        })
      }
      if(data && data.errCode === 0 ){
        this.props.userLoginSuccess(data.user)  
        console.log('login success');
      }
    } catch (error) {
      if(error.response){
        if(error.response.data){
          this.setState({
            errMessage: error.response.data.message
          })
        }
      }
      console.log('hoidanit ', error.response)
    }
  }

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    })
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
            <div className="col-12 form-group login-input">
              <label for="input-password">Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? 'text' : 'password'}
                  className="form-control"
                  id="input-password"
                  placeholder="Enter your password"
                  onChange={(event) => this.handleOnChangePassword(event)}
                ></input>
                <span
                  onClick={() => {this.handleShowHidePassword()}}
                  ><i className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                </span>
              </div>
            </div>

            <div className="col-12" style={{color: 'red'}}>
              {this.state.errMessage}
            </div>

            <div className="col-12 form-group">
              <button className="btn-login" onClick={() => {this.handleLogin()} }>Login</button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-login">Or login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
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
    // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
