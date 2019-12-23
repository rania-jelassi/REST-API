import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Contact from "./contact/Contact";
import axios from "axios";
// import ModalAdd from "./Modal/ModalAdd";

export default class App extends Component {
  state = {
    show: false,
    contacts: [],
    showList: false,
    isShowForm: false,
    editContact: null
  };

  showList = () => {
    this.setState({ showList: true });
  };
  hideList = () => {
    this.setState({ showList: false });
  };
  resetForm = () => {
    this.setState({ editContact: null });
  };
  showForm = () => {
    this.setState({ isShowForm: true });
  };

  hideForm = () => {
    this.setState({ isShowForm: false });
  };

  getAll = () => {
    axios.get(`/getContact`).then(response =>
      this.setState({
        contacts: response.data
      })
    );
  };
  componentDidMount() {
    this.getAll();
  }
  del = id => axios.delete(`/DeleteContact/${id}`).then(this.getAll);

  add = newcontact => {
    axios.post(`/contactList`, newcontact).then(() => {
      this.getAll();
      this.hideForm();
      this.showList();
    });
  };
  edit = contact => {
    axios
      .put(`/ModifContact/${contact._id}`, {
        Name: contact.Name,
        email: contact.email,
        phone: contact.phone
      })
      .then(() => {
        this.getAll();
        this.hideForm();
        this.showList();
      });
  };
  editContact = contact => {
    this.setState({ editContact: contact });
    this.hideList();
    this.showForm();
  };
  Recup = el => {
    el.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <Contact
          add={this.add}
          edit={this.edit}
          resetForm={this.resetForm}
          editContact={this.state.editContact}
          isShowForm={this.state.isShowForm}
          showList={this.showList}
          hideList={this.hideList}
          showForm={this.showForm}
          hideForm={this.hideForm}
        />

        {this.state.showList
          ? this.state.contacts.map((c, i) => (
              <div className="card-contact" key={i}>
                <p>{c.Name}</p>
                <p>{c.phone}</p>
                <p>{c.email}</p>

                <button
                  className="edit"
                  onClick={() => {
                    this.editContact(c);
                  }}
                >
                  <strong>Edit</strong>
                </button>
                <button
                  onClick={() => {
                    this.del(c._id);
                  }}
                  className="delete"
                >
                  <strong>Delete</strong>
                </button>
              </div>
            ))
          : ""}
      </div>
    );
  }
}
