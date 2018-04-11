export default value => {
    if (value === false) return '-'
    if (value === undefined) return '?'
    return value
}