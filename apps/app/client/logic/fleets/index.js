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
} from '../../redux/action-types.js'

import routerPush from '@appUtils/router-push'
import routerReplace from '@appUtils/router-replace'




/**************************************
 * Nedb store for fleets builds
 *************************************/

let db
export default db





/**************************************
 * Defaults data for build
 *************************************/

const defaults = {
    history: [],

    data: [],

    name: undefined,
    name_airfields: [],
    hq_lv: -1,
    note: undefined,

    theme: 0,

    rating: -1,
}




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
                    self.Nedb = module
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
            resolve(docs)
            // resolve(docs.concat([
            //     {
            //         _id: '123'
            //     },
            //     {
            //         _id: '456'
            //     },
            // ]))
        })
    }))

export const getBuildUrl = (build = {}) => {
    if (!build._id || !Array.isArray(build.data))
        return undefined
    return `/fleets/${build._id}.${compressToEncodedURIComponent(JSON.stringify(build))}`
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
export const editBuild = (build) => dispatch => initNedb()
    .then(() => {
        dispatch({
            type: FLEETS_NEW_BUILD,
            data: build,
        })
        routerPush(getBuildUrl(build))
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
