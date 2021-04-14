import classes from "./Compliant.module.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as compliantActions from "../../../actions/compliant";
import * as modelActions from "../../../actions/model";
import Model from "../../Model/Model";
import ShowCompliant from "../../ShowCompliant/ShowCompliant";
import Moment from "moment";
class Compliant extends Component {
  onChangeHandler = (e) => {
    console.log("Changed", e.target.value, e.target.name);
    //GOT DEVELOPER ID and COMPLAINT ID
    this.props.updateCompliantByAdmin(e.target.value, e.target.name);
  };
  render() {
    let editCompliant = null;
    if (this.props.user.role == 2 && this.props.checkNew) {
      editCompliant = (
        <select name={this.props.compliant._id} onChange={this.onChangeHandler}>
          <option disabled selected hidden>
            Choose developer
          </option>
          {this.props.developers.map((developer) => {
            return (
              <option key={developer._id} value={developer._id}>
                {developer.name}
              </option>
            );
          })}
        </select>
      );
    }
    if (this.props.user.role == 1 && this.props.checkActive) {
      editCompliant = (
        <button onClick={() => this.props.editCompliant(this.props.compliant)}>
          EDIT
        </button>
      );
    }
    console.log(this.props.compliant);
    let showModel = null;
    if (this.props.isModelOpen && this.props.user.role == 1) {
      console.log(this.props.compliant.name);
      showModel = (
        <Model>
          <ShowCompliant
            id={this.props.editc._id}
            name={this.props.editc.name}
            desc={this.props.editc.desc}
            title="EDIT COMPLIANT"
          />
        </Model>
      );
    }
    return (
      <>
        {showModel}
        <div className={classes.cBody}>
          <p>{this.props.compliant._id}</p>
          <p>{this.props.compliant.name}</p>
          <p>{Moment(this.props.compliant.createdAt).format("YYYY-MM-DD")}</p>
          <p>
            {this.props.compliant.resolvedBy
              ? this.props.compliant.resolvedBy.name
              : "Not mapped"}
          </p>
          <p>{this.props.compliant.status}</p>
          {editCompliant}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    checkNew: state.compliant.newCheck,
    checkActive: state.compliant.activeCheck,
    developers: state.developer.developers,
    isModelOpen: state.model.isModelOpen,
    editc: state.compliant.editCompliant,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCompliantByAdmin: (dId, cId) =>
      dispatch(compliantActions.updateCompliantByAdmin(dId, cId)),
    modelOpen: () => dispatch(modelActions.modelOpen()),
    editCompliant: (complaint) =>
      dispatch(compliantActions.editCompliant(complaint)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Compliant);
