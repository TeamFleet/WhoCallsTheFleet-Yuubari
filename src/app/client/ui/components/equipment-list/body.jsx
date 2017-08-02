import React from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import classNames from 'classnames'

import translate from 'sp-i18n'
import db from '@appLogic/database'
import {
    init as listInit,
    reset as listReset
} from '@appLogic/equipment-list/api.js'
import { REALTIME_LOCATION_REDUCER_NAME } from '@app/client/redux/realtime-location'

import Title from './title.jsx'
// import List from './list.jsx'
import Header from './header.jsx'
import TableBody from './table-body.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './body.less'

@connect((state, ownProps) => ({
    // ...state.shipList[ownProps.id],
    isInit: state.equipmentList[ownProps.id] ? true : false,
    location: state[REALTIME_LOCATION_REDUCER_NAME]
}))
// @ImportStyle(style)
export default class EquipmentList extends React.Component {
    componentWillMount() {
        if (this.props.isInit && this.props.location && this.props.location.action === 'PUSH')
            this.props.dispatch(listReset(this.props.id))
    }

    render() {
        if (typeof this.props.collection === 'undefined') {
            this.props.dispatch(
                listInit(this.props.id)
            )
            // return null
        }

        return <EquipmentListBody id={this.props.id} />
    }
}

@connect((state, ownProps) => ({
    ...state.shipList[ownProps.id],
    // location: state.location
}))
@ImportStyle(style)
class EquipmentListBody extends React.Component {

    renderCollection(collection, index) {
        if (typeof index !== 'undefined')
            index = index + '-'
        else
            index = ''
        return collection.list.map((type, typeIndex) => {
            return (
                <CSSTransitionComponent key={index + typeIndex}>
                    <Title type={type.type} id={this.props.id} />
                    <TableBody id={this.props.id} equipments={type.equipments} />
                    {/* <div
                        className={classNames({
                            'first': typeIndex === 0,
                            'last': typeIndex === collection.list.length - 1
                        })}
                    >
                        <Title type={type.type} id={this.props.id} />
                        <List
                            id={this.props.id}
                            equipments={type.equipments}
                        />
                    </div> */}
                </CSSTransitionComponent>
            )
        })
    }

    renderBody() {
        // console.log(db)
        if (__CLIENT__) {
            // if (__DEV__) console.log(db.equipmentCollections[this.props.collection])
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
        }

        return (
            <div className={this.props.className}>
                {__CLIENT__ && <Header id={this.props.id} />}

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