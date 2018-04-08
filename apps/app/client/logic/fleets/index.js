import {
    FLEETS_INIT,
    // FLEETS_REFRESH,

    FLEETS_NEW_BUILD,
    FLEETS_REMOVE_BUILD,
    FLEETS_UPDATE_BUILD,
} from '../../redux/action-types.js'

let db

export default db

const getNedb = () =>
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
                filename: 'fleets'
            })
            db.loadDatabase(err => {
                if (err) return reject(err)
                resolve()
            })
        }))

export const init = () => dispatch => getNedb()
    // 初始化并读取舰队数据
    .then(() => new Promise((resolve, reject) => {
        db.find({}, (err, docs) => {
            if (err) return reject(err)
            resolve(docs)
        })
    }))
    // 
    .then(docs => (
        dispatch({
            type: FLEETS_INIT,
            builds: docs.map(doc => doc._id),
        })
    ))

// export const refresh = () => dispatch => getNedb()
//     // 初始化并读取舰队数据
//     .then(() => new Promise((resolve, reject) => {
//         db.find({}, (err, docs) => {
//             if (err) return reject(err)
//             resolve(docs)
//         })
//     }))
//     // 
//     .then(docs => (
//         dispatch({
//             type: FLEETS_REFRESH,
//             builds: docs.map(doc => doc._id),
//         })
//     ))

export const newBuild = () => dispatch => dispatch(
    actions.newBuild()
)

export const removeBuild = (id) => dispatch => dispatch(
    actions.removeBuild(id)
)

export const updateBuild = (id, data) => dispatch => dispatch(
    actions.updateBuild(id, data)
)
