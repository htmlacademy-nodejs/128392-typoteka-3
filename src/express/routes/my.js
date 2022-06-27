'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`pages/my/articles`));
myRouter.get(`/comments`, (req, res) => res.render(`pages/my/comments`));
myRouter.get(`/categories`, (req, res) => res.render(`pages/my/categories`));

module.exports = myRouter;
