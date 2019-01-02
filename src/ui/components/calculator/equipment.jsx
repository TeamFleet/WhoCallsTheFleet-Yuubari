import React from 'react'
import { get } from 'kckit'
import { extend } from 'koot'

import Icon from '@ui/components/icon'
import Link from '@ui/components/link'
import IconEquipment from '@ui/components/icon-equipment'

const CalculatorEquipment = extend({
    styles: require('./equipment.less')
})(
    ({
        equipment: _equipment,
        className,
        isNotLink,
        displayName,
        componentInput
    }) => {
        const equipment = get.equipment(_equipment)
        const isRequired = className.includes('is-required')
        return (
            <div className={className} data-equipment-id={equipment.id}>
                <span className="equipment">
                    {isNotLink &&
                        <span className="name">
                            <IconEquipment className="icon" icon={equipment._icon} />
                            {displayName || equipment._name}
                        </span>
                    }
                    {!isNotLink &&
                        <Link className="name color-alt" to={`/equipments/${equipment.id}`}>
                            <IconEquipment className="icon" icon={equipment._icon} />
                            {displayName || equipment._name}
                        </Link>
                    }
                </span>
                {isRequired && <Icon className="icon-required" icon="warning2" />}
                {componentInput}
            </div>
        )
    }
)
export default CalculatorEquipment
