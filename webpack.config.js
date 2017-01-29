'use strict';

module.exports = (env) => require(`./src/_webpack/${env.target}.${env.env}.js`)
