import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import ComponentContainer from '../commons/component-container.jsx'
import Swiper from 'UI/components/swiper'
import Icon from 'UI/components/icon'

import db from 'Logic/database'
import getPic from 'Utils/get-pic.js'
// import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './illust.less'

const getExtraIllustPic = (ship, id, illustId) => {
    if (Array.isArray(db.exillusts[id].exclude) && db.exillusts[id].exclude.includes(illustId))
        return getPic(ship, illustId)
    return getPic('ship-extra', id, illustId)
}

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentSlotEquipments extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            swiperIndex: 0
        }

        // console.log(db.exillusts, db.exillustTypes)

        this.pics = []
        this.extraIllusts = props.ship._extraIllust
        const illustIds = [8, 9]
        let ids = ['_']

        if (Array.isArray(this.extraIllusts))
            ids = ids.concat(
                this.extraIllusts.sort((a, b) =>
                    db.exillustTypes[db.exillusts[a].type].sort - db.exillustTypes[db.exillusts[b].type].sort
                )
            )

        ids.forEach(id => {
            illustIds.forEach(illustId => {
                this.pics.push(
                    id === '_' ? getPic(props.ship, illustId) : getExtraIllustPic(props.ship, id, illustId)
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

    onSlideChangeEnd(swiper) {
        this.setState({
            swiperIndex: swiper.realIndex
        })
        // console.log(swiper.activeIndex, swiper.realIndex)
    }

    renderExillustName(type) {
        const time = db.exillustTypes[type]._time
        return (
            <CSSTransition
                key={type}
                classNames="transition"
                timeout={200}
            >
                <span className="illust-name">
                    {db.exillustTypes[type]._name}
                    {time && <small>({time})</small>}
                </span>
            </CSSTransition>
        )
    }

    render() {
        const currentExtraIllustId = this.extraIllusts && this.extraIllusts[Math.floor((this.state.swiperIndex - 2) / 2)]
        return (
            <ComponentContainer className={this.props.className}>
                <Swiper
                    slides={this.pics.map(url => <img data-src={url} className="swiper-lazy" />)}

                    slidesPerView={2}
                    slidesPerGroup={2}
                    spaceBetween={10}

                    controlsWrapper={true}

                    pagination={true}

                    prevButton={<Icon className="icon" icon="loop" />}
                    nextButton={<Icon className="icon" icon="search" />}

                    grabCursor={true}
                    mousewheelControl={true}

                    preloadImages={false}
                    lazyLoading={true}
                    lazyLoadingInPrevNext={true}
                    lazyLoadingInPrevNextAmount={2}

                    breakpoints={{
                        480: {
                            slidesPerView: 1,
                            slidesPerGroup: 1
                        },
                        1152: {
                            slidesPerView: 2,
                            slidesPerGroup: 2
                        },
                        1440: {
                            slidesPerView: 1,
                            slidesPerGroup: 1
                        }
                    }}

                    onSlideChangeEnd={this.onSlideChangeEnd.bind(this)}
                >
                    {__CLIENT__ && (
                        <TransitionGroup component="div" className="illust-name-container" appear={true}>
                            {currentExtraIllustId
                                && db.exillusts[currentExtraIllustId]
                                && db.exillusts[currentExtraIllustId].type
                                && this.renderExillustName(db.exillusts[currentExtraIllustId].type)
                            }
                        </TransitionGroup>
                    )}
                </Swiper>
            </ComponentContainer>
        )
    }
}