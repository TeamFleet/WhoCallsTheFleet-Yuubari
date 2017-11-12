import React from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import classNames from 'classnames'

// import translate from 'sp-i18n'
import db from '@appLogic/database'
import {
    init as listInit,
    observer as listObserver,
    highlightColumn as listHighlightColumn,
    // reset as listReset
} from '@appLogic/equipment-list/api.js'
import equipmentTypes from 'kckit/src/types/equipments'
// import { REALTIME_LOCATION_REDUCER_NAME } from 'sp-isomorphic-utils/realtime-location'

import Title from './title.jsx'
// import List from './list.jsx'
import Header from './header.jsx'
import TableBody from './table-body'
import TableBodyHeaderInterceptor from './table-body-header-interceptor'

import { observer } from '@appUI/hoc/observer'
import { ImportStyle } from 'sp-css-import'


// --------------------------------------------------


@connect((state, ownProps) => ({
    // ...state.shipList[ownProps.id],
    isInit: state.equipmentList[ownProps.id] ? true : false,
    // location: state[REALTIME_LOCATION_REDUCER_NAME]
}))
@observer({
    rootMargin: "50px 0px"
})
export default class EquipmentList extends React.Component {
    componentWillMount() {
        //     if (this.props.isInit && this.props.location && this.props.location.action === 'PUSH')
        //         this.props.dispatch(listReset(this.props.id))
        this.props.dispatch(
            listHighlightColumn(
                this.props.id,
                undefined, undefined
            )
        )
    }

    render() {
        const {
            observer,
            ...props
        } = this.props

        if (!this.props.isInit) {
            this.props.dispatch(
                listInit(this.props.id)
            )
            if (__CLIENT__) return null
        }

        if (__CLIENT__) {
            this.props.dispatch(
                listObserver(this.props.id, observer)
            )
        }

        return <EquipmentListBody { ...props } />
    }
}


// --------------------------------------------------


// @connect((state, ownProps) => ({
//     ...state.equipmentList[ownProps.id],
//     // location: state.location
// }))
// @connect((state, ownProps) => {
//     const obj = { ...state.equipmentList[ownProps.id] } || {}
//     delete obj.highlightingIndex
//     delete obj.highlightingStat
//     return obj
// })
@connect((state, ownProps) => {
    const {
        collection
    } = state.equipmentList[ownProps.id] || {}
    return {
        collection
    }
})
@ImportStyle(require('./body.less'))
class EquipmentListBody extends React.Component {

    renderCollection(collection, index) {
        if (typeof index !== 'undefined')
            index = index + '-'
        else
            index = ''
        return collection.list.map((type, typeIndex) => {
            return (
                <CSSTransitionComponent key={index + typeIndex}>
                    <div className={classNames({
                        'first': typeIndex === 0,
                        'last': typeIndex === collection.list.length - 1
                    })} >
                        <Title id={this.props.id} type={type.type} />
                        {equipmentTypes.Interceptors.includes(type.type) && (
                            <TableBodyHeaderInterceptor />
                        )}
                        <TableBody id={this.props.id} equipments={type.equipments} />
                    </div>
                </CSSTransitionComponent>
            )
        })
    }

    renderBody() {
        // console.log(db)
        if (__CLIENT__) {
            // if (__DEV__) console.log(this.props.collection, db.equipmentCollections[this.props.collection])
            return this.renderCollection(db.equipmentCollections[this.props.collection], 'c-' + this.props.collection)
        } else {
            return db.equipmentCollections.map(this.renderCollection.bind(this))
        }
    }

    componentDidUpdate(prevProps/*, prevState*/) {
        if (prevProps.collection !== this.props.collection)
            window.scrollTo(undefined, 0)
    }

    render() {
        if (__CLIENT__ && __DEV__) {
            // if (__DEV__) {
            console.log('equipmentList', this.props)
            const t0 = performance.now()
            setTimeout(() => {
                console.log("Rendering equipment-list took " + (performance.now() - t0) + " milliseconds.")
            })
        }

        return (
            <div className={this.props.className}
                data-equipmentlist-id={this.props.id}
            >
                {__CLIENT__ && <Header id={this.props.id} />}

                <EquipmentListBodyDataHost id={this.props.id} />

                <TransitionGroup
                    component="div"
                    className="wrapper"
                >
                    {this.renderBody()}
                </TransitionGroup>

            </div>
        )
    }
}


// --------------------------------------------------


@connect((state, ownProps) => ({
    highlightingIndex: state.equipmentList[ownProps.id].highlightingIndex,
    highlightingStat: state.equipmentList[ownProps.id].highlightingStat
}))
@ImportStyle(require('./body-datahost.less'))
class EquipmentListBodyDataHost extends React.Component {
    render() {
        return (
            <div
                className={this.props.className}
                data-highlight-index={this.props.highlightingIndex}
                data-highlight-stat={this.props.highlightingStat}
            />
        )
    }
}


// --------------------------------------------------


// @connect((state, ownProps) => ({
//     ...state.equipmentList[ownProps.id],
//     // location: state.location
// }))
// @connect()
// @ImportStyle(style)
// class EquipmentListBodyList extends React.Component {
//     render() {
//         return (
//             <div className={this.props.className}>
//                 <Title id={this.props.id} type={this.props.type} />
//                 {this.props.children}
//             </div>
//         )
//     }
// }


// --------------------------------------------------


const CSSTransitionComponent = (props) => (
    <CSSTransition
        {...props}
        classNames="transition"
        timeout={{
            enter: 200
        }}
        exit={false}
    />
);