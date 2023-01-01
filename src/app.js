const express = require("express");
const app = express();
const subscribers = require("./models/subscribers");
const { ObjectId } = require("mongodb");

// Your code goes here

// Route to get a response with an array of Subscribers from MongoDB Database
app.get("/subscribers", (req, res) => {
  //Command to fetch the subscribers objects from database
  subscribers
    .find({})
    .then((data, err) => {
      if (!err) {
        res.json(data);
        res.end();
      }
    })
    .catch((err) => {
      //this catch function is used to catch the error if the data is not able to be fetched
      res.status(500).send(err);
    });
});

// Route to get a response with an array of Subscribers with only 2 fields name and subscribedChannel from MongoDB Database
app.get("/subscribers/names", (req, res) => {
  //Command to fetch name and subscribedChannel field from the subscribers objects from database
  subscribers
    .find({}, { _id: false, name: 1, subscribedChannel: 1 })
    .then((data, err) => {
      if (!err) {
        res.json(data);
        res.end();
      }
    })
    .catch((err) => {
      //this catch function is used to catch the error if the data is not able to be fetched of specific fields
      res.status(500).send(err);
    });
});

// Route to get a response with a Subscriber of specific id from local Database
app.get("/subscribers/:id", (req, res) => {
  //req.params.id is used to fetch the id from the URL
  const id = req.params.id;
  //Command to fetch the specific id subscribers object from database
  subscribers
    .findOne({ _id: ObjectId(id) })
    .then((data, err) => {
      if (!err) {
        res.json(data);
        res.end();
      }
    })
    .catch((err) => {
      //this catch function is used to catch the error if the data is not able to be fetched of specific id
      res.status(500).send({ err });
    });
});

// Route to insert the data of request body to mongoDB Database and get a response with the added Subscriber from MongoDB Database
app.use(express.json())
app.post("/subscribers/add", (req,res)=>{
  //below line will fetch name and subscribedChannel field from the body of the request given in json format
  const { name, subscribedChannel } = req.body;
  const subscriber = new subscribers({
    name,
    subscribedChannel
  })
  //below line will save the given fields data in the database
  subscriber.save().then(
    (data, err) => {
      if (!err) {
        res.json(data);
        res.end();
      }
    }
  ).catch((err) => {
    //this catch will throw error if the data is not been saved in the database
    res.status(500).send({ err });
  });
})

// Route to delete the data of given id from mongoDB Database and get a response with the deleted Subscriber from MongoDB Database
app.delete("/subscribers/delete/:id",async (req,res)=>{
  try {
    //below line will find the given id document in the database
    let subscriber = await subscribers.findById(req.params.id);
    if (!subscriber) {
      //below line will throw an error if the given id field data is not found in the database
      return res.status(404).send("Not Found");
    }
    
    //below line will find the given id and delete it from database
    subscriber = await subscribers.findByIdAndDelete(req.params.id);
    res.json({ Success: "Subscriber Deleted", subscriber: subscriber });
  } catch (error) {
    //below lines will throw errors if any error occurs in the try block
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// Route to update the data of given id from mongoDB Database and get a response with the updated Subscriber from MongoDB Database
app.put("/subscribers/update/:id", async (req, res) => {
  try {
    //below line will fetch name and subscribedChannel field from the body of the request given in json format
    const { name, subscribedChannel } = req.body;
    const newSubscriber = {};
    //below lines will assign values to the fields and store it in newSubscribers object
    if (name) {
      newSubscriber.name = name;
    }
    if (subscribedChannel) {
      newSubscriber.subscribedChannel = subscribedChannel;
    }
    //below line will find the given id document in the database
    let subscriber = await subscribers.findById(req.params.id);
    if (!subscriber) {
      //below line will throw an error if the given id field data is not found in the database
      return res.status(404).send("Not Found");
    }
    //below line will find the id and update it in the database
    subscriber = await subscribers.findByIdAndUpdate(
      req.params.id,
      { $set: newSubscriber },
      { new: true }
    );
    res.json({ subscriber });
  } catch (error) {
    //below lines will throw errors if any error occurs in the try block
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
