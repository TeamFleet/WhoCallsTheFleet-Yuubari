import React, { createContext, useState, useContext, memo } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

import db from '@database';
import pref from '@api/preferences';

import htmlHead from '@utils/html-head';
import getTimeJST from '@utils/get-time-jst';
import getLink from '@utils/get-link';
import getShip from '@utils/get-ship';
import getEquipment from '@utils/get-equipment';
import sortShips from '@utils/sort-ships';
// import routerReplace from '@utils/router-replace'

// import {Link, IndexLink} from 'react-router'
import Page from '@ui/containers/page';

import Link from '@ui/components/link';
import LinkEquipment from '@ui/components/link/equipment';
import Title from '@ui/components/title';
import Button from '@ui/components/button';
import MainHeader from '@ui/components/main-header/main-options';
import {
    DayAndShip as ImprovementDayAndShip,
    Resources as ImprovementResources,
} from '@ui/components/improvement';
import ImprovementStar from '@ui/components/improvement/star';
import Icon from '@components/icon';

// ============================================================================

const daysArr = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thurday',
    'Friday',
    'Saturday',
];

const ArsenalContext = createContext();

// ============================================================================

@extend({
    connect: true,
    pageinfo: (state, renderProps) => {
        const day =
            typeof renderProps.params === 'object'
                ? renderProps.params.day
                : undefined;
        return htmlHead(state, {
            title: [
                __('nav.arsenal'),
                typeof day !== 'undefined'
                    ? __(`day_full`, daysArr[day])
                    : undefined,
            ],
        });
    },
    styles: require('./styles.less'),
})
class PageArsenal extends React.Component {
    state = {
        rendering: true,
        watchList: pref.arsenalWatchList,
        collectionShow: db.equipmentCollections
            .map((c) => c.name)
            .reduce((r, cName) => {
                r[cName] =
                    !Array.isArray(pref.arsenalWatchList) ||
                    !pref.arsenalWatchList.length;
                return r;
            }, {}),
    };

    componentDidMount() {
        // get watchList, update collectionShow
    }

    componentDidUpdate(prevProps, prevState) {
        // const prevParams = prevProps.params || {}
        // const params = this.props.params || {}
        if (prevProps.params.day !== this.props.params.day)
            window.scrollTo(undefined, 0);
        if (prevState.watchList !== this.state.watchList)
            pref.arsenalWatchList = this.state.watchList;
    }

    onRender() {
        // if (!this.state.rendering)
        this.setState({
            rendering: false,
        });
    }
    onRender = this.onRender.bind(this);

    watchAdd(equipmentId, improvementIndex) {
        // console.log('WatchList: add', equipmentId, improvementIndex);
        const value = `${equipmentId}-${improvementIndex}`;
        this.setState((state) => ({
            watchList: Array.isArray(state.watchList)
                ? [...state.watchList, value]
                : [value],
        }));
    }
    watchAdd = this.watchAdd.bind(this);
    watchRemove(equipmentId, improvementIndex) {
        if (!Array.isArray(this.state.watchList)) return;
        const value = `${equipmentId}-${improvementIndex}`;
        this.setState((state) => {
            const index = state.watchList.indexOf(value);
            if (index < 0) return {};
            if (state.watchList.length === 1)
                return {
                    watchList: false,
                };
            state.watchList.splice(index, 1);
            return {
                watchList: [...state.watchList],
            };
        });
    }
    watchRemove = this.watchRemove.bind(this);

    render() {
        const day =
            typeof this.props.params === 'object' &&
            typeof this.props.params.day !== 'undefined'
                ? this.props.params.day
                : -1;
        // console.log(db)
        // console.log('[PageArsenal] render')
        return (
            <ArsenalContext.Provider
                value={{
                    watchList: this.state.watchList,
                    watchAdd: this.watchAdd,
                    watchRemove: this.watchRemove,
                    collectionShow: this.state.collectionShow,
                }}
            >
                <Page
                    className={this.props.className}
                    pathname={this.props.location.pathname}
                    rendering={this.state.rendering}
                    // location={this.props.location}
                    // params={this.props.params}
                    // route={this.props.route}
                    // routeParams={this.props.routeParams}
                    // router={this.props.router}
                    // routes={this.props.routes}
                >
                    <PageArsenalHeader
                        isDay={
                            typeof this.props.params === 'object' &&
                            typeof this.props.params.day !== 'undefined'
                        }
                    />

                    {day > -1 && (
                        <PageArsenalListDay
                            day={day}
                            onRender={this.onRender}
                        />
                    )}
                    {day === -1 && (
                        <PageArsenalListAll onRender={this.onRender} />
                    )}
                </Page>
            </ArsenalContext.Provider>
        );
    }
}
export default PageArsenal;

