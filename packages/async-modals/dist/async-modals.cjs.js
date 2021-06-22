'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./async-modals.cjs.prod.js");
} else {
  module.exports = require("./async-modals.cjs.dev.js");
}
