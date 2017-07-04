import React from 'react'
// import swiper from 'swiper'

import ComponentContainer from '../commons/component-container.jsx'

import getPic from 'Utils/get-pic.js'
import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './illust.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentSlotEquipments extends React.Component {
    constructor(props) {
        super(props)

        this.pics = []
        const illustIds = [8, 9]
        let ids = ['_']
        if(Array.isArray(props.ship._extraIllust))
            ids = ids.concat(props.ship._extraIllust)
        ids.forEach(id => {
            illustIds.forEach(illustId => {
                this.pics.push(
                    id === '_' ? getPic(props.ship, illustId) : getPic('ship-extra', id, illustId)
                )
            })
        })
    }
    render() {
        return (
            <ComponentContainer className={this.props.className}>
                {this.pics.map((url, index) => <img key={index} src={url} />)}
            </ComponentContainer>
        )
    }
}