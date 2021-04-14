import React, { Component } from "react";
import classes from "./ShowCompliant.module.css";
import { connect } from "react-redux";
import * as compliantActions from "../../actions/compliant";
import * as modelActions from "../../actions/model";
class ShowCompliant extends Component {
  state = {
    name: this.props.name || "",
    desc: this.props.desc || "",
  };
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    let readonly = false;
    if (this.props.id) {
      readonly = true;
    }
    return (
      <div className={classes.ShowCompliant}>
        <h1>{this.props.title}</h1>
        <input
          type="text"
          name="name"
          placeholder="enter compliant name"
          value={this.state.name}
          onChange={this.onChangeHandler}
          readOnly={readonly}
        />
        <input
          type="text"
          name="desc"
          placeholder="enter compliant description"
          value={this.state.desc}
          onChange={this.onChangeHandler}
        />
        <input
          type="submit"
          onClick={() =>
            this.props.id
              ? this.props.updateCompliantByDeveloper(
                  this.props.id,
                  this.state.desc
                )
              : this.props.addCompliant(this.state)
          }
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    modelClose: () => dispatch(modelActions.modelClose()),
    addCompliant: (details) => dispatch(compliantActions.addCompliant(details)),
    updateCompliantByDeveloper: (cId, desc) =>
      dispatch(compliantActions.updateCompliantByDeveloper(cId, desc)),
  };
};
export default connect(null, mapDispatchToProps)(ShowCompliant);
