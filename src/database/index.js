// import { localeId } from 'koot'

// import shipCollections from './db/ship_collections.json'
// import equipmentCollections from './db/equipment_collections.json'

// const LZString = __CLIENT__ && require('lz-string')

const {
    register,
} = require('kckit')

// let isInitDb
let db = {}
let lastLocaleId
export let locale = null

/**
 * 更新当前 db 和 KCKit 的语种
 * @param {Object} options
 * @param {Object} [options.localeId] 新语种
 * @param {Object} [options.state] [未提供 localeId 时启用] 当前 redux state
 * @param {Object} [options.store] [未提供 localeId 和 state 时启用] 当前 redux store
 * @returns {String|Boolean} 更新后的 KCKit 中使用的语种值。如果没有更新，返回 false
 */
export const updateLocale = ({ state, store, localeId }) => {

    if (typeof state !== 'object') {
        if (typeof store === 'object' && typeof store.getState === 'function')
            state = store.getState()
    } else if (typeof state.getState === 'function') {
        state = state.getState()
    }

    if (!localeId && typeof state === 'object')
        localeId = state.localeId

    if (!localeId) return false
    if (lastLocaleId !== localeId) {
        locale = localeId
        if (/^zh/.test(localeId)) locale = 'zh_cn'
        else if (/^en/.test(localeId)) locale = 'en_us'
        else if (/^ja/.test(localeId)) locale = 'ja_jp'
        else locale = 'ja_jp'
        lastLocaleId = localeId
        register({
            locale
        })
        return true
    }
    return false
}

// export const init = () =>
//     import(
//         /* webpackChunkName: "database" */
//         './init'
//     ).then(init => init.default())
export { default as init } from './init'

export default db
