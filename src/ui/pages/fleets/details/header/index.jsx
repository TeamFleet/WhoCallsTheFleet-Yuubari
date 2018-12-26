import React from 'react'
// import classNames from 'classnames'
import { extend } from 'koot'

import {
    maxSubFleetCount,
    currentChangeTab,
} from '@api/fleets'

import htmlHead from '@utils/html-head'

import MainHeader from '@ui/components/main-header/infos'

const tabs = []
for (let i = 0; i < maxSubFleetCount; i++) {
    tabs.push(`#${i + 1}`)
}
tabs.push(__('land_bases'))

@extend({
    connect: state => {
        // console.log(state)
        if (!state.fleets.current) return {}
        if (__DEV__ && __CLIENT__)
            console.log(state.fleets.current)
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
    },
    styles: require('./styles.less')
})
class Header extends React.Component {
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
        this.props.dispatch(currentChangeTab(
            tabIndex >= maxSubFleetCount
                ? 'base'
                : tabIndex
        ))
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
                tabs={tabs}
                tabLink={false}
                defaultIndex={0}
                onTabChange={this.onTabChange}
            />
        )
    }
}

export default Header
