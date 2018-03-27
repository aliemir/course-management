"use strict";

var React = require("react");
var Input = require("../common/textInput");

var CourseForm = React.createClass({
  propTypes: {
    course: React.PropTypes.object.isRequired,
    authors: React.PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },

  render: function() {
    var createSelect = function(author) {
      return (
        <option
          key={author.id}
          value={author.id}
          label={author.firstName + " " + author.lastName}
        >
          {author.firstName} {author.lastName}
        </option>
      );
    };
    return (
      <div className="form-group">
        <form>
          <h1>Manage Course</h1>
          <Input
            name="title"
            label="Title"
            value={this.props.course.title}
            onChange={this.props.onChange}
            error={this.props.errors.title}
          />
          <Input
            name="category"
            label="Category"
            value={this.props.course.title}
            onChange={this.props.onChange}
            error={this.props.errors.title}
          />
          <label htmlFor="author">Author</label>
          <br />
          <select
            name="author"
            className="form-control"
            onChange={this.props.onChange}
            defaultValue={this.props.course.author.id}
          >
            {this.props.authors.map(createSelect, this)}
          </select>
          <br />
          <Input
            name="watchHref"
            label="Watch Link"
            value={this.props.course.watchHref}
            onChange={this.props.onChange}
            error={this.props.errors.watchHref}
          />
          <Input
            name="length"
            label="Length"
            value={this.props.course.length}
            onChange={this.props.onChange}
            error={this.props.errors.length}
          />
          <input
            type="submit"
            value="Save"
            className="btn btn-default"
            onClick={this.props.onSave}
          />
        </form>
      </div>
    );
  }
});

module.exports = CourseForm;
