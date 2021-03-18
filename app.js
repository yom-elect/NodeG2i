import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import routes from './routes';

const app = express();
app.use(cookieParser());

const whitelist = ["*"];
const corsOption = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOption));

require("dotenv").config();
const mongooseConnect = require("./utils/database").mongooseConnect;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Models

app.use(routes);
const port = process.env.PORT || 3002;
mongooseConnect();

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});