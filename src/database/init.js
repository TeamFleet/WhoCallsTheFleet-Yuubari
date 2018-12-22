import { register } from 'kckit'
import { store, localeId } from 'koot'

import parseLocaleId from './parse-locale-id'

/**
 * 初始化 KCKit
 * - 服务器端: 仅针对本次请求
 * @param {String} newLocaleId 
 * @void
 */
const initKCKit = (newLocaleId = localeId) => {

    const { database } = store
    const newKCKitLocale = parseLocaleId(newLocaleId)

    console.log('initKCKit', {
        newLocaleId,
        newKCKitLocale,
        register,
    })

    database.shipCollections.forEach(collection => {
        Object.defineProperty(collection, 'name', {
            get: function () {
                return this.names[newKCKitLocale]
            }
        })
    })
    database.equipmentCollections.forEach(collection => {
        Object.defineProperty(collection, 'name', {
            get: function () {
                return this.names[newKCKitLocale]
            }
        })
    })

    register({
        db: database,
        locale: newKCKitLocale
    })

    if (__CLIENT__ && __DEV__) {
        console.log('📦 Database inited.', database)
        console.log('🔌 KCKit inited.', require('kckit'))
    }

    if (__CLIENT__) {
        const kckit = require('kckit')
        console.log('after register', {
            kckit,
            locale: kckit.locale,
            sample: kckit.db.ships[20]._name
        })
    }

}

export default initKCKit
