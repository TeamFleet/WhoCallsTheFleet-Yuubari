export default (state, props) => {
    if (
        __SERVER__ ||
        typeof state.realtimeLocation !== 'object' ||
        typeof state.realtimeLocation.pathname === 'undefined'
    )
        return false
    if (__SPA__)
        return (state.realtimeLocation.hash.substr(1) !== props.location.pathname)
    return (state.realtimeLocation.pathname !== props.location.pathname)
}
