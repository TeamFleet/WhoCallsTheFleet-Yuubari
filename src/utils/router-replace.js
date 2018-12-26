import { history } from 'koot'

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
