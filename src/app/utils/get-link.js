export default (type, id) => {
    switch (type) {
        case 'ship':
        case 'ships':
            return `/ships/${id}`

        case 'item':
        case 'items':
        case 'equipment':
        case 'equipments':
            return `/equipments/${id}`

        case 'entity':
        case 'entities':
            return `/entities/${id}`
    }
}