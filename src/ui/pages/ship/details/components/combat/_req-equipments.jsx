import React from 'react';
import kckit from 'kckit';
import equipmentTypes from 'kckit/src/types/equipments';

import IconEquipment from '@ui/components/icon-equipment';
import LinkEquipment from '@ui/components/link/equipment';

import { wrapper as moduleClassName } from './index.less';

const getEquipmentType = kckit.get.equipmentType;

/** 简化的装备需求表 */
export default ({ requirements = [] }) => {
    if (Array.isArray(requirements) && requirements.length === 1)
        requirements = requirements[0];

    if (Array.isArray(requirements) && requirements.length)
        return (
            <div className={`${moduleClassName}-require-equipments`}>
                {__('require.equipment_at_least_one', { type: '' })}
                {requirements.map((r, index) => (
                    <React.Fragment key={index}>
                        <br />
                        <Equipment e={r} />
                    </React.Fragment>
                ))}
            </div>
        );

    if (requirements)
        return (
            <div className={`${moduleClassName}-require-equipments`}>
                {__('require.equipment', { type: '' })}
                <Equipment e={requirements} />
            </div>
        );

    return null;
};

const Equipment = ({ e }) => {
    if (/^_[0-9]+$/.test(e)) {
        return (
            <LinkEquipment
                className="color-alt-lighter link-equipment"
                equipment={e.substr(1)}
            />
        );
    }

    if (!isNaN(e)) {
        const t = getEquipmentType(e);
        return (
            <IconEquipment className="equipment" icon={t.icon}>
                {t._name}
            </IconEquipment>
        );
    }

    const t = equipmentTypes[e];
    if (Array.isArray(t)) {
        const t0 = getEquipmentType(t[0]);
        const types = __('equipment_types');
        let name = types[e];
        if (e === 'Jets') name = types.jet;
        return (
            <IconEquipment className="equipment" icon={t0.icon}>
                {name}
            </IconEquipment>
        );
    }

    if (!isNaN(t)) {
        const tt = getEquipmentType(t);
        return (
            <IconEquipment className="equipment" icon={tt.icon}>
                {tt._name}
            </IconEquipment>
        );
    }

    return null;
};
