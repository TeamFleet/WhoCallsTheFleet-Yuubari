import initDatabase from '@database/init'
import prefs from '@api/preferences'

export default ({
    localeId, history, store
}) => {

    if (__DEV__) {
        self.logHr()
        console.log('⚓ Client initialing...')
    }

    // 初始化 database
    initDatabase({ localeId, store })

    // 将 history 中的 state.ui 清空
    history.replace({
        ...history.getCurrentLocation(),
        state: {}
    })

    return prefs.init()

        .then(() => {
            // 标记准备状态
            self._html.classList.add('is-client-ready')
            return true
        })
}
