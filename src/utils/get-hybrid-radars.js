import database from "@database/"
import getShip from '@utils/get-ship'

let listHybridRadars
const listHybridRadarsForShip = {}

/**
 * 获取混合雷达列表
 * - 混合雷达：同时算作对水面和对空雷达
 * @param {Ship|Number} [ship] 如果给定舰娘，则返回该舰娘可装备的混合雷达列表
 * @returns {Equipment[]}
 */
const getHybridRadars = (ship) => {
    if (!listHybridRadars) {
        listHybridRadars = Object.values(database.equipments).filter(equipment => (
            equipment &&
            equipment.isType('SurfaceRadar') &&
            equipment.isType('AARadar')
        ))
    }

    if (ship) {
        ship = getShip(ship)
        if (!listHybridRadarsForShip[ship.id]) {
            listHybridRadarsForShip[ship.id] = listHybridRadars.filter(equipment => ship.canEquip(equipment))
        }
        return listHybridRadarsForShip[ship.id]
    }

    return listHybridRadars
}

export default getHybridRadars
