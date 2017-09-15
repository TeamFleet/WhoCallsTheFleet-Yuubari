import getShip from '@appUtils/get-ship'

export default (list = []) => list.sort((a, b) => (
    0 - getShip(a).series - getShip(b).series
)).sort((a, b) => {
    a = getShip(a)
    b = getShip(b)
    if (a.series === b.series) return a.suffix - b.suffix
    return a.order - b.order
})