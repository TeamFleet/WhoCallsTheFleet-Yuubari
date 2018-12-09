import React from 'react'
import { connect } from 'react-redux'
// import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'

import {
    updateCurrent as updateCurrentBuild,
} from '@api/fleets'

import htmlHead from '@utils/html-head'

import MainHeader from '@ui/components/main-header/infos'

@connect(state => {
    // console.log(state)
    if (!state.fleets.current) return {}
    const {
        name,
        hq_lv,
        // currentTab,
        _id: id,
    } = state.fleets.current
    return {
        name,
        hq_lv,
        // currentTab,
        id
    }
})
@ImportStyle(require('./styles.less'))
export default class Header extends React.Component {
    // mounted = false
    onNameUpdate() {
        if (!this.mounted) return
        if (this.lastName === this.props.name) return
        htmlHead(undefined, {
            title: `FLEET: ${this.props.name}`,
            dispatch: this.props.dispatch,
        })
        this.lastName = this.props.name
    }
    onTabChange = tabIndex => {
        this.props.dispatch(
            updateCurrentBuild({
                currentTab: tabIndex
            })
        )
    }

    componentDidMount() {
        this.mounted = true
        this.onNameUpdate()
    }
    componentDidUpdate() {
        this.onNameUpdate()
    }
    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        return (
            <MainHeader
                className={this.props.className}
                title={`${this.props.id} | ${this.props.name}`}
                tabs={[
                    '#1',
                    '#2',
                    '#3',
                    '#4',
                    'BASE'
                ]}
                tabLink={false}
                defaultIndex={0}
                onTabChange={this.onTabChange}
            />
        )
    }
}
