'use strict';

const express = require(`express`);
const {EXPRESS_PORT} = require(`../constants`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);

const app = express();

app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.get(`/`, (req, res) => res.send(`/`));
app.get(`/register`, (req, res) => res.send(`/register`));
app.get(`/login`, (req, res) => res.send(`/login`));
app.get(`/search`, (req, res) => res.send(`/search`));

app.listen(EXPRESS_PORT);
