'use strict';

module.exports = (env) => require(`./src/webpack/${env.target}.${env.env}.js`)
