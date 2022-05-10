'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);
const util = require(`util`);

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

module.exports.readFileToArray = async (filename) => {
  let lines = [];

  try {
    const buffer = await util.promisify(fs.readFile)(`../../data/${filename}`);
    lines = buffer.toString().split(`\n`);

    if (lines[lines.length - 1] === ``) {
      lines = lines.slice(0, -1);
    }
  } catch (err) {
    console.error(chalk.red(`Не удается прочитать файл ${filename}`));
    console.error(err);
    process.exit(1);
  }

  return lines;
};
