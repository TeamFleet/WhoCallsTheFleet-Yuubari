import initDatabase from '@database/init';
import prefs from '@api/preferences';

export default ({ localeId, history, store }) => {
    if (__DEV__) {
        window.logHr();
        // eslint-disable-next-line no-console
        console.log('⚓ Client initialing...');
    }

    // 初始化 database
    initDatabase({ localeId, store });

    // 将 history 中的 state.ui 清空
    history.replace({
        ...history.getCurrentLocation(),
        state: {},
    });

    return prefs
        .init()

        .then(() => {
            // 标记准备状态
            document.documentElement.classList.add('is-client-ready');
            return true;
        });
};
