import React, { Component } from "react";

class AddressItem extends Component {
  render() {
    return (
      <div className="row form-group justify-content-start">
        <div className="col-xl-4">
          <input
            type="text"
            id={this.props.id}
            defaultValue={this.props.value}
            onChange={this.props.onChange}
            className="form-control"
            placeholder={this.props.label}
          />
        </div>
      </div>
    );
  }
}

export default AddressItem;
