/**
 * 根据当前路由/URL获取当前页面 ID 值
 * 
 * - Main 组件根据该值计算页面切换是否需要转场动画
 * - MainHeader 组件根据该值计算是否需要卸载 DOM
 * 
 * @param {Object} location 
 * @returns {String}
 */
const getMainKey = location => {

    if (typeof location !== 'object') {
        if (__CLIENT__)
            location = window.location
        if (__SERVER__)
            return ''
    }

    if (__DEV__) {
        if (/^\/dev-components($|\/)/.test(location.pathname)) {
            return 'dev-components'
        }
    }
    // console.log(location)
    const pathname = location.pathname.substr(0, 1) === '/'
        ? location.pathname.substr(1)
        : location.pathname
    const segs = pathname.split('/')

    if (segs[0] === 'arsenal')
        return segs.slice(0, 1).join('/')

    return segs.slice(0, 2).join('/')

}

export default getMainKey
