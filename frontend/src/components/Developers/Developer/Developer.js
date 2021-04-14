import classes from "./Developer.module.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as developerActions from "../../../actions/developer";
class Developer extends Component {
  render() {
    return (
      <tr>
        <td>{this.props._id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.email}</td>
        <td>{this.props.mobile}</td>
        <td
          className={classes.DELETE}
          style={{ cursor: "pointer" }}
          onClick={() => this.props.removeDeveloper(this.props._id)}
        >
          DELETE
        </td>
      </tr>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeDeveloper: (dId) => dispatch(developerActions.removeDeveloper(dId)),
  };
};
export default connect(null, mapDispatchToProps)(Developer);
