const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");
const app = express();

// read of bady of request
app.use(bodyParser.json());

// connexion de la database dans server.js
const mongo_url = "mongodb://localhost:27017";
const database = "first-api";
MongoClient.connect(
  mongo_url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, client) => {
    // if (!err) console.log("dbconnected");
    assert.equal(err, null, "data base connection failed");
    const db = client.db(database);

    app.post("/contactList", (req, res) => {
      let newcontact = req.body;
      db.collection("Contact").insertOne(newcontact, (err, data) => {
        if (err) res.send("error");
        else res.send(data);
      });
    });

    app.get("/getContact", (req, res) => {
      db.collection("Contact")
        .find()
        .toArray((err, data) => {
          if (err) res.send("error");
          else res.send(data);
        });
    });

    app.put("/ModifContact/:id", (req, res) => {
      let contactToModif = ObjectID(req.params.id);
      let modif = req.body;
      db.collection("Contact").findOneAndUpdate(
        { _id: contactToModif },
        { $set: { ...modif } },
        (err, data) => {
          if (err) res.send(err.message);
          else res.send(data);
        }
      );
    });

    app.delete("/DeleteContact/:id", (req, res) => {
      let contactToDelete = ObjectID(req.params.id);
      db.collection("Contact").deleteOne(
        { _id: contactToDelete },
        (err, data) => {
          if (err) {
            res.send("can't delete");
          } else {
            console.log("delete ", data);
            if (data.deletedCount === 0) {
              console.log("No document to delete with ID: " + contactToDelete);
            } else {
              res.send(data);
            }
          }
        }
      );
    });
  }
);

// Serveur
app.listen(4000, err => {
  if (err) console.log("server is not running");
  else console.log("server is running port 4000");
});
