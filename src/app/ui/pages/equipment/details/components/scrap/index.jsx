import React from 'react'
import classNames from 'classnames'

import ComponentContainer from '@ui/containers/infos-component'
import Stat from '@ui/components/stat'

import arrResources from '@appData/resources'
import getValue from '@utils/get-value'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class EquipmentDetailsComponentScrap extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={__("equipment_details.scrap")}>
                {arrResources.map((resource, index) => {
                    const value = getValue(this.props.equipment.dismantle[index])
                    return (
                        <Stat
                            className={
                                classNames(['item', {
                                    disabled: !value
                                }])
                            }
                            key={index}
                            stat={resource}
                        >
                            {value}
                        </Stat>
                    )
                })}
            </ComponentContainer>
        )
    }
}
