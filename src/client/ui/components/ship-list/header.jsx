import React from 'react'
import { connect } from 'react-redux'

import translate from 'super-i18n'
import db from '@appLogic/database'
// import bindEvent from 'bind-event'
import {
    changeCollection,
    filterEnter,
    filterLeave,
    filterInput,
    compareEnter,
    compareLeave,
    compareReset,
    compareChangeState,
    // compareSort
} from '@appLogic/ship-list/api.js'
import classNames from 'classnames'

import MainHeader from '@appUI/components/main-header'
import Icon from '@appUI/components/icon'
// import Button from '@appUI/components/button'
// import ButtonGroup from '@appUI/components/button-group'
import TableHeader from './table-header'

import { ImportStyle } from 'sp-css-import'
import styleHeader from './header.less'

@connect((state, ownProps) => {
    const {
        isModeCompare,
        isModeFilter,
        compareState
    } = state.shipList[ownProps.id] || {}
    return {
        isModeCompare,
        isModeFilter,
        compareState
    }
})
@ImportStyle(styleHeader)
export default class ShipListHeader extends React.Component {
    state = {
        isClassCompare: false
    }

    // componentDidMount() {
    //     bindEvent(
    //         this._wrapper.offsetParent,
    //         'animationend',
    //         (evt) => {
    //             if (evt.animationName === 'ship-list-header-compare-leave') {
    //                 this.props.dispatch(
    //                     compareLeave(this.props.id, true)
    //                 )
    //             }
    //         }
    //     )
    // }

    renderExtraButtons() {
        if (!Array.isArray(this.props.extraButtons)) return null
        return this.props.extraButtons.map((button, index) => {
            switch (button) {
                case 'compare':
                    return (
                        <span
                            className={"link item btn-toggle-compare" + (this.props.isModeCompare ? ' on' : '')}
                            key={index}
                            onClick={() => {
                                if (this.props.isModeCompare)
                                    return this.props.dispatch(compareReset(this.props.id))
                                return this.props.dispatch(compareEnter(this.props.id))
                            }}
                        >
                            <Icon className="icon icon-compare" icon="paragraph-left" />
                            {translate("ship_list.compare.button")}
                            <Icon className="icon-close" icon="cross" />
                        </span>
                    )
                default:
                    return button
            }
        })
    }

    onAnimationEnd(evt) {
        if (evt.animationName === 'ship-list-header-compare-leave') {
            this.props.dispatch(
                compareLeave(this.props.id, true)
            )
        }
    }

    render() {
        return (
            <MainHeader
                data-compare-state={
                    typeof this.props.isModeCompare !== 'undefined'
                        ? this.props.compareState
                        : null
                }
                className={classNames(
                    this.props.className,
                    {
                        'is-filtering': this.props.isModeFilter,
                        'is-compare': typeof this.props.isModeCompare !== 'undefined',
                        'is-compare-leaving': this.props.isModeCompare === false
                    }
                )}
                onAnimationEnd={this.onAnimationEnd.bind(this)}
            >
                <div className="wrapper" ref={el => this._wrapper = el}>
                    <div className="body">
                        <Filter id={this.props.id} />
                        <Tabs id={this.props.id} />
                        {this.props.extraButtons && <ExtraButtons>{this.renderExtraButtons()}</ExtraButtons>}
                    </div>
                    {typeof this.props.isModeCompare !== 'undefined' && <CompareControls id={this.props.id} />}
                    {typeof this.props.isModeCompare !== 'undefined' && <Compare id={this.props.id} />}
                </div>
            </MainHeader>
        )
    }
}

import styleHeaderTabs from './header-tabs.less'
@connect((state, ownProps) => ({
    collection: state.shipList[ownProps.id].collection
}))
@ImportStyle(styleHeaderTabs)
class Tabs extends React.Component {
    onTabClick(collection) {
        this.props.dispatch(
            changeCollection(this.props.id, collection)
        )
    }
    onSelectChange(evt) {
        this.props.dispatch(
            changeCollection(this.props.id, parseInt(evt.target.value))
        )
    }
    render() {
        return (
            <div className={this.props.className}>
                <label className="select">
                    <select className="select-select" onChange={this.onSelectChange.bind(this)} value={this.props.collection}>
                        {db.shipCollections.map((collection, index) => (
                            <option
                                key={index}
                                value={index}
                            >
                                {collection.name}
                            </option>
                        ))}
                    </select>
                    {this.props.collection > -1 && db.shipCollections[this.props.collection].name}
                </label>
                {db.shipCollections.map((collection, index) => (
                    <span
                        key={index}
                        className={'link item' + (this.props.collection === index ? ' on' : '')}
                        onClick={() => {
                            this.onTabClick(index)
                        }}
                    >
                        {collection.name}
                    </span>
                ))}
            </div>
        )
    }
}

// class TabItem extends React.Component {
//     render() {
//         return (
//             <span
//                 onClick={this.props.onClick}
//                 className={'link item' + this.props.className}
//             >
//                 {this.props.children}
//             </span>
//         )
//     }
// }

