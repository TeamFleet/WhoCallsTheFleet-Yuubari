import { reset, animationEnd } from './api.js'

export default (evt) => {
    if (!evt) return
    if (evt && evt.nativeEvent) evt = evt.nativeEvent

    // console.log(evt.animationName)

    switch (evt.animationName) {
        case 'app-mode-background-list-enter':
            return animationEnd()
        case 'app-mode-background-original-leave':
            return reset(evt.elapsedTime * 1000 * 2)
    }
}