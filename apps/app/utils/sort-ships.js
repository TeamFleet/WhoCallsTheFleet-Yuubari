import getShip from '@appUtils/get-ship'

export default (list = []) => list
    // .sort((a, b) => {
    //     a = getShip(a)
    //     b = getShip(b)
    //     // console.log(a.series, b.series)
    //     if (a.series !== b.series) return 1
    //     return 0
    //     // return 0 - getShip(a).series - getShip(b).series
    // })
    .sort((a, b) => (
        getShip(a).series !== getShip(b).series
            ? 1
            : 0
        // getShip(a).series - getShip(b).series
    ))
    .sort((a, b) => {
        a = getShip(a)
        b = getShip(b)
        if (a.remodel && b.remodel) {
            if (a.remodel.next === b.id)
                return -1
            if (a.remodel.prev === b.id)
                return 1
        }
        if (a.series === b.series) return a.name.suffix - b.name.suffix
        return a.order - b.order
    })

// export default (list = []) => list.sort((a, b) => (
//     getShip(a).order - getShip(b).order
// ))