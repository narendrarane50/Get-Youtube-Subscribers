const express = require("express");
const app = express();
const subscribers = require("./models/subscribers");
const { ObjectId } = require("mongodb");

// Your code goes here

// Route to get a response with an array of Subscribers from local MongoDB Database
app.get("/subscribers", (req, res) => {
  subscribers
    .find({})
    .then((data, err) => {
      if (!err) {
        res.json(data);
        res.end();
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Route to get a response with an array of Subscribers with only 2 fields name and subscribedChannel from local MongoDB Database
app.get("/subscribers/names", (req, res) => {
  subscribers
    .find({}, { _id: false, name: 1, subscribedChannel: 1 })
    .then((data, err) => {
      if (!err) {
        res.json(data);
        res.end();
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Route to get a response with a Subscriber of specific id from local MongoDB Database
app.get("/subscribers/:id", (req, res) => {
  const id = req.params.id;
  subscribers
    .findOne({ _id: ObjectId(id) })
    .then((data, err) => {
      if (!err) {
        res.json(data);
        res.end();
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
});

// error handling function to give error message if id does not match
const errorResponder = (error, request, response, next) => {
  response.header("Content-Type", "application/json");
  const status = error.status || 400;
  response.status(status).send({ message: error.message });
};

// calling of error handling function before giving the response
app.use(errorResponder);

module.exports = app;
