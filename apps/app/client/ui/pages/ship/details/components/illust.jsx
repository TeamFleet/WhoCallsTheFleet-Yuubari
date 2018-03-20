import React from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import ComponentContainer from '@appUI/containers/infos-component'
import Swiper from '@appUI/components/swiper'
import Icon from '@appUI/components/icon'

import { ImportStyle } from 'sp-css-import'
import db from '@appLogic/database'
import getPic from '@appUtils/get-pic.js'
import {
    // init as shipDetailsInit,
    // reset as shipDetailsReset,
    // changeTab as shipDetailsChangeTab,
    update as shipDetailsUpdate
} from '@appLogic/infospage/api.js'
import { getInfosId } from '../../details'
// import translate from 'sp-i18n'

const ILLUSTINDEX = 'illustIndex'

const getExtraIllustPic = (ship, id, illustId) => {
    if (db.exillusts[id] && Array.isArray(db.exillusts[id].exclude) && db.exillusts[id].exclude.includes(illustId))
        return getPic(ship, illustId)
    return getPic('ship-extra', id, illustId)
}

// @connect()
@connect((state, ownProps) => ({
    // ...state.infosPage[getInfosId(ownProps.ship.id)]
    defaultIndex: state.infosPage[getInfosId(ownProps.ship.id)]
        ? state.infosPage[getInfosId(ownProps.ship.id)][ILLUSTINDEX]
        : undefined
}))
@ImportStyle(require('./illust.less'))
export default class ShipDetailsComponentIllust extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            swiperIndex: this.props.defaultIndex || 0
        }

        // console.log(db.exillusts, db.exillustTypes)
        // this.swiper

        this.pics = []
        this.extraIllusts = props.ship._extraIllust
        const illustIds = [8, 9]
        let ids = ['_']

        if (Array.isArray(this.extraIllusts))
            ids = ids.concat(
                this.extraIllusts.sort((a, b) => {
                    if (!db.exillusts[a]) return 1
                    if (!db.exillusts[b]) return -1
                    return db.exillustTypes[db.exillusts[a].type].sort - db.exillustTypes[db.exillusts[b].type].sort
                })
            )

        ids.forEach(id => {
            illustIds.forEach(illustId => {
                this.pics.push(
                    id === '_' ? getPic(props.ship, illustId) : getExtraIllustPic(props.ship, id, illustId)
                )
            })
        })
    }

    // componentDidMount() {
    //     if (__CLIENT__) {
    //         const Swiper = require('swiper')
    //         this.illusts = new Swiper(this._container, {
    //             speed: 400,
    //             spaceBetween: 100
    //         });
    //     }
    // }

    // onInit(swiper) {
    //     this.swiper = swiper
    // }

    onSlideChangeEnd(swiper) {
        // console.log('onSlideChangeEnd', swiper)
        this.setState({
            swiperIndex: swiper.realIndex
        })
        if (typeof this.props.onIndexChange === 'function')
            this.props.onIndexChange(swiper.realIndex)
        // if (swiper.progress == 0 || swiper.progress == 1) {
        //     swiper.mousewheelReleaseOnEdges = true
        // } else {
        //     swiper.mousewheelReleaseOnEdges = false
        // }
        // console.log(swiper, swiper.activeIndex, swiper.realIndex)
    }

    renderExillustName(type) {
        const name = db.exillustTypes[type]._name
        const time = db.exillustTypes[type]._time
        return (
            <CSSTransition
                key={type}
                classNames="transition"
                timeout={200}
            >
                <span className="illust-name">
                    {name}
                    {time && time != name && <small>({time})</small>}
                </span>
            </CSSTransition>
        )
    }

    componentWillUnmount() {
        setTimeout(() => {
            this.props.dispatch(
                shipDetailsUpdate(
                    getInfosId(this.props.ship.id),
                    {
                        [ILLUSTINDEX]: this.state.swiperIndex
                    }
                )
            )
        }, 10)
    }

    render() {
        const currentExtraIllustId = this.extraIllusts && this.extraIllusts[Math.floor((this.state.swiperIndex - 2) / 2)]
        return (
            <ComponentContainer className={this.props.className}>
                <Swiper
                    slides={this.pics.map(url => <img data-src={url} className="swiper-lazy" />)}

                    initialSlide={this.props.defaultIndex || 0}

                    slidesPerView={2}
                    slidesPerGroup={2}
                    spaceBetween={10}

                    controlsWrapper={true}

                    pagination={true}

                    prevButton={<Icon className="icon" icon="arrow-left3" />}
                    nextButton={<Icon className="icon" icon="arrow-right3" />}

                    grabCursor={true}
                    touchReleaseOnEdges={true}
                    mousewheel={{
                        releaseOnEdges: true,
                    }}

                    preloadImages={false}
                    lazy={{
                        loadPrevNext: true,
                        loadPrevNextAmount: 2,
                        loadOnTransitionStart: true,
                    }}

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

                    on={{
                        slideChange: this.onSlideChangeEnd.bind(this)
                    }}
                >
                    <TransitionGroup component="div" className="illust-name-container" appear={true}>
                        {currentExtraIllustId
                            && db.exillusts[currentExtraIllustId]
                            && db.exillusts[currentExtraIllustId].type
                            && this.renderExillustName(db.exillusts[currentExtraIllustId].type)
                        }
                    </TransitionGroup>
                </Swiper>
            </ComponentContainer>
        )
    }
}
