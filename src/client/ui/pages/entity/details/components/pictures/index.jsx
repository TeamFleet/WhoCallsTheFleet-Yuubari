import React from 'react'

import Image from '@appUI/components/image'
import ComponentContainer from '@appUI/containers/infos-component'

// import translate from 'super-i18n'
import getPic from '@appUtils/get-pic.js'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class EntityDetailsComponentPictures extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className}>
                <Image className="picture" src={getPic('entity', this.props.entity.id, '2')} />
            </ComponentContainer>
        )
    }
}
