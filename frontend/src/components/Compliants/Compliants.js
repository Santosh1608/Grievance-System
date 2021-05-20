import classes from "./Compliants.module.css";
import React, { Component } from "react";
import Compliant from "./Compliant/Compliant";
import { connect } from "react-redux";
class Compliants extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <div className={classes.cHead}>
          <p>ID</p>
          <p>Issue</p>
          <p>Created On</p>
          <p>Developer</p>
          <p>Status</p>
          <p>Desc</p>
          <p
            style={{
              display: this.props.user.role == 0 ? "none" : "block",
            }}
          >
            {}
          </p>
        </div>
        {this.props.compliants.map((compliant) => {
          return (
            <Compliant
              id={compliant._id}
              key={compliant._id}
              compliant={compliant}
            />
          );
        })}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Compliants);
