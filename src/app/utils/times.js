module.exports = n => f => {
    let iter = i => {
        if (i === n) return
        f(i)
        iter(i + 1)
    }
    return iter(0)
}