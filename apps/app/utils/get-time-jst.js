// http://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/6016329

module.exports = (time = new Date()) => {
    if (!(time instanceof Date)) time = new Date(time)
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000)

    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (3600000 * +9))
}