import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { extend } from 'koot';

import db from '@database';
import {
    init as listInit,
    observer as listObserver,
    highlightColumn as listHighlightColumn,
    // reset as listReset
} from '@api/equipment-list/api.js';
import equipmentTypes from 'kckit/src/types/equipments';

import { observer } from '@ui/hoc/observer';

import Title from './title.jsx';
// import List from './list.jsx'
import Header from './header.jsx';
import TableBody from './table-body';
import TableBodyHeaderInterceptor from './table-body-header-interceptor';

// --------------------------------------------------

@extend({
    connect: (state, ownProps) => ({
        // ...state.shipList[ownProps.id],
        isInit: state.equipmentList[ownProps.id] ? true : false,
        // location: state[REALTIME_LOCATION_REDUCER_NAME]
    }),
})
@observer({
    rootMargin: '50px 0px',
})
class EquipmentList extends React.Component {
    constructor(props) {
        super(props);
        if (!props.isInit) {
            props.dispatch(listInit(props.id));
        }
        props.dispatch(listHighlightColumn(props.id, undefined, undefined));
    }

    render() {
        const { observer, ...props } = this.props;

        if (!this.props.isInit) {
            if (__CLIENT__) return null;
        }

        if (__CLIENT__) {
            this.props.dispatch(listObserver(this.props.id, observer));
        }

        return <EquipmentListBody {...props} />;
    }
}
export default EquipmentList;

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
@extend({
    connect: (state, ownProps) => {
        const { collection } = state.equipmentList[ownProps.id] || {};
        return {
            collection,
        };
    },
    styles: require('./body.less'),
})
class EquipmentListBody extends React.Component {
    renderCollection(collection, index) {
        if (typeof index !== 'undefined') index = index + '-';
        else index = '';
        return collection.list.map((type, typeIndex) => {
            return (
                <CSSTransitionComponent key={index + typeIndex}>
                    <EquipmentListBodyList
                        key={index + typeIndex}
                        id={this.props.id}
                        index={typeIndex}
                        type={type.type}
                        equipments={type.equipments}
                        className={this.props.className + '-list'}
                        isFirst={typeIndex === 0}
                        isLast={typeIndex === collection.list.length - 1}
                    />
                </CSSTransitionComponent>
            );
        });
    }

    renderBody() {
        // console.log(db)
        if (__CLIENT__) {
            // if (__DEV__) console.log(this.props.collection, db.equipmentCollections[this.props.collection])
            return this.renderCollection(
                db.equipmentCollections[this.props.collection],
                'c-' + this.props.collection
            );
        } else {
            return db.equipmentCollections.map(
                this.renderCollection.bind(this)
            );
        }
    }

    componentDidUpdate(prevProps /*, prevState*/) {
        if (prevProps.collection !== this.props.collection)
            window.scrollTo(undefined, 0);
    }

    render() {
        if (__CLIENT__ && __DEV__) {
            // if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('equipmentList', this.props);
            const t0 = performance.now();
            setTimeout(() => {
                // eslint-disable-next-line no-console
                console.log(
                    'Rendering equipment-list took ' +
                        (performance.now() - t0) +
                        ' milliseconds.'
                );
            });
        }

        return (
            <div
                className={this.props.className}
                data-equipmentlist-id={this.props.id}
            >
                {__CLIENT__ && <Header id={this.props.id} />}

                <EquipmentListBodyDataHost id={this.props.id} />

                <TransitionGroup component="div" className="wrapper">
                    {this.renderBody()}
                </TransitionGroup>
            </div>
        );
    }
}

// --------------------------------------------------

@extend({
    connect: (state, ownProps) => ({
        highlightingIndex: state.equipmentList[ownProps.id].highlightingIndex,
        highlightingStat: state.equipmentList[ownProps.id].highlightingStat,
    }),
    styles: require('./body-datahost.less'),
})
class EquipmentListBodyDataHost extends React.Component {
    render() {
        return (
            <div
                className={this.props.className}
                data-highlight-index={this.props.highlightingIndex}
                data-highlight-stat={this.props.highlightingStat}
            />
        );
    }
}

const EquipmentListBodyList = ({
    id,
    type,
    equipments,
    className,
    isFirst,
    isLast,
}) => (
    <div
        className={classNames({
            [className]: true,
            first: isFirst,
            last: isLast,
        })}
    >
        <Title id={id} type={type} />
        {equipmentTypes.Interceptors.includes(type) && (
            <TableBodyHeaderInterceptor />
        )}
        <TableBody id={id} equipments={equipments} />
    </div>
);

// --------------------------------------------------

const CSSTransitionComponent = (props) => (
    <CSSTransition
        {...props}
        classNames="transition"
        timeout={{
            enter: 200,
        }}
        exit={false}
    />
);
