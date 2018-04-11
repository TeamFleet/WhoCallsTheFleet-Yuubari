import React from 'react'
import { get } from 'kckit'

import Icon from '@appUI/components/icon'
import Link from '@appUI/components/link'
import IconEquipment from '@appUI/components/icon-equipment'

import { ImportStyle } from 'sp-css-import'
import styles from './equipment.less'

@ImportStyle(styles)
export default class CalculatorEquipment extends React.Component {
    render() {
        const equipment = get.equipment(this.props.equipment)
        const isRequired = this.props.className.includes('is-required')
        return (
            <div className={this.props.className} data-equipment-id={equipment.id}>
                <span className="equipment">
                    {this.props.isNotLink &&
                        <span className="name">
                            <IconEquipment className="icon" icon={equipment._icon} />
                            {this.props.displayName || equipment._name}
                        </span>
                    }
                    {!this.props.isNotLink &&
                        <Link className="name" to={`/equipments/${equipment.id}`}>
                            <IconEquipment className="icon" icon={equipment._icon} />
                            {this.props.displayName || equipment._name}
                        </Link>
                    }
                </span>
                {isRequired && <Icon className="icon-required" icon="warning2" />}
                {this.props.componentInput}
            </div>
        )
    }
}