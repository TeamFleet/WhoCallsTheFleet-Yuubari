import React from 'react'
import { connect } from 'react-redux'
import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'

import htmlHead from '@appUtils/html-head'

import Page from '@appUI/containers/page'

import Title from '@appUI/components/title'

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

// @ImportStyle(style)
class PageFleetsContainer extends React.Component {
    state = {
        Nedb: false,
    }

    componentDidMount() {
        if (typeof Nedb !== 'undefined') {
            this.setState({
                Nedb
            })
        } else {
            import(/*
                webpackChunkName: "nedb"
            */ 'nedb/browser-version/out/nedb.min.js'
            ).then(module => {
                self.Nedb = module
            })
        }
    }

    render() {
        if (!__CLIENT__) {
            return (
                <Title component="h2" children={translate('nav.fleets')} />
            )
        }

        return (
            <React.Fragment>
                <Title component="h2" children={translate('nav.fleets')} />
                <p><i>{translate('under_construction')}...</i></p>
            </React.Fragment>
        )
    }
}
