/*const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const mongoose = require('mongoose');
const Post = require*/

// server.js
const express = require("express");
//import bodyParser from 'body-parser';
const bodyParser = require("body-parser");
//import logger from 'morgan';
const logger = require("morgan");
//import mongoose from 'mongoose';
const mongoose = require("mongoose");
//import { getSecret } from './secrets';
const getSecret = require("./secrets");
//import Post from './models/post';
const Post = require("./models/post");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
require("dotenv").config({ path: "/app/backend/.env" });

// Use our router configuration when we call /api
//app.use('/api', router);

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();
  const router = express.Router();
  /*
  // create instances
  const app = express();
  const router = express.Router();

  // set our port to either a predetermined port number if you have set it up, or 3001
  const PORT = process.env.PORT || 5000;
  */
  mongoose.connect(getSecret("dbUri"));

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  // now we should configure the API to use bodyParser and look for JSON data in the request body
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger("dev"));

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  // Answer API requests.
  app.get("/api", function(req, res) {
    res.set("Content-Type", "application/json");
    res.send('{"message":"Hello from the custom server!"}');
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function(request, response) {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });

  app.listen(PORT, function() {
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });

  app.use("/api", router);

  router.get("/api/posts", (req, res) => {
    Post.find({}, { "history.subject": 1, t: 1, id: 1 }, (err, posts) => {
      console.log(posts);
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: posts });
    });
  });

  router.post("/api/posts", (req, res) => {
    Post.find({}, { "history.subject": 1, t: 1, id: 1 }, (err, posts) => {
      if (err) return res.json({ success: false, error: err });
      console.log(posts);
      return res.json({ success: true, data: posts });
    });
  });

  router.get("/api/posts/:postId", (req, res) => {
    const { postId } = req.params;
    if (!postId)
      return res.json({ success: false, error: "No post Id Provided" });
    Post.find({ id: postId }, {}, (err, post) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: post });
    });
  });

  router.get("/api/folders", (req, res) => {
    Post.find().distinct("folders", (err, folders) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, folderdata: folders });
    });
  });

  router.post("/api/folders", (req, res) => {
    Post.find().distinct("folders", (err, folders) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, folderdata: folders });
    });
  });
}
