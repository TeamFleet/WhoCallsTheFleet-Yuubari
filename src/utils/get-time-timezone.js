// export default hourPlus => {
//     // const hourPlus = 1
//     if (typeof hourPlus === 'string') {
//         switch (hourPlus.toLowerCase()) {
//             case 'jp':
//             case 'tokyo':
//                 hourPlus = 9; break
//         }
//     }

//     const now = new Date()
//     const timezoneOffsetTo = hourPlus * 60 + now.getTimezoneOffset()

//     now.setHours(now.getHours() + Math.floor(timezoneOffsetTo / 60))

//     return now
// }

// http://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/6016329

module.exports = (time = new Date(), hourPlus) => {
    if (typeof hourPlus === 'string') {
        switch (hourPlus.toLowerCase()) {
            case 'jp':
            case 'tokyo':
                hourPlus = 9; break
        }
    }

    if (!(time instanceof Date)) time = new Date(time)
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000)

    // create new Date object for different city
    // using supplied offset
    // console.log(new Date(utc + (3600000 * hourPlus)))
    return new Date(utc + (3600000 * hourPlus))
}