import express from 'express';
const app = express();


app.use("/api/users", require("./users/registerUsers"));
app.use("/api/users", require("./users/authUsers"));
app.use("/api/users", require("./users/userImages"));
app.use("/api/users", require("./users/userCart"));

module.exports = app;