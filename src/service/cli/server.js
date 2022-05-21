'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const {DEFAULT_PORT, FILE_NAME, HttpCode, notFoundMessageText} = require(`../../constants`);

module.exports = {
  name: `--server`,
  run(args) {
    const customPort = Number.parseInt(args[0], 10) || DEFAULT_PORT;

    const sendResponse = (res, statusCode, message) => {
      const template = `
        <!Doctype html>
          <html lang="ru">
            <head>
              <title>With love from Node</title>
            </head>
            <body>${message}</body>
          </html>`.trim();

      res.writeHead(statusCode, {
        'Content-Type': `text/html; charset=UTF-8`,
      });

      res.end(template);
    };

    const onClientConnect = async (req, res) => {
      switch (req.url) {
        case `/`:
          try {
            const fileContent = await fs.readFile(`${FILE_NAME}`);
            const mocks = JSON.parse(fileContent);
            const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
            sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
          } catch (err) {
            sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
          }
          break;
        default:
          sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
          break;
      }
    };

    http.createServer(onClientConnect)
      .listen(customPort)
      .on(`listening`, () => {
        console.info(chalk.green(`Ожидаю соединений на ${customPort}`));
      })
      .on(`error`, ({message}) => {
        console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
      });

  }
};
