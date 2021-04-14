import React, { Component } from "react";
import classes from "./Model.module.css";
import * as modelActions from "../../actions/model";
import { connect } from "react-redux";
class Model extends Component {
  render() {
    return (
      <main>
        <div className={classes.Model} onClick={this.props.modelClose}></div>
        <div className={classes.ModelCenter}>{this.props.children}</div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modelClose: () => dispatch(modelActions.modelClose()),
  };
};
export default connect(null, mapDispatchToProps)(Model);
