
const express = require("express");
const cors = require("cors");
const path = require("path");
const { category } = require("./routes");

const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors({ origin:['http://localhost:3000','http://localhost:9001'],credentials:true}));
  app.use(express.static(__dirname + "/public"));

  //api
  // appEvents(app);

  const channel = await CreateChannel();
  category(app, channel);

  // error handling
};