export default (propName) => {
    if (!window.elementForCheck) window.elementForCheck = document.createElement('a')

    if( typeof window.elementForCheck.style[propName] !== 'undefined' )
        return propName

    const prefixes = [
        'webkit',
        'moz',
        'ms',
        'o'
    ]
    let result = ''

    propName = propName.replace(/\-(.){1}/g, letter => letter.substr(1).toUpperCase())

    prefixes.some(prefix => {
        let vendorCheck = prefix + propName
        if( typeof window.elementForCheck.style[vendorCheck] !== 'undefined' ){
            result = vendorCheck
            return vendorCheck
        }
    })

    return result
}