//

const PageArsenalHeader = extend({
    styles: require('./styles-header.less'),
})((props) => {
    const jst = getTimeJST();
    const jstDay = jst.getDay();
    return (
        <MainHeader
            className={classNames({
                [props.className]: true,
                // 'is-options-show': props.isModeFilter,
            })}
            mainClassName={props.className + '-tabs'}
            main={[
                <PageArsenalHeaderAkashi
                    className={props.className + '-akashi'}
                    key="akashi"
                />,
                <Link
                    key="today"
                    href={`/arsenal/${jstDay}`}
                    replace={true}
                    className={classNames(['tab', 'link-today'])}
                    children={__(`arsenal.filter_by_day`)}
                />,
                ...daysArr.map((day, index) => (
                    <Link
                        key={day}
                        href={`/arsenal/${index}`}
                        replace={true}
                        className={classNames({
                            tab: true,
                            'link-day': true,
                            'is-today': jstDay === index,
                        })}
                        activeClassName="on"
                        children={__(`day_abbr`, day)}
                    />
                )),
                <Link
                    key="all"
                    href="/arsenal"
                    replace={true}
                    className={classNames({
                        tab: true,
                        'link-all': true,
                        on: !props.isDay,
                    })}
                    children={__(`arsenal.all`)}
                />,
            ]}
        />
    );
});

//

const PageArsenalHeaderAkashi = React.memo(({ className }) => {
    const [animation, setAnimation] = useState(
        PageArsenalHeaderAkashi.getAnimation()
    );
    function changeAnimation() {
        setAnimation(PageArsenalHeaderAkashi.getAnimation());
    }
    return (
        <span
            className={className}
            data-blink-animation={animation}
            onAnimationIteration={changeAnimation}
        />
    );
});
PageArsenalHeaderAkashi.getAnimation = () => Math.floor(Math.random() * 3 + 1);

//

const PageArsenalList = memo(({ onRender, collections, day }) => {
    const { collectionShow } = useContext(ArsenalContext);
    return (
        <>
            <PageArsenalListWatching
                key="collection-WATCH"
                day={day}
                index={-1}
            />
            {collections.map((collection, index) => {
                function _onRender() {
                    if (
                        typeof onRender === 'function' &&
                        index >= collections.length - 1
                    )
                        onRender(this);
                }
                return (
                    <PageArsenalCollection
                        key={`collection-${collection.title}`}
                        title={collection.title}
                        index={index}
                        onRender={_onRender}
                        defaultShow={collectionShow[collection.title]}
                    >
                        {collection.list}
                    </PageArsenalCollection>
                );
            })}
        </>
    );
});
//

const PageArsenalListDay = memo((props) => {
    // console.log('[PageArsenalListDay] render')

    let lastCollection = -1;
    const collectionIndexMap = {};
    const collections = [];

    db.arsenalDays[props.day].forEach((item, _index) => {
        const equipment = getEquipment(item[0]);
        const improvementIndex = item[1];

        if (
            !Array.isArray(equipment.improvement) ||
            !equipment.improvement[improvementIndex]
        )
            return null;

        let collection;
        // console.log(db.equipmentCollections)
        db.equipmentCollections.some((o) => {
            o.list.some((l) => {
                if (equipment.type === l.type) collection = o.name;
                return typeof collection !== 'undefined';
            });
            return typeof collection !== 'undefined';
        });
        let index = collectionIndexMap[collection];
        if (
            lastCollection !== collection &&
            typeof collection !== 'undefined'
        ) {
            lastCollection = collection;
            if (typeof collectionIndexMap[collection] === 'undefined') {
                index = collections.length;
                collectionIndexMap[collection] = collections.length;
                collections.push({
                    title: collection,
                    list: [],
                });
            }
            // list.push(
            //     <PageArsenalListTitle key={`title-${collection}`} children={collection} />
            // )
        }

        collections[index].list.push(
            <PageArsenalListItem
                key={JSON.stringify(item)}
                equipment={equipment}
                improvementIndex={improvementIndex}
                requirements={item[2]}
                rawData={item}
                index={_index}
            />
        );
    });

    return <PageArsenalList collections={collections} {...props} />;
});

