'use strict';

module.exports = (env) => require(`./src/_webpack/${env.state}.${env.env}.js`)