import { setInstallPWAEvent } from '@api/app/api'

/**
 * 通过 beforeinstallprompt 事件手动安装 PWA
 * @param {Event} evt beforeinstallprompt 事件
 * @param {Function} dispatch store.dispatch
 * @returns {Promise}
 */
export default (evt, dispatch) => new Promise(resolve => {
    if (!evt)
        return false

    // console.log('🎯 Install App button clicked')
    // The user has had a postive interaction with our app and Chrome
    // has tried to prompt previously, so let's show the prompt.
    evt.prompt();
    // Follow what the user has done with the prompt.
    evt.userChoice.then(function (choiceResult) {
        // console.log(choiceResult.outcome)
        if (choiceResult.outcome == 'dismissed') {
            // console.log('🎯 User cancelled home screen install')
            return resolve(false)
        } else {
            // console.log('🎯 User added to home screen')
            if (typeof dispatch === 'function') {
                return dispatch(setInstallPWAEvent(false))
            }
            return resolve(true)
        }
    })
})

export let eventPromptBeforeReact = false
export const handlerBeforeReact = () => {
    window.addEventListener('beforeinstallprompt', (evt) => {
        // console.log('🎯 beforeinstallprompt Event fired')
        evt.preventDefault()
        eventPromptBeforeReact = evt
        return false
    })
}
