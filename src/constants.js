'use strict';

module.exports.DEFAULT_COUNT = 1;

module.exports.MAX_COUNT = 1000;

module.exports.USER_ARGV_INDEX = 2;

module.exports.DEFAULT_COMMAND = `--help`;

module.exports.FILE_NAME = `mocks.json`;

module.exports.DEFAULT_PORT = 3000;

module.exports.notFoundMessageText = `Not found`;

module.exports.ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

module.exports.TimeInMilliseconds = {
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000,
  MONTH: 2592000000,
  THREE_MONTHS: 7776000000
};

module.exports.HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
