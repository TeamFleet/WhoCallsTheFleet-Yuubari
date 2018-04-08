import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'

import htmlHead from '@appUtils/html-head'

import Page from '@appUI/containers/page'
import Center from '@appUI/containers/center'

import Title from '@appUI/components/title'
import LoaderFairyOoyodo2 from '@appUI/components/loader/fairy-ooyodo-2'

@connect()
export default class PageFleets extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.fleets')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <Page>
                <PageFleetsContainer />
            </Page>
        )
    }
}

@ImportStyle(require('./styles.less'))
class PageFleetsContainer extends React.Component {
    state = {
        init: typeof Nedb !== 'undefined' || false,
        // loading: false,
        // entryAnimation: false,
    }

    componentDidMount() {
        if (!this.state.init && __CLIENT__) {
            import(/*
                    webpackChunkName: "nedb"
                */ 'nedb/browser-version/out/nedb.min.js'
            ).then(module => {
                self.Nedb = module
                this.setState({
                    init: true,
                    entryAnimation: true,
                })
            })
        }
    }

    render() {
        if (!__CLIENT__)
            return <Title component="h2" children={translate('nav.fleets')} />

        // if (!this.state.init)
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

        // return (
        //     <div className={this.props.className}>
        //         111
        //     </div>
        // )

        // return (
        //     <React.Fragment>
        //         {PageFleetsContainer.Title}
        //         <p><i>{translate('under_construction')}...</i></p>
        //     </React.Fragment>
        // )
    }
}
