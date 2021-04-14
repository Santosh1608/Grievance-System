import classes from "./Count.module.css";
import React, { Component } from "react";

class Count extends Component {
  render() {
    let show = <p>New: {this.props.new}</p>;
    if (this.props.role == 1) {
      show = null;
    }
    return (
      <div className={classes.Count}>
        <p>Total: {this.props.total}</p>
        <p>Solved: {this.props.solved}</p>
        <p>active: {this.props.active}</p>
        {show}
      </div>
    );
  }
}

export default Count;
