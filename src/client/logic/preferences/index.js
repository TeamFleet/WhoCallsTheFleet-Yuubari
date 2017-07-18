// import localforage from 'localforage/dist/localforage.min.js'
import localforage from './localforage'
import defaults from './defaults'

let isInit = false

localforage.config({
    name: 'WhoCallsTheFleet'
});

let prefs = {}
let store = {}

Object.defineProperty(prefs, 'init', {
    enumerable: false,
    writable: false,
    value: () => {
        if (__CLIENT__ && !isInit) {
            if (__DEV__) console.log('Preferences initiation...')

            let remainDefaults = Object.assign({}, defaults)
            let keys = []
            let keysToDelete = []

            for (let key in defaults) {
                keys.push(key)
            }

            const define = (key, value) => {
                // prefs[key] = value
                store[key] = value
                Object.defineProperty(prefs, key, {
                    enumerable: true,
                    get: () => store[key],
                    set: value => {
                        store[key] = value
                        localforage.setItem(key, value)
                    }
                })
            }

            return localforage.iterate((value, key/*, iterationNumber*/) => {
                // console.log('iterate', key, value)
                define(key, value)
                if (!keys.includes(key)) keysToDelete.push(key)
                delete remainDefaults[key]
            }).then(() => new Promise(resolve => {
                let chain = new Promise(resolve => resolve())
                keysToDelete.forEach(key => {
                    chain = chain.then(() => localforage.removeItem(key))
                })
                chain = chain.then(() => resolve())
            })).then(() => new Promise(resolve => {
                let chain = new Promise(resolve => resolve())
                for (let key in remainDefaults) {
                    chain = chain.then(() => localforage.setItem(key, remainDefaults[key]))
                        .then(() => {
                            define(key, remainDefaults[key])
                            return true
                        })
                }
                chain = chain.then(() => resolve())
            })).then(() => {
                isInit = true
                if (__DEV__) console.log('Preferences initiation complete!', prefs);
            }).catch(err => {
                isInit = true
                console.log('Preferences initiation error!', err);
            })
        } else {
            isInit = true
        }
    }
})

export default prefs