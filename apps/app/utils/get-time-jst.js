const getTimeTZ = require('./get-time-timezone')

// http://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/6016329

module.exports = time => getTimeTZ(time, 9)