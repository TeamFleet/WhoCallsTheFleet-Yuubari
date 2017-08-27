import React from 'react'
import classNames from 'classnames'

import ComponentContainer from '@appUI/containers/infos-component'
import Stat from '@appUI/components/stat'

import translate from 'sp-i18n'
import arrResources from '@appData/resources'
import getValue from '@appUtils/get-value'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class EquipmentDetailsComponentScrap extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("equipment_details.scrap")}>
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