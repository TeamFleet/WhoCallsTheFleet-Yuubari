import React from 'react'
import { connect } from 'react-redux'

import { ImportStyle } from 'sp-css-import'
import Page from '@ui/containers/page'

import htmlHead from '@utils/html-head'

import MainHeader from '@ui/components/main-header'
import Icon from '@ui/components/icon'
import Title from '@ui/components/title'

@connect()
@ImportStyle(require('./icons.less'))
export default class extends React.Component {
    static onServerRenderHtmlExtend({ htmlTool: ext, store }) {
        const head = htmlHead({
            store,
            title: 'Dev (Icons)'
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    getIcons() {
        if (__SERVER__) return []

        const parser = new DOMParser()
        const doc = parser.parseFromString(__ICONSVG__, "image/svg+xml")
        let icons = []

        for (let symbol of doc.querySelectorAll('symbol[id]')) {
            icons.push(symbol.getAttribute('id').replace(/^icon-/, ''))
        }

        return icons
    }

    render() {
        this.getIcons()
        return (
            <Page className={this.props.className}>
                <MainHeader>
                    <div className="header" style={{ height: "100px", paddingTop: "20px" }}>
                        <Title component="h1">Icons</Title>
                    </div>
                </MainHeader>
                <div className="icon-sample-group">
                    {this.getIcons().map((icon, index) => (
                        <IconSample icon={icon} key={index} />
                    ))}
                </div>
            </Page>
        )
    }
}

class IconSample extends React.Component {
    render() {
        return (
            <label className="icon-sample">
                <input type="text" value={this.props.icon} readOnly />
                <Icon icon={this.props.icon} className="icon" />
            </label>
        )
    }
}
