"use strict";

var React = require("react");
var Router = require("react-router");
var CourseForm = require("./courseForm");
var CourseActions = require("../../actions/courseActions");
var CourseStore = require("../../stores/courseStore");
var AuthorActions = require("../../actions/authorActions");
var AuthorStore = require("../../stores/authorStore");
var toastr = require("toastr");

var ManageCoursePage = React.createClass({
  mixins: [Router.Navigation],

  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm("Leave without saving?")) {
        transition.abort();
      }
    }
  },

  getInitialState: function() {
    return {
      course: {
        id: "",
        title: "",
        watchHref: "",
        author: {
          id: "",
          name: ""
        },
        length: "",
        category: ""
      },
      authors: AuthorStore.getAllAuthors(),
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    var courseId = this.props.params.id;
    if (courseId) {
      this.setState({ course: CourseStore.getCourseById(courseId) });
    }
  },

  setCourseState: function(event) {
    this.setState({ dirty: true });
    var field = event.target.name;
    var value = event.target.value;
    var label = event.target.label;
    if (field === "author") {
      this.state.course.author.id = value;
      var authore = AuthorStore.getAuthorById(value);
      this.state.course.author.name =
        authore.firstName + " " + authore.lastName;
    } else {
      this.state.course[field] = value;
    }
    return this.setState({ course: this.state.course });
  },

  courseFormIsValid: function() {
    var formIsValid = true;

    return formIsValid;
  },

  saveCourse: function(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    if (this.state.course.id) {
      CourseActions.updateCourse(this.state.course);
    } else {
      CourseActions.createCourse(this.state.course);
    }
    this.setState({ dirty: false });
    toastr.success("Course Saved.");
    this.transitionTo("courses");
  },

  render: function() {
    return (
      <CourseForm
        course={this.state.course}
        authors={AuthorStore.getAllAuthors()}
        onChange={this.setCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
      />
    );
  }
});

module.exports = ManageCoursePage;
