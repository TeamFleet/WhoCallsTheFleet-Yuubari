import { reset, animationEnd } from './index.js'

export default (evt) => {
    if (!evt) return
    if (evt && evt.nativeEvent) evt = evt.nativeEvent

    // console.log(evt.animationName)

    switch (evt.animationName) {
        case 'ui-mode-background-list-enter':
            return animationEnd()
        case 'ui-mode-background-original-leave':
            return reset(evt.elapsedTime * 1000 * 2)
    }
}
