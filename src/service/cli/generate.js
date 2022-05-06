'use strict';

const fs = require(`fs`);
const {getRandomInt, shuffle} = require(`../../utils`);
const {CATEGORIES, DEFAULT_COUNT, MAX_COUNT, SENTENCES, TITLES, FILE_NAME, TimeInMilliseconds} = require(`../../constants`);
const {ExitCode} = require(`../../constants`);

const generateOffers = (count) => (
  Array.from({length: count}, () => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: new Date(Date.now() - getRandomInt(0, TimeInMilliseconds.THREE_MONTHS)),
    announce: shuffle(SENTENCES).slice(0, getRandomInt(1, SENTENCES.length - 1)).join(` `),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(1, SENTENCES.length - 1)).join(` `),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const countOffer = Number.parseInt(args[0], 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT) {
      console.info(`Не больше 1000 публикаций`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(countOffer), null, 4);

    fs.writeFile(`../../${FILE_NAME}`, content, (err) => {
      if (err) {
        return console.error(`Не удается записать данные в файл...`);
      }

      return console.info(`Готово. Файл ${FILE_NAME} успешно создан.`);
    });
  }
};
