
const express = require("express");
const cors = require("cors");
const path = require("path");
const { user } = require("./routes");

const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //api
  // appEvents(app);

  const channel = await CreateChannel();
  user(app, channel);

  // error handling
};