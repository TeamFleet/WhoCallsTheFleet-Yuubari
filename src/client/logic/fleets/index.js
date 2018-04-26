import {
    compressToEncodedURIComponent,
    decompressFromEncodedURIComponent,
} from 'lz-string'

import {
    FLEETS_INIT,
    // FLEETS_REFRESH,

    FLEETS_NEW_BUILD,
    FLEETS_REMOVE_BUILD,
    FLEETS_UPDATE_BUILD,

    FLEETS_CURRENT_CHANGE_TAB,
} from '@appRedux/action-types.js'

import routerPush from '@appUtils/router-push'
import routerReplace from '@appUtils/router-replace'




/**************************************
 * Nedb store for fleets builds
 *************************************/

let db
export default db





/**************************************
 * Defaults
 *************************************/
const defaults = {
    history: [],

    fleets: [],
    bases: [],
    name: undefined,
    lv: -1,
    note: undefined,
    theme: 0,

    currentTab: 0,
}
export const maxSubFleetCount = 4
export const defaultShipInFleetCount = 6
export const maxBaseCount = 3
export const maxSquadronInBaseCount = 4




/**************************************
 * Common functions
 *************************************/

const initNedb = () =>
    new Promise(resolve => {
        // 载入Nedb
        if (typeof Nedb === 'undefined')
            return (
                import(/*
                    webpackChunkName: "nedb"
                */ 'nedb/browser-version/out/nedb.min.js'
                ).then(module => {
                    // console.log('nedb', module)
                    self.Nedb = module.default
                    resolve()
                })
            )
        return resolve()
    })
        // 初始化Nedb
        .then(() => new Promise((resolve, reject) => {
            db = new Nedb({
                filename: 'fleets',
                timestampData: true,
            })
            db.loadDatabase(err => {
                if (err) return reject(err)
                resolve()
            })
        }))

const getAllBuilds = () => initNedb()
    // 初始化并读取舰队数据
    .then(() => new Promise((resolve, reject) => {
        db.find({}, (err, docs) => {
            if (err) return reject(err)
            // console.log('getAllBuilds', docs)
            resolve(docs)
        })
    }))

export const isBuildValid = (obj = {}) => (
    typeof obj._id !== 'undefined' &&
    Array.isArray(obj.fleets) &&
    Array.isArray(obj.bases)
)

export const getBuildUrl = (build = {}) => {
    if (!isBuildValid(build))
        return undefined
    const {
        history,
        currentTab,
        ...data
    } = build
    return `/fleets/${build._id}.${compressToEncodedURIComponent(JSON.stringify(data))}`
}

export const decompressBuild = (str) =>
    JSON.parse(decompressFromEncodedURIComponent(str))




/**************************************
 * Redux actions
 *************************************/

// 初始化
export const init = () => dispatch => getAllBuilds()
    // 
    .then(builds => (
        dispatch({
            type: FLEETS_INIT,
            builds,
        })
    ))

// 创建配置
export const newBuild = (isRedirect) => dispatch => initNedb()
    // 新建一条数据
    .then(() => new Promise((resolve, reject) => {
        db.insert(defaults, (err, newDoc) => {   // Callback is optional
            if (err) return reject(err)
            resolve(newDoc)
        });
    }))
    // 
    .then(newDoc => {
        dispatch({
            type: FLEETS_NEW_BUILD,
            data: newDoc,
        })
        if (isRedirect) {
            routerPush(getBuildUrl(newDoc))
        }
        return newDoc
    })

// 开始编辑配置
export const editBuild = (build, isRedirect) => dispatch => initNedb()
    .then(() => {
        build = Object.assign({}, defaults, build)
        dispatch({
            type: FLEETS_NEW_BUILD,
            data: build,
        })
        if (isRedirect) {
            routerPush(getBuildUrl(build))
        }
        return build
    })

export const removeBuild = (id) => dispatch => dispatch(
    actions.removeBuild(id)
)

export const updateBuild = (id, data) => dispatch => dispatch(
    actions.updateBuild(id, data)
)

export const getBuild = (id) => dispatch => dispatch(
    actions.updateBuild(id, data)
)

// 更新当前配置
export const currentChangeTab = (tab) => dispatch => dispatch({
    type: FLEETS_CURRENT_CHANGE_TAB,
    tab,
})
