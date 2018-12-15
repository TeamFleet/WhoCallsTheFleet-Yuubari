import { history } from 'koot'
if (__DEV__) console.warn('TODO: [@utils/router-replace] use `history` from global')

export default (uri) => {
    if (!__CLIENT__) return

    // console.log(
    //     (__SPA__ ? '' : location.pathname)
    //     + (uri.substr(0, 1) !== '/' ? '/' : '')
    //     + uri
    // )

    history.replace(
        (uri.substr(0, 1) !== '/' ? '/' : '')
        + uri
    );
}
