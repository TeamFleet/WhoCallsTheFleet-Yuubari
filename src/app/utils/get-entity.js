import db from '@api/database'

export default (item) => {
    if (typeof item === 'object' && item.id)
        return item

    if (typeof item === 'string')
        item = parseInt(item)

    if (typeof item === 'number')
        return db.entities[item]
}
