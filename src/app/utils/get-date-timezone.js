export default hourPlus => {
    // const hourPlus = 1
    if (typeof hourPlus === 'string') {
        switch (hourPlus.toLowerCase()) {
            case 'jp':
            case 'tokyo':
                hourPlus = 9; break
        }
    }

    const now = new Date()
    const timezoneOffsetTo = hourPlus * 60 + now.getTimezoneOffset()

    now.setHours(now.getHours() + Math.floor(timezoneOffsetTo / 60))

    return now
}