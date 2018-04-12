import path from 'path'

export default (dir, value) => {
    if (typeof value === 'string' && value.substr(0, 2) === './') {
        return require(path.resolve(dir, value))
    }
    return value
}
