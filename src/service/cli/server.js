'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;

const {DEFAULT_PORT, FILE_NAME, HttpCode, notFoundMessageText} = require(`../../constants`);

module.exports = {
  name: `--server`,
  run(args) {
    const customPort = Number.parseInt(args[0], 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.get(`/posts`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (_err) {
        res.send([]);
      }
    });

    app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(notFoundMessageText));

    app.listen(customPort, (err) => {
      if (err) {
        console.error(chalk.red(err.message));
      }
      console.info(chalk.green(`Сервер успешно запущен на порту ${customPort}`));
    });
  }
};
