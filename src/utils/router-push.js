import { getHistory } from 'koot';

export default (uri) => {
    if (__SERVER__) return;

    // console.log(
    //     (__SPA__ ? '' : location.pathname)
    //     + (uri.substr(0, 1) !== '/' ? '/' : '')
    //     + uri
    // )

    getHistory().push((uri.substr(0, 1) !== '/' ? '/' : '') + uri);
};
