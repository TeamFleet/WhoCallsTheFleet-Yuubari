import KC from 'kckit/src/kckit.js'


const getPath = (dir) => {
    if (self.nw) {
        const path = require('path')
        const mkdirp = require('mkdirp');
        let result = path.join(self.nw.root, dir)
        if (dir == 'bgimgs') {
            const fs = require('fs')
            try {
                fs.accessSync(result, fs.F_OK);
            } catch (e) {
                result = path.join(self.nw.root, '/app/assets/images/homebg/')
            }
        }
        mkdirp.sync(result)
        return result
    } else {
        if (dir.substr(0, 1) !== '/') dir = '/' + dir
        return dir
    }
}


export const dir = {
    'db': getPath('/app-db/'),
    'bgimgs': getPath('/bgimgs/'),
    'bgimgs_custom': getPath('/app/assets/images/homebg-custom/'),
    'pics': {
        ships: getPath('/pics-ships/'),
        shipsExtra: getPath('/pics-ships-extra/'),
        items: getPath('/pics/items/')
    }
}

export const Ship = KC.Ship
export const Equipment = KC.Equipment
export const Entity = KC.Entity
export const Consumable = KC.Consumable


export const Formula = KC.formula
export const lang = KC.lang
export const joint = KC.joint
export const defaultHqLv = 90
export const shipMaxLv = Ship.lvlMax
export const resourcesTable = ['fuel', 'ammo', 'steel', 'bauxite']


export const statSpeed = KC.statSpeed
export const statRange = KC.statRange
export const textRank = KC.textRank
export const getStatSpeed = KC.getStatSpeed
export const getStatRange = KC.getStatRange
export const getStatSpeedNumber = (speed) => {
    for (let i in statSpeed)
        if (statSpeed[i] == speed) return i
    return -1
}


if (typeof self !== 'undefined') {
    self.KC = KC
    self.KC.path.pics = dir.pics
}