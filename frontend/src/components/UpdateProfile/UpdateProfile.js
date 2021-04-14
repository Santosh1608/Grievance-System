import React, { Component } from "react";
import { connect } from "react-redux";
import * as authActions from "../../actions/auth";
import classes from "./UpdateProfile.module.css";
class UpdateProfile extends Component {
  state = {
    name: this.props.user.name,
    email: this.props.user.email,
    mobile: this.props.user.mobile,
  };
  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.props);
    return (
      <div className={classes.UpdateProfile}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChangeHandler}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
          />
        </div>

        <div>
          <label>Phno</label>
          <input
            type="text"
            name="mobile"
            value={this.state.mobile}
            onChange={this.onChangeHandler}
          ></input>
        </div>

        <input
          type="submit"
          onClick={() =>
            this.props.updateProfile(this.state, this.props.history)
          }
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (details, history) =>
      dispatch(authActions.updateProfile(details, history)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
