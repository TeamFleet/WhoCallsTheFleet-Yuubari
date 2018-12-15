import { history } from 'koot'
if (__DEV__) console.warn('TODO: [@utils/router-push] use `history` from global')

export default (uri) => {
    if (__SERVER__) return

    // console.log(
    //     (__SPA__ ? '' : location.pathname)
    //     + (uri.substr(0, 1) !== '/' ? '/' : '')
    //     + uri
    // )

    history.push(
        (uri.substr(0, 1) !== '/' ? '/' : '')
        + uri
    );
}
