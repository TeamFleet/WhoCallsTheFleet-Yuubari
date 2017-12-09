import React from 'react'
import { connect } from 'react-redux'

import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from '@appUtils/html-head'

import MainHeader from '@appUI/components/main-header'
import Icon from '@appUI/components/icon'

import { ImportStyle } from 'sp-css-import'
import style from './icons.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: 'Dev (Icons)'
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    constructor() {
        super()
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
            <PageContainer className={this.props.className}>
                <MainHeader>
                    <div className="header" style={{ height: "100px", paddingTop: "20px" }}>
                        <h1>Icons</h1>
                    </div>
                </MainHeader>
                <div className="icon-sample-group">
                    {this.getIcons().map((icon, index) => (
                        <IconSample icon={icon} key={index} />
                    ))}
                </div>
            </PageContainer>
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