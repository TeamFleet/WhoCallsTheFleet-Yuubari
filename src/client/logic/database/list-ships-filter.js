import db from './'

const filter = (options = {}) => {
    if (!db.shipCollections.length) return []
    if (typeof options === 'string' || typeof options === 'number')
        return filter({ name: options })
    if (options.name === "") return []

    let result = []
    // const t0 = performance.now()

    db.shipCollections.forEach(collection => {
        collection.list.forEach(type => {
            type.ships.forEach(ships => {
                ships.forEach(ship => {
                    for (let i in ship.name) {
                        if (i === 'suffix') return
                        if (result.indexOf(ship) > -1) return
                        if (ship.name[i].indexOf(options.name) > -1)
                            result.push(ship)
                    }
                })
            })
        })
    })

    // console.log(`Filtering name "${options.name}" took ` + (performance.now() - t0) + " milliseconds.")

    return result
}

export default filter