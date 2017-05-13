import db from './'

let keywordsSuffixMatches

const filter = (options = {}) => {
    if (!db.shipCollections.length) return []
    if (typeof options === 'string' || typeof options === 'number')
        return filter({ name: options })
    if (options.name === "") return []

    options.name = options.name.toLowerCase()

    if (!keywordsSuffixMatches) {
        keywordsSuffixMatches = {}
        db.shipCollections.forEach(collection => {
            collection.list.forEach(type => {
                type.ships.forEach(ships => {
                    ships.forEach(ship => {
                        if (ship.name.suffix) {
                            for (let i in db.shipNamesuffix[ship.name.suffix]) {
                                if (i == '_id' || i == 'id') return
                                let suffix = db.shipNamesuffix[ship.name.suffix][i].toLowerCase()
                                if (!keywordsSuffixMatches[suffix])
                                    keywordsSuffixMatches[suffix] = []
                                if (keywordsSuffixMatches[suffix].indexOf(ship) < 0)
                                    keywordsSuffixMatches[suffix].push(ship)
                            }
                        }
                    })
                })
            })
        })
    }
    if (options.name in keywordsSuffixMatches)
        return keywordsSuffixMatches[options.name]

    let result = []

    // const t0 = performance.now()

    db.shipCollections.forEach(collection => {
        collection.list.forEach(type => {
            type.ships.forEach(ships => {
                ships.forEach(ship => {
                    for (let i in ship.name) {
                        if (i === 'suffix') return
                        if (result.indexOf(ship) > -1) return
                        if (ship.name[i].toLowerCase().indexOf(options.name) > -1)
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