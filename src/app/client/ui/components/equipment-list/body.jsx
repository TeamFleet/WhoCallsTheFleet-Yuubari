import React from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import classNames from 'classnames'

// import translate from 'sp-i18n'
import db from '@appLogic/database'
import {
    init as listInit,
    // reset as listReset
} from '@appLogic/equipment-list/api.js'
// import { REALTIME_LOCATION_REDUCER_NAME } from '@app/client/redux/realtime-location'

// import Title from './title.jsx'
// import List from './list.jsx'
import Header from './header.jsx'
// import TableBody from './table-body.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './body.less'

@connect((state, ownProps) => ({
    // ...state.shipList[ownProps.id],
    isInit: state.equipmentList[ownProps.id] ? true : false,
    // location: state[REALTIME_LOCATION_REDUCER_NAME]
}))
// @ImportStyle(style)
export default class EquipmentList extends React.Component {
    // componentWillMount() {
    //     if (this.props.isInit && this.props.location && this.props.location.action === 'PUSH')
    //         this.props.dispatch(listReset(this.props.id))
    // }

    render() {
        if (!this.props.isInit) {
            this.props.dispatch(
                listInit(this.props.id)
            )
            // return null
        }

        return <EquipmentListBody { ...this.props } />
    }
}

// @connect((state, ownProps) => ({
//     ...state.equipmentList[ownProps.id],
//     // location: state.location
// }))
@connect((state, ownProps) => state.equipmentList[ownProps.id])
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
                    <div
                        className={classNames({
                            'first': typeIndex === 0,
                            'last': typeIndex === collection.list.length - 1
                        })}
                    >
                        <h2>{type.type}</h2>
                        <div>{JSON.stringify(type.equipments)}</div>
                    </div>
                </CSSTransitionComponent>
            )
        })
        // return collection.list.map((type, typeIndex) => {
        //     return (
        //         <CSSTransitionComponent key={index + typeIndex}>
        //             <Title id={this.props.id} type={type.type} />
        //             <TableBody id={this.props.id} equipments={type.equipments} />
        //             {/* <div
        //                 className={classNames({
        //                     'first': typeIndex === 0,
        //                     'last': typeIndex === collection.list.length - 1
        //                 })}
        //             >
        //                 <Title type={type.type} id={this.props.id} />
        //                 <List
        //                     id={this.props.id}
        //                     equipments={type.equipments}
        //                 />
        //             </div> */}
        //         </CSSTransitionComponent>
        //     )
        // })
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