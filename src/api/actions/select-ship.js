import { history } from 'koot'
if (__DEV__) console.warn('TODO: [@actions/select-ship] use `history` from global')

export default () => {

    if (__SERVER__) return

    console.log(history)

    // TODO:
}
