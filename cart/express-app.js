
const express = require("express");
const cors = require("cors");
const path = require("path");
const { favorite } = require("./routes");

const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true}));
  app.use(express.static(__dirname + "/public"));

  //api
  // appEvents(app);

  const channel = await CreateChannel();
  favorite(app, channel);

  // error handling
};