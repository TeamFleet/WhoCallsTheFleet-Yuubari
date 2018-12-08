/**
 * 确保获得 Array
 * @param {*} item
 * @returns {Array}
 */
module.exports = (item) => {
    if (Array.isArray(item))
        return item
    return [item]
}