//

const PageArsenalListAll = memo((props) => {
    // console.log('[PageArsenalListAll] render')

    let lastCollection = -1;
    const collectionIndexMap = {};
    const collections = [];

    db.arsenalAll.forEach((item) => {
        const equipment = getEquipment(item);

        if (
            !Array.isArray(equipment.improvement) ||
            !equipment.improvement.length
        )
            return null;

        let collection;
        // console.log(db.equipmentCollections)
        db.equipmentCollections.some((o) => {
            o.list.some((l) => {
                if (equipment.type === l.type) collection = o.name;
                return typeof collection !== 'undefined';
            });
            return typeof collection !== 'undefined';
        });
        let index = collectionIndexMap[collection];
        if (
            lastCollection !== collection &&
            typeof collection !== 'undefined'
        ) {
            lastCollection = collection;
            if (typeof collectionIndexMap[collection] === 'undefined') {
                index = collections.length;
                collectionIndexMap[collection] = collections.length;
                collections.push({
                    title: collection,
                    list: [],
                });
            }
            // list.push(
            //     <PageArsenalListTitle key={`title-${collection}`} children={collection} />
            // )
        }

        equipment.improvement.forEach((improvement, _index) => {
            collections[index].list.push(
                <PageArsenalListItem
                    key={item + '-' + _index}
                    equipment={equipment}
                    improvementIndex={_index}
                    rawData={item}
                    index={_index}
                />
            );
        });
    });

    return <PageArsenalList collections={collections} {...props} />;
});

//

const PageArsenalListWatching = memo(({ index, day }) => {
    const { watchList } = useContext(ArsenalContext);
    const isEmpty = !(Array.isArray(watchList) && watchList.length > 0);
    return (
        <PageArsenalCollection
            key="collection-WATCH"
            title={__('arsenal.watch_list')}
            index={index}
            defaultShow={true}
            isEmpty={isEmpty}
        >
            {isEmpty ? (
                <div className="empty">
                    <Icon icon="heart4" className="heart" />
                    <span>{__('arsenal.watch_list_start_info')}</span>
                </div>
            ) : (
                watchList.map((value) => {
                    const [equipmentId, improvementIndex] = value.split('-');
                    return (
                        <PageArsenalListItem
                            key={value}
                            equipment={getEquipment(equipmentId)}
                            improvementIndex={improvementIndex}
                            day={day}
                        />
                    );
                })
            )}
        </PageArsenalCollection>
    );
});

//

@extend({
    connect: (state) => ({
        ready: state.app?.ready,
    }),
    styles: require('./styles-collection.less'),
})
class PageArsenalCollection extends React.Component {
    // rendered = false
    // mouted = false

