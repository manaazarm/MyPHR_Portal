import React, { Component } from "react";
import AddressItem from "./AddressItem";

class AddressSuggest extends Component {
  render() {
    return (
      <AddressItem
        label="start typing"
        value={this.props.query}
        onChange={this.props.onChange}
      />
    );
  }
}

export default AddressSuggest;
