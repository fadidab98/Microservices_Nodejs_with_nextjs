
const express = require("express");
const cors = require("cors");
const {  post } = require("./routes");
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
 
  app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true}));

  app.use(cookieParser());
  app.use(csurf({ cookie: true }));
  /* app.use(
    helmet.contentSecurityPolicy({
      // Specify your Content-Security-Policy rules here
      // Example rules:
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'self'"],
      },
    })
  );
  app.use(helmet.frameguard({ action: 'sameorigin' }));
  app.disable('x-powered-by');
  //api
  // appEvents(app);
  app.use((req, res, next) => {
    res.on('header', () => {
      const cookies = res.getHeader('Set-Cookie');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
      if (cookies) {
        if (typeof cookies === 'string') {
          // If there's only one cookie, convert it to an array
          res.setHeader('Set-Cookie', [`${cookies}; HttpOnly`]);
        } else if (Array.isArray(cookies)) {
          // If there are multiple cookies, add HttpOnly flag to each of them
          res.setHeader('Set-Cookie', cookies.map(cookie => `${cookie}; HttpOnly`));
        }
      }
    });
    next();
  }); */
  //api
  // appEvents(app);

  const channel = await CreateChannel();
  post(app, channel);

  // error handling
};