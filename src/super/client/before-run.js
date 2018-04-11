
import { register as i18nRegister } from 'sp-i18n'
import { init as dbInit } from '@appLogic/database'
import prefs from '@appLogic/preferences'

export default () => {
    if (__DEV__) {
        self.logHr()
        console.log('⚓ Client initialing...')
    }

    return prefs.init()

        // 注册多语言
        .then(() => i18nRegister(__REDUX_STATE__))

        // 初始化数据库
        .then(() => dbInit())

        // 标记准备状态
        .then(() => {
            if (__CLIENT__ && self._html)
                self._html.classList.add('is-client-ready')
            return true
        })
}
