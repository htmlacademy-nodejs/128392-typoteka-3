'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => res.render(`pages/articles/edit-article`));
articlesRouter.get(`/:id`, (req, res) => res.render(`pages/articles/article`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`pages/articles/edit-article`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`pages/articles/articles-by-category`));

module.exports = articlesRouter;
