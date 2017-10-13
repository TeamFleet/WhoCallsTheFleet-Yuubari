
import translate from 'sp-i18n'

export default (entity) => {
    if (Array.isArray(entity.relation.cv) && entity.relation.cv.length)
        return translate('seiyuu')
    else if (Array.isArray(entity.relation.illustrator) && entity.relation.illustrator.length)
        return translate('artist')
    return ''
}