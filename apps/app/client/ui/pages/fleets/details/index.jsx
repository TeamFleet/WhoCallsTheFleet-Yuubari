import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'

import {
    init/*, refresh*/,
    getBuild,
} from '@appLogic/fleets'

import htmlHead from '@appUtils/html-head'

import Page from '@appUI/containers/page'
import Center from '@appUI/containers/center'

import Button from '@appUI/components/button'
import Title from '@appUI/components/title'
import LoaderFairyOoyodo2 from '@appUI/components/loader/fairy-ooyodo-2'
import Header from '@appUI/components/main-header/main-options'

@connect()
export default class PageFleet extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.fleets')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    shouldComponentUpdate(newProps) {
        if (
            typeof newProps.params === 'object' &&
            typeof this.props.params === 'object' &&
            newProps.params.id === this.props.params.id
        )
            return false
        return true
    }

    render() {
        return (
            <Page>
                <PageFleetContainer />
            </Page>
        )
    }
}

@connect()
@ImportStyle(require('./styles.less'))
class PageFleetContainer extends React.Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        if (!__CLIENT__) return
        setTimeout(() => {
            this.props.dispatch(init())
                .then(() => {
                    this.setState({
                        ready: true,
                    })
                })
        }, self.isAppReady ? 500 : 2000)
    }

    render() {
        if (!__CLIENT__)
            return <Title component="h2" children={translate('nav.fleets')} />

        if (!this.state.ready)
            return (
                <Center
                    className={classNames([
                        this.props.className,
                        'is-initializing',
                    ])}
                >
                    <LoaderFairyOoyodo2 className="loader" />
                </Center>
            )

        const {
            className
        } = this.props

        return (
            <React.Fragment>
                <PageFleetHeader className={className + '-header'} />
                <div className={className}>
                    123
                </div>
            </React.Fragment>
        )
    }
}

const PageFleetHeader = connect()(({
    className
}) => {
    return (
        <Header
            className={className}
            main={translate('under_construction')}
        />
    )
})