import styleHeaderFilter from './header-filter.less'
@connect((state, ownProps) => ({
    filterInput: state.shipList[ownProps.id].filterInput
}))
@ImportStyle(styleHeaderFilter)
class Filter extends React.Component {
    onInput(evt) {
        if (typeof this.debounceInput !== 'undefined') clearTimeout(this.debounceInput)
        let value = evt.target.value
        this.debounceInput = setTimeout(() => {
            this.props.dispatch(
                filterInput(this.props.id, value)
            )
        }, 100)
    }

    onFocus() {
        this.props.dispatch(
            filterEnter(this.props.id)
        )
    }

    onBlur(evt) {
        if (evt.target.value === '')
            this.props.dispatch(
                filterLeave(this.props.id)
            )
    }

    onCloseClick(/*evt*/) {
        this.el.value = ""
        this.el.dispatchEvent(new Event('input', { bubbles: true }))
        this.el.dispatchEvent(new Event('blur', { bubbles: true }))
        // evt.currentTarget.dispatchEvent(new Event('blur', { bubbles: true }))
    }

    render() {
        if (typeof this.defaultInput === 'undefined')
            this.defaultInput = this.props.filterInput
        return (
            <div className={this.props.className}>
                <Icon className="icon-search" icon="search" />
                <span className="btn-close" onClick={this.onCloseClick.bind(this)}>
                    <Icon className="icon-close" icon="cross" />
                </span>
                <input
                    className="input"
                    type="text"
                    placeholder={translate('ship_list.filter.placeholder')}
                    onInput={this.onInput.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    defaultValue={this.defaultInput}
                    ref={(c) => this.el = c}
                />
            </div>
        )
    }
}

import styleHeaderExtraButtons from './header-extra-buttons.less'
@ImportStyle(styleHeaderExtraButtons)
class ExtraButtons extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        )
    }
}

import styleHeaderCompareHeader from './header-compare-header.less'
@connect((state, ownProps) => ({
    // isModeCompare: state.shipList[ownProps.id].isModeCompare,
    compareState: state.shipList[ownProps.id].compareState,
    count: state.shipList[ownProps.id].compareList.length
}))
@ImportStyle(styleHeaderCompareHeader)
class Compare extends React.Component {
    compareStart() {
        if (__CLIENT__)
            window.scrollTo(undefined, 0)
        this.props.dispatch(
            compareChangeState(this.props.id, 'comparing')
        )
    }
    compareReset() {
        this.props.dispatch(
            compareReset(this.props.id)
        )
    }
    render() {
        // <button
        //     type="button"
        //     className="btn-reset"
        //     onClick={this.compareReset.bind(this)}
        // >
        //     <Icon className="icon-close" icon="cross" />
        // </button>
        // {translate("ship_list.compare.selected", { count: this.props.compareList.length })}
        return (
            <div className={this.props.className}>
                <div className="selecting">
                    <div className="wrapper">
                        <button
                            type="button"
                            className="btn-start-compare"
                            disabled={!this.props.count}
                            onClick={this.compareStart.bind(this)}
                        >
                            {this.props.count
                                ? translate("ship_list.compare.selected_to_start", { count: this.props.count })
                                : translate("ship_list.compare.wait_for_selection")
                            }
                        </button>
                    </div>
                </div>
                <div className="comparing">
                    <div className="wrapper">
                        <TableHeader id={this.props.id} />
                    </div>
                </div>
            </div>
        )
    }
}

import styleHeaderCompareControls from './header-compare-controls.less'
@connect((state, ownProps) => ({
    compareSortType: state.shipList[ownProps.id].compareSort[0]
}))
@ImportStyle(styleHeaderCompareControls)
class CompareControls extends React.Component {
    compareReset() {
        if (__CLIENT__)
            window.scrollTo(undefined, 0)
        this.props.dispatch(
            compareReset(this.props.id)
        )
    }
    compareAddRemove() {
        if (__CLIENT__)
            window.scrollTo(undefined, 0)
        this.props.dispatch(
            compareChangeState(this.props.id, 'selecting')
        )
    }
    // compareResetSort() {
    //     this.props.dispatch(
    //         compareSort(this.props.id, false)
    //     )
    // }
    render() {
        return (
            <div className={this.props.className}>
                <div className="group">
                    <button
                        type="button"
                        className="btn btn-reset"
                        onClick={this.compareReset.bind(this)}
                    >
                        <Icon className="icon" icon="puzzle2" />
                        {translate("ship_list.compare.quit")}
                    </button>
                    <button
                        type="button"
                        className="btn btn-modify"
                        onClick={this.compareAddRemove.bind(this)}
                    >
                        <Icon className="icon" icon="puzzle" />
                        {translate("ship_list.compare.add_remove")}
                    </button>
                </div>
            </div>
        )
        /* button: sort tip / reset sort
                    <button
                        type="button"
                        className="btn btn-resort"
                        disabled={!this.props.compareSortType}
                        onClick={this.compareResetSort.bind(this)}
                    >
                        {!this.props.compareSortType && <Icon className="icon" icon="sort-amount-desc" />}
                        {!this.props.compareSortType && translate("ship_list.compare.click_to_sort")}
                        {this.props.compareSortType && <Icon className="icon" icon="paragraph-left" />}
                        {this.props.compareSortType && translate("ship_list.compare.reset_sort")}
                    </button>
        */
    }
}
