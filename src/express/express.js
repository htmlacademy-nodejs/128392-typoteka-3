'use strict';

const path = require(`path`);
const express = require(`express`);
const chalk = require(`chalk`);
const {EXPRESS_PORT, PUBLIC_DIR, TEMPLATES_DIR} = require(`../constants`);
const rootRouter = require(`./routes/root`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);

const app = express();

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, rootRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);
app.use((req, res) => res.status(404).render(`errors/404`));
app.use((req, res) => res.status(500).render(`errors/500`));

app.listen(EXPRESS_PORT, (err) => {
  if (err) {
    console.error(chalk.red(err.message));
  }
  console.info(chalk.green(`Сервер успешно запущен на порту ${EXPRESS_PORT}`));
});
