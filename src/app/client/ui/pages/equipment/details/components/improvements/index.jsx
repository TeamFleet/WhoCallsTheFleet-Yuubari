import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'

import translate from 'sp-i18n'

// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)
export default class EquipmentDetailsComponentImprovements extends React.Component {
    render() {
        const list = this.props.equipment.improvement || []
        const hasItem = !!(list.length)
        return (
            <ComponentContainer className={this.props.className} title={translate("equipment_details.improvements")}>
                {hasItem && list.map((data, index) => (
                    <EquipmentDetailsComponentImprovementsImprovement data={data} key={index} />
                ))}
                {!hasItem && <span className="disabled">{translate("none")}</span>}
            </ComponentContainer>
        )
    }
}

class EquipmentDetailsComponentImprovementsImprovement extends React.Component {
    render() {
        const { className, data } = this.props
        const upgrade = data[0]
        return (
            <div className={className}>
                {JSON.stringify(this.props.data)}
            </div>
        )
    }
}