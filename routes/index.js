import express from 'express';
const app = express();

app.use('/api', require('./acronyms/acronym'));
app.use('/api/random', require('./acronyms/randomAcronym'));

module.exports = app;