    constructor(props) {
        super(props);
        const render =
            __SERVER__ || props.index === 0 || (__CLIENT__ && !props.ready);
        this.state = {
            render,
            show: this.props.defaultShow,
        };
        if (!render) {
            setTimeout(() => {
                if (!this.mounted) return;
                this.setState({
                    render: true,
                });
                if (typeof props.onRender === 'function') props.onRender(this);
            }, 20 * (props.index || 0));
        } else if (typeof props.onRender === 'function') {
            props.onRender(this);
        }
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    toggle() {
        this.setState((prevState) => ({
            show: !prevState.show,
        }));
    }
    toggle = this.toggle.bind(this);

    render() {
        if (!this.state.render) return null;
        // console.log(this.props.index, this.state.render)
        return (
            <div
                className={classNames([
                    this.props.className,
                    {
                        on: this.state.show,
                        'mod-empty': this.props.isEmpty,
                    },
                ])}
            >
                <Title
                    component="h2"
                    type="line-append"
                    className={classNames([
                        `${this.props.className}-title`,
                        {
                            on: this.state.show,
                        },
                    ])}
                    classNameInner={`${this.props.className}-title-inner`}
                    inherit={true}
                    onClick={this.toggle}
                    key={`${this.props.title}-title`}
                    children={this.props.title.split('&').join(' & ')}
                />
                {this.state.show && (
                    <div
                        /*
                    className={classNames({
                        [`${this.props.className}-list`]: true,
                        'on': this.state.show
                    })}
                    children={this.state.show && this.props.children}
                    */
                        className={`${this.props.className}-list`}
                        children={
                            this.state.render ? this.props.children : undefined
                        }
                        key={`${this.props.title}-list`}
                    />
                )}
            </div>
        );
    }
}

//

// const PageArsenalListItem = extend({
//     styles: require('./styles-item.less'),
// })(
//     memo(
//         ({
//             className,
//             equipment,
//             improvementIndex,
//             requirements,
//             rawData,
//             defaultExpand = false,
//         }) => {
//             const { watchList, watchAdd, watchRemove } = useContext(
//                 ArsenalContext
//             );
//             const [expand, setExpand] = useState(defaultExpand);

//             function toggle() {
//                 setExpand(!expand);
//             }
//             function watch() {
//                 console.log(watchList, rawData);
//             }

//             // componentWillMount() {
//             //     if (!this.state.render)
//             //         setTimeout(() => {
//             //             this.setState({
//             //                 render: true
//             //             })
//             //         }, 1 * (this.props.index || 0))
//             // }
//             // if (!this.state.render) return null

//             const reqShips = [];
//             const data = equipment.improvement[improvementIndex];
//             const hasUpgrade =
//                 Array.isArray(data.upgrade) && data.upgrade.length;
//             const showReqShips = Array.isArray(requirements);

//             if (showReqShips) {
//                 requirements.forEach((index) => {
//                     if (
//                         !Array.isArray(data.req) ||
//                         !data.req[index] ||
//                         !Array.isArray(data.req[index][1])
//                     )
//                         return;
//                     data.req[index][1].forEach((id) => reqShips.push(id));
//                 });
//             }
//             const hasReqShips = reqShips.length ? true : false;
//             const showStar = hasUpgrade && data.upgrade[1] ? true : false;

//             return (
//                 <div className={className}>
//                     <span
//                         className={classNames({
//                             [className + '-equipment']: true,
//                             'has-upgrade': hasUpgrade,
//                         })}
//                     >
//                         <LinkEquipment
//                             className={`${className}-name color-alt-lighter`}
//                             equipment={equipment}
//                         />
//                     </span>
//                     {hasUpgrade && (
//                         <span className={className + '-equipment'}>
//                             <LinkEquipment
//                                 className={`${className}-name color-alt-lighter`}
//                                 equipment={data.upgrade[0]}
//                                 children={
//                                     showStar ? (
//                                         <ImprovementStar
//                                             className={
//                                                 className + '-equipment-star'
//                                             }
//                                             star={data.upgrade[1]}
//                                         />
//                                     ) : undefined
//                                 }
//                             />
//                         </span>
//                     )}

//                     {showReqShips && (
//                         <div className={className + '-ships'}>
//                             {hasReqShips &&
//                                 sortShips(reqShips).map((ship) => {
//                                     ship = getShip(ship);
//                                     return (
//                                         <Link
//                                             className={`${className}-ships-ship color-alt`}
//                                             key={ship.id}
//                                             to={getLink('ship', ship.id)}
//                                             children={ship.getName(
//                                                 __('shipname_dash_none')
//                                             )}
//                                         />
//                                     );
//                                 })}
//                             {!hasReqShips && __('improvement.any_2nd_ship')}
//                         </div>
//                     )}

//                     {!showReqShips && (
//                         <ImprovementDayAndShip
//                             className={className + '-day-and-ships'}
//                             data={data}
//                         />
//                     )}

//                     <div className={className + '-resources'}>
//                         <Button
//                             className={classNames({
//                                 [className + '-resources-toggle']: true,
//                                 'is-expand': expand,
//                             })}
//                             onClick={toggle}
//                             //children={!expand ? __('arsenal.resources_toggle') : undefined}
//                             children={!expand ? '...' : undefined}
//                             data-role="toggle"
//                         />
//                         {expand && <ImprovementResources data={data} />}
//                     </div>

//                     <button
//                         type="button"
//                         className={classNames([`${className}-btn-watch`])}
//                         onClick={watch}
//                     >
//                         <Icon icon="heart4" className="heart" />
//                     </button>
//                 </div>
//             );
//         }
//     )
// );

//

@extend({
    styles: require('./styles-item.less'),
})
class PageArsenalListItem extends React.PureComponent {
    static contextType = ArsenalContext;

