import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import * as developerActions from "../../actions/developer";
import { Link } from "react-router-dom";
import classes from "./SignUp.module.css";
class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    mobile: "",
  };
  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className={classes.SignUp}>
        <div className={classes.InnerSignUp}>
          <div className={classes.InnerRight}>
            <h1>
              {this.props.show ? "SignUp to your account" : "Add developer"}
            </h1>
            <input
              name="name"
              type="text"
              placeholder="enter name"
              value={this.state.name}
              onChange={this.onChangeHandler}
            ></input>
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
            <input
              name="mobile"
              type="text"
              placeholder="enter phone number"
              value={this.state.mobile}
              onChange={this.onChangeHandler}
            ></input>
            <button
              onClick={() =>
                this.props.isDeveloper == "developer"
                  ? this.props.addDeveloper(this.state)
                  : this.props.signup(this.state)
              }
            >
              {this.props.show ? "SignUp" : "Add developer"}
            </button>
            <p style={{ display: this.props.show ? "block" : "none" }}>
              Already signed Up? <Link to="/Login">Login</Link>
            </p>
          </div>
          <div className={classes.InnerLeft}>
            <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlfGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (details) => dispatch(actions.signup(details)),
    addDeveloper: (details) => dispatch(developerActions.addDeveloper(details)),
  };
};
export default connect(null, mapDispatchToProps)(SignUp);
