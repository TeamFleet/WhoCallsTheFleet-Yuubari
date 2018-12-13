import getScrollTop from './get-scroll-top'

let lastScroll = {
    left: 0,
    top: 0
}

let _app
let _main

const prepareDoms = () => {
    if (__SERVER__) return
    if (!_app) _app = document.getElementById('app')
    if (!_main) _main = document.getElementById('main')
}

export const lock = () => {
    prepareDoms()
    lastScroll.top = getScrollTop()
    // document.documentElement.style.overflow = 'hidden'
    _app.classList.add('mod-scroll-locking')
    _main.style.marginTop = `${0 - lastScroll.top}px`
}

export const restore = (toX = lastScroll.left, toY = lastScroll.top) => {
    prepareDoms()
    // document.documentElement.style.overflow = ''
    _app.classList.remove('mod-scroll-locking')
    _main.style.marginTop = ``
    window.scrollTo(toX, toY)
}

export default () => {
    prepareDoms()
}
