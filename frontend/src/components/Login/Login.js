import React, { Component } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div className={classes.Login}>
        <div className={classes.InnerLogin}>
          <div className={classes.InnerLeft}>
            <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlfGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
          </div>
          <div className={classes.InnerRight}>
            <h1>Login to your account</h1>
            <input
              name="email"
              type="text"
              placeholder="enter email"
              value={this.state.email}
              onChange={this.onChangeHandler}
            ></input>
            <input
              name="password"
              type="text"
              placeholder="enter password"
              value={this.state.password}
              onChange={this.onChangeHandler}
            ></input>
            <button onClick={() => this.props.login(this.state)}>LOGIN</button>
            <p>
              Don't have account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (details) => dispatch(actions.login(details)),
  };
};
export default connect(null, mapDispatchToProps)(Login);
