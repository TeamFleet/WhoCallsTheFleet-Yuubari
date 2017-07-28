export default (bgObj, type = '') => {
    if (bgObj && bgObj.getPath)
        return {
            backgroundImage: bgObj && `url(${bgObj.getPath(type)})`,
            backgroundPosition: bgObj && bgObj.position
        }
    return {}
}