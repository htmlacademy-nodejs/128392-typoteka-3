'use strict';

const chalk = require(`chalk`);
const util = require(`util`);
const fs = require(`fs`);
const {getRandomInt, shuffle, readFileToArray} = require(`../../utils`);
const {DEFAULT_COUNT, MAX_COUNT, FILE_NAME, TimeInMilliseconds, ExitCode} = require(`../../constants`);

const generateOffers = async (count) => {
  const CATEGORIES = await readFileToArray(`categories.txt`);
  const TITLES = await readFileToArray(`titles.txt`);
  const SENTENCES = await readFileToArray(`sentences.txt`);

  return Array.from({length: count}, () => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: new Date(Date.now() - getRandomInt(0, TimeInMilliseconds.THREE_MONTHS)),
    announce: shuffle(SENTENCES).slice(0, getRandomInt(1, SENTENCES.length - 1)).join(` `),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(1, SENTENCES.length - 1)).join(` `),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const countOffer = Number.parseInt(args[0], 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(await generateOffers(countOffer), null, 4);

    try {
      await util.promisify(fs.writeFile)(`../../${FILE_NAME}`, content);
      console.info(chalk.green(`Готово. Файл ${FILE_NAME} успешно создан.`));
    } catch (err) {
      console.error(chalk.red(`Не удается записать данные в файл...`));
      console.error(err);
    }
  }
};