    state = {
        expand: this.props.defaultExpand || false,
    };

    toggle() {
        this.setState((state) => ({
            expand: !state.expand,
        }));
    }
    toggle = this.toggle.bind(this);

    watch() {
        const functionName = this.isWatching ? 'watchRemove' : 'watchAdd';
        this.context[functionName](
            this.props.equipment.id, // equipment ID
            this.props.improvementIndex // improvement index for this equipment
        );
        // console.log(this.context, this.props.rawData);
    }
    watch = this.watch.bind(this);

    get isWatching() {
        return (
            Array.isArray(this.context.watchList) &&
            this.context.watchList.includes(
                `${this.props.equipment.id}-${this.props.improvementIndex}`
            )
        );
    }

    // componentWillMount() {
    //     if (!this.state.render)
    //         setTimeout(() => {
    //             this.setState({
    //                 render: true
    //             })
    //         }, 1 * (this.props.index || 0))
    // }
    render() {
        // if (!this.state.render) return null

        const {
            className,
            equipment,
            improvementIndex,
            requirements,
        } = this.props;

        const reqShips = [];
        const data = equipment.improvement[improvementIndex];
        const hasUpgrade = Array.isArray(data.upgrade) && data.upgrade.length;
        const showReqShips = Array.isArray(requirements);

        if (showReqShips) {
            requirements.forEach((index) => {
                if (
                    !Array.isArray(data.req) ||
                    !data.req[index] ||
                    !Array.isArray(data.req[index][1])
                )
                    return;
                data.req[index][1].forEach((id) => reqShips.push(id));
            });
        }
        const hasReqShips = reqShips.length ? true : false;
        const showStar = hasUpgrade && data.upgrade[1] ? true : false;

        return (
            <div className={className}>
                <span
                    className={classNames({
                        [className + '-equipment']: true,
                        'has-upgrade': hasUpgrade,
                    })}
                >
                    <LinkEquipment
                        className={`${className}-name color-alt-lighter`}
                        equipment={equipment}
                    />
                </span>
                {hasUpgrade && (
                    <span className={className + '-equipment'}>
                        <LinkEquipment
                            className={`${className}-name color-alt-lighter`}
                            equipment={data.upgrade[0]}
                            children={
                                showStar ? (
                                    <ImprovementStar
                                        className={
                                            className + '-equipment-star'
                                        }
                                        star={data.upgrade[1]}
                                    />
                                ) : undefined
                            }
                        />
                    </span>
                )}

                {showReqShips && (
                    <div className={className + '-ships'}>
                        {hasReqShips &&
                            sortShips(reqShips).map((ship) => {
                                ship = getShip(ship);
                                return (
                                    <Link
                                        className={`${className}-ships-ship color-alt`}
                                        key={ship.id}
                                        to={getLink('ship', ship.id)}
                                        children={ship.getName(
                                            __('shipname_dash_none')
                                        )}
                                    />
                                );
                            })}
                        {!hasReqShips && __('improvement.any_2nd_ship')}
                    </div>
                )}

                {!showReqShips && (
                    <ImprovementDayAndShip
                        className={className + '-day-and-ships'}
                        data={data}
                        day={this.props.day}
                    />
                )}

                <div className={className + '-resources'}>
                    <Button
                        className={classNames({
                            [className + '-resources-toggle']: true,
                            'is-expand': this.state.expand,
                        })}
                        onClick={this.toggle}
                        //children={!this.state.expand ? __('arsenal.resources_toggle') : undefined}
                        children={!this.state.expand ? '...' : undefined}
                        data-role="toggle"
                    />
                    {this.state.expand && <ImprovementResources data={data} />}
                </div>

                <button
                    type="button"
                    className={classNames([
                        `${className}-btn-watch`,
                        {
                            'is-watching': this.isWatching,
                        },
                    ])}
                    onClick={this.watch}
                >
                    <Icon
                        icon={this.isWatching ? 'heart3' : 'heart4'}
                        className="heart"
                    />
                </button>
            </div>
        );
    }
}
