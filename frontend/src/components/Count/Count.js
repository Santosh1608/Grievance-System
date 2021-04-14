import React, { Component } from "react";

class Count extends Component {
  render() {
    let show = <div>New: {this.props.new}</div>;
    if (this.props.role == 1) {
      show = null;
    }
    return (
      <>
        <div>Total: {this.props.total}</div>
        <div>Solved: {this.props.solved}</div>
        <div>active: {this.props.active}</div>
        {show}
      </>
    );
  }
}

export default Count;
