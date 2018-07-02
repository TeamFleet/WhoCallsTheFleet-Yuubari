
export default (entity) => {
    if (Array.isArray(entity.relation.cv) && entity.relation.cv.length)
        return __('seiyuu')
    else if (Array.isArray(entity.relation.illustrator) && entity.relation.illustrator.length)
        return __('artist')
    return ''
}
