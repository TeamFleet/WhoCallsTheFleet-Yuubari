export default (location, store) => {
    if (__DEV__) console.log('onHistoryUpdate')
    // // 回调: browserHistoryOnUpdate
    // // 正常路由跳转时，URL发生变化后瞬间会触发，顺序在react组件读取、渲染之前
    // if (__DEV__) {
    //     console.log('🌏 browserHistory update', location)
    //     // console.log(actionUpdate(location))
    // }
    // store.dispatch(actionUpdate(location))
    // // console.log(store.getState())
}
