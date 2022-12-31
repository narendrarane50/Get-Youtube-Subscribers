const express = require("express");
const app = express();
const subscribers = require("./models/subscribers");
const { ObjectId } = require("mongodb");

// Your code goes here

// Route to get a response with an array of Subscribers from MongoDB Database
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

// Route to get a response with an array of Subscribers with only 2 fields name and subscribedChannel from MongoDB Database
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

// Route to get a response with a Subscriber of specific id from local Database
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

// Route to insert the data of request body to mongoDB Database and get a response with the added Subscriber from MongoDB Database
app.use(express.json())
app.post("/subscribers/add", (req,res)=>{
  const { name, subscribedChannel } = req.body;
  const subscriber = new subscribers({
    name,
    subscribedChannel
  })
  subscriber.save().then(
    (data, err) => {
      if (!err) {
        res.json(data);
        res.end();
      }
    }
  ).catch((err) => {
    res.status(500).send({ err });
  });
})

// Route to delete the data of given id from mongoDB Database and get a response with the deleted Subscriber from MongoDB Database
app.delete("/subscribers/delete/:id",async (req,res)=>{
  try {
    let subscriber = await subscribers.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).send("Not Found");
    }
    

    subscriber = await subscribers.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note Deleted", subscriber: subscriber });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// Route to update the data of given id from mongoDB Database and get a response with the updated Subscriber from MongoDB Database
app.put("/subscribers/update/:id", async (req, res) => {
  try {
    const { name, subscribedChannel } = req.body;
    const newSubscriber = {};
    if (name) {
      newSubscriber.name = name;
    }
    if (subscribedChannel) {
      newSubscriber.subscribedChannel = subscribedChannel;
    }
    let subscriber = await subscribers.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).send("Not Found");
    }

    subscriber = await subscribers.findByIdAndUpdate(
      req.params.id,
      { $set: newSubscriber },
      { new: true }
    );
    res.json({ subscriber });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
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
