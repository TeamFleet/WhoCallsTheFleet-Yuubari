let values = {}

export const set = (pathname, scrollY) => {
    if (__SERVER__) return
    if (typeof pathname === 'number')
        return set(location.pathname, scrollY)

    if (scrollY === 0)
        delete values[pathname]
    else
        values[pathname] = scrollY

    // console.log(values)
}

export const get = (pathname) => {
    if (__SERVER__) return 0
    if (typeof pathname === 'undefined')
        return get(location.pathname)

    return values[pathname] || 0
}

export default {
    set,
    get
}