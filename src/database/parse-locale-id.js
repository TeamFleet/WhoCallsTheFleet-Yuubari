/**
 * 根据语种ID，返回 KCKit 所用的语言ID
 * @param {String} localeId 
 * @returns {String}
 */
const parseLocaleId = (localeId) => {
    // console.log('parseLocaleId', { localeId })
    if (/^zh/.test(localeId)) return 'zh_cn'
    if (/^en/.test(localeId)) return 'en_us'
    // if (/^ja/.test(localeId)) return 'ja_jp'
    return 'ja_jp'
}

export default parseLocaleId
