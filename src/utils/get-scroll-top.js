/**
 * 获得当前页面或指定 DOM 的纵向滚动条位置
 * @param {Element} [el] 如无指定，默认为当前页面
 * @returns {Number}
 */
export default (el) => {
    if (!el) return window.pageYOffset
    return el.scrollTop
}
