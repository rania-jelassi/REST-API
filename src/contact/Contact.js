import React, { Component } from "react";

export default class Contact extends Component {
  state = { Name: "", phone: "", email: "" };
  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h1>Contact App</h1>
        <button
          onClick={() => {
            this.props.resetForm();
            this.props.showList();
            this.props.hideForm();
          }}
        >
          {" "}
          Contact List
        </button>
        <button
          onClick={() => {
            this.props.hideList();
            this.props.showForm();
          }}
        >
          {" "}
          New Contact{" "}
        </button>
        {this.props.isShowForm ? (
          <div>
            <div>
              <br />
              Contact Name
              <br />
              <input
                type="text"
                name="Name"
                placeholder="Contact Name"
                onChange={this.handleChange}
              />
              <br />
              Contact Teléphone
              <br />
              <input
                type="text"
                name="phone"
                placeholder="Contact Teléphone"
                onChange={this.handleChange}
              />
              <br />
              Contact Email
              <br />
              <input
                type="email"
                name="email"
                placeholder="Contact Email"
                onChange={this.handleChange}
              />
            </div>

            {this.props.editContact ? (
              <button
                onClick={() => {
                  this.props.edit({
                    _id: this.props.editContact._id,
                    ...this.state
                  });
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  this.props.add(this.state);
                }}
              >
                Add
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
