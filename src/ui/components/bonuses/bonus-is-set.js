/**
 * 检查指定的加成对象是否是套装加成
 * @param {Object} bonus 
 * @returns {Boolean}
 */
const bonusIsSet = bonus => {
    if (typeof bonus !== 'object') return false

    if (typeof bonus.equipments === 'object' || typeof bonus.list === 'object')
        return true

    return false
}

module.exports = bonusIsSet
