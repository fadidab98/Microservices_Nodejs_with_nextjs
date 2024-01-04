
const express = require("express");
const cors = require("cors");
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const { notifications } = require("./routes");

const { CreateChannel } = require("./utils");
const auth = require("./middlewares/auth");

module.exports = async (app) => {
  app.use(express.json());
 
  app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true}));

  app.use(cookieParser());
  app.use(csurf({ cookie: true }));
 
  const channel = await CreateChannel();

  notifications(app,channel);

  // error handling
};