"use strict";

var React = require("react");

var DropDown = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    selected: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    error: React.PropTypes.string
  },

  render: function() {
    var wrapperClass = "form-group";
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + "has-error";
    }

    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <select name={this.props.name} className="form-control">
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option selected value="coconut">
              Coconut
            </option>
            <option value="mango">Mango</option>
          </select>
        </div>
      </div>
    );
  }
});
