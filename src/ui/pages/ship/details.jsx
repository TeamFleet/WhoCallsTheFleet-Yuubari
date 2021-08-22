import { Component, createElement } from 'react';
// import { connect } from 'react-redux'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { extend } from 'koot';

import htmlHead from '@utils/html-head';
import db from '@database';
import {
    init as shipDetailsInit,
    reset as shipDetailsReset,
    //     TABINDEX
} from '@api/pages';
import getShipTypeName from '@utils/get-ship-type-name';
import getShipClassNameAndNumber from '@utils/get-ship-class-name-and-number';
import getPic from '@utils/get-pic.js';

import InfosPageContainer from '@ui/containers/infos-page';

import Header from './details/commons/header.jsx';

// ============================================================================

const tabsAvailable = [
    'infos',
    'capabilities',
    'bonuses',
    'equipable',
    // 'voicelines',
    // 'availability'
];

const contentComponents = {};
tabsAvailable.forEach((tab, index) => {
    contentComponents[!index ? 'index' : tab] =
        require(`./details/${tab}.jsx`).default;
});

const getDescription = (ship) => {
    return (
        ship._name +
        // 舰级 & 舰种
        `, ${getShipClassNameAndNumber(ship)}` +
        // 类型
        `${ship.class && ship.type ? `, ${getShipTypeName(ship)}` : ''}` +
        // 军籍
        ` | ${__('ship_details.navy')}: ${ship._navyName}` +
        // CV
        `, ${__('seiyuu')}: ${ship._cv}` +
        // 画师
        `, ${__('artist')}: ${ship._illustrator}`
    );
};

export const getInfosId = (id) => `SHIP_${id}`;

// ============================================================================

// @connect((state, ownProps) => state.pages[getInfosId(ownProps.params.id)] || {})
// @ImportStyle(style)
@extend({
    connect: true,
    pageinfo: (state, renderProps) => {
        const id =
            typeof renderProps.params === 'object'
                ? renderProps.params.id
                : undefined;
        const tab =
            typeof renderProps.params === 'object'
                ? renderProps.params.tab
                : undefined;

        if (typeof id === 'undefined') return {};

        const ship = db.ships[id];

        if (!ship) return {};

        return htmlHead(state, {
            title: [
                ship._name,
                typeof tab === 'undefined' || tab === tabsAvailable[0]
                    ? undefined
                    : __('ship_details', tab),
            ],
            subtitle:
                getShipTypeName(ship) +
                (ship.class || ship.class_no ? ' / ' : '') +
                getShipClassNameAndNumber(ship),
            description: getDescription(ship),
            image: state.server.origin + getPic(ship, '8'),
        });
    },
})
class PageShipDetails extends Component {
    constructor(props) {
        super(props);

        if (props.location.action === 'PUSH')
            props.dispatch(shipDetailsReset(getInfosId(props.params.id)));
    }

    get ship() {
        if (!this._data && this.props.params.id)
            this._data = db.ships[this.props.params.id];
        return this._data || undefined;
    }

    onTabChange(/*newTab, newTabIndex*/) {
        // if (newTabIndex !== this.props.tabIndex) {
        // console.log(newTabIndex, this.props.tabIndex)
        // this.props.dispatch(
        //     shipDetailsChangeTab(this.props.params.id, newTabIndex)
        // )
        window.scrollTo(undefined, 0);
        // }
    }
    onTabChange = this.onTabChange.bind(this);

    componentDidMount() {
        this.props.dispatch(
            shipDetailsInit(getInfosId(this.props.params.id), {})
        );
    }

    render() {
        // console.log(this.props.tabIndex, this.props.illustIndex)

        if (!this.ship) return null;

        const currentTab = this.props.params.tab || 'index';

        if (__CLIENT__ && __DEV__)
            // eslint-disable-next-line no-console
            console.log('thisShip', currentTab, this.ship);

        return (
            <InfosPageContainer className={this.props.className}>
                <Header
                    ship={this.ship}
                    tabs={
                        this.ship.type_display
                            ? tabsAvailable
                            : [tabsAvailable[0]]
                    }
                    defaultTabIndex={tabsAvailable.indexOf(
                        this.props.params && this.props.params.tab
                            ? this.props.params.tab
                            : tabsAvailable[0]
                    )}
                    onTabChange={__CLIENT__ ? this.onTabChange : undefined}
                />
                <PageShipDetailsBody ship={this.ship} tab={currentTab}>
                    {this.props.children}
                </PageShipDetailsBody>
            </InfosPageContainer>
        );
    }
}

// ============================================================================

const PageShipDetailsBody = ({ tab, ship }) => {
    if (!tab) return null;
    return createElement(contentComponents[tab], {
        ship: ship,
    });

    // if (!this.props.children) return null
    // return cloneElement(this.props.children, {
    //     ship: this.props.ship
    // })
};

// ============================================================================

export default PageShipDetails;
