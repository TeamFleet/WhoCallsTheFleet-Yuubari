import { init as dbInit } from '@database'
import prefs from '@api/preferences'

export default () => {
    if (__DEV__) {
        self.logHr()
        console.log('⚓ Client initialing...')
    }

    return prefs.init()

        // 初始化数据库
        .then(() => dbInit())

        // 标记准备状态
        .then(() => {
            if (__CLIENT__ && self._html)
                self._html.classList.add('is-client-ready')
            return true
        })
}
