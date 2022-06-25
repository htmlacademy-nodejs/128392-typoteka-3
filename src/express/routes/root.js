'use strict';

const {Router} = require(`express`);
const rootRouter = new Router();

rootRouter.get(`/`, (req, res) => res.render(`pages/main`));
rootRouter.get(`/register`, (req, res) => res.render(`pages/register`));
rootRouter.get(`/login`, (req, res) => res.render(`pages/login`));
rootRouter.get(`/search`, (req, res) => res.render(`pages/search`));

module.exports = rootRouter;
