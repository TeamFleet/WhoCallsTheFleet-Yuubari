import { get } from 'kckit';

/**
 * @typedef {Object} Ship
 */

/**
 * 获取舰级名与序号（如果有）
 * @param {Ship} ship
 * @returns {string}
 */
const getShipClassAndNumber = ship => {
    if (!ship) return '';

    ship = get.ship(ship);

    if (!ship) return '';

    if (ship.class_no) {
        if (isNaN(ship.class_no)) {
            return (
                __('shipclass', { class: ship._class }) + ' ' + ship.class_no
            );
        }
        return __('shipclass_number', {
            class: ship._class,
            number: ship.class_no
        });
    }
    return __('shipclass', { class: ship._class });
};

export default getShipClassAndNumber;
