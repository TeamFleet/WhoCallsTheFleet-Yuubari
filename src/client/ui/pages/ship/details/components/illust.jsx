import React from 'react'

import ComponentContainer from '../commons/component-container.jsx'
import Swiper from 'UI/components/swiper'

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
        if (Array.isArray(props.ship._extraIllust))
            ids = ids.concat(props.ship._extraIllust)
        ids.forEach(id => {
            illustIds.forEach(illustId => {
                this.pics.push(
                    id === '_' ? getPic(props.ship, illustId) : getPic('ship-extra', id, illustId)
                )
            })
        })
    }

    componentDidMount() {
        if (__CLIENT__) {
            const Swiper = require('swiper')
            this.illusts = new Swiper(this._container, {
                speed: 400,
                spaceBetween: 100
            });
        }
    }

    render() {
        return (
            <ComponentContainer className={this.props.className}>
                <Swiper
                    slides={this.pics.map(url => <img src={url} />)}

                    slidesPerView={2}
                    slidesPerGroup={2}

                    pagination={true}

                    prevButton={true}
                    nextButton={true}

                    mousewheelControl={true}

                    breakpoints={{
                        480: {
                            slidesPerView: 1,
                            slidesPerGroup: 1
                        },
                        1024: {
                            slidesPerView: 2,
                            slidesPerGroup: 2
                        },
                        1440: {
                            slidesPerView: 1,
                            slidesPerGroup: 1
                        }
                    }}
                />
            </ComponentContainer>
        )
    }
}