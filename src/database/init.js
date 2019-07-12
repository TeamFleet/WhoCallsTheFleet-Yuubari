import { register } from 'kckit';
import initDatabase from '__FLEET_INIT_DATABASE_ONLY_CLIENT__';
import parseLocaleId from './parse-locale-id';

/**
 * 初始化 KCKit
 * - 服务器端: 仅针对本次请求
 * @param {String} newLocaleId
 * @void
 */
const initKCKit = ({ localeId, store }) => {
    const db = store.__database || initDatabase(store).db;

    register({
        db,
        locale: parseLocaleId(localeId)
    });

    if (__CLIENT__ && __DEV__) {
        console.log('📦 Database inited.', db);
        console.log('🔌 KCKit inited.', require('kckit'));
    }
};

export default initKCKit;
