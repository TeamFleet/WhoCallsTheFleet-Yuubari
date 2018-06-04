export default (uri) => {
    if (!__CLIENT__) return

    // console.log(
    //     (__SPA__ ? '' : location.pathname)
    //     + (uri.substr(0, 1) !== '/' ? '/' : '')
    //     + uri
    // )

    self.routerHistory.replace(
        (uri.substr(0, 1) !== '/' ? '/' : '')
        + uri
    );
}