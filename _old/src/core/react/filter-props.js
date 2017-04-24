/**
 * Filter & parse this.props for React component
 * 
 * @param {object} _props - original props
 * @param {object} [settings={}]
 * @param {string} [settings.className] - className for component
 * @param {object[]} [settings.filterProps] - property that will be ignored
 * @returns {object} parsed props
 * 
 * process if original props (_props) has following keys:
 *      color, size
 *          if has className, will generate following new className `${className}-${color}` & `${className}-${size}`
 *      active
 *          will generate new className `active`
 */
const filterProps = (
    _props = {},
    settings = {}
) => {
    if (typeof settings == 'string')
        return filterProps(_props, { className: settings })

    let props = {},
        className = settings.className || null,
        filterProps = settings.filterProps || [],
        extraClass = []

    for (let i in _props) {
        if (filterProps.indexOf(i) > -1)
            continue;
        switch (i) {
            case 'children':
                break;
            case 'className':
            case 'color':
            case 'size':
                if (!className)
                    props[i] = _props[i]
                break;
            case 'active':
                extraClass.push('active')
                break;
            default:
                props[i] = _props[i]
        }
    }

    if (_props.className) {
        extraClass = extraClass.concat(_props.className)
    }
    if (className) {
        if (_props.color)
            extraClass.push(className + '-' + _props.color)
        if (_props.size)
            extraClass.push(className + '-' + _props.size)
        props.className = [className].concat(extraClass).join(' ')
    }

    return props
}

export default filterProps