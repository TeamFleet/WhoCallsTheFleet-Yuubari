import React from 'react'

import Image from '@appUI/components/image'
import ComponentContainer from '@appUI/containers/infos-component'

import getPic from '@appUtils/get-pic.js'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class EquipmentDetailsComponentIllust extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className}>
                <Image className="illust" src={getPic('equipment', this.props.equipment.id, 'card')} />
            </ComponentContainer>
        )
    }
}
