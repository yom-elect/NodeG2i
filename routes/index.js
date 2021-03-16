import express from 'express';
const app = express();

app.use("/api/users", require("./acronyms/registerUsers"));

module.exports = app;