import shipList from './db/ship_collections.json'
import db from './'

shipList.forEach(collection => {
    collection.list.forEach(type => {
        // type.ships = type.ships.map(shipId => db.ships[shipId])
        type.ships.forEach((arrShips, index) => {
            type.ships[index] = arrShips.map(shipId => db.ships[shipId])
        })
    })
})

export default shipList