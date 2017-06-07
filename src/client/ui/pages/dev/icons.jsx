import React from 'react'
import { connect } from 'react-redux'

import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'

import MainHeader from 'UI/components/main-header.jsx'
import Icon from 'UI/components/icon.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './icons.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            store,
            title: 'Dev (Icons)'
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    constructor() {
        super()

        this.state = {
            iconSize: 32
        }
    }

    getIcons() {
        if (__SERVER__) return []

        const parser = new DOMParser()
        const doc = parser.parseFromString(__ICONSVG__, "image/svg+xml")
        let icons = []

        for (let symbol of doc.querySelectorAll('symbol[id]')) {
            icons.push(symbol.getAttribute('id').replace(/^icon\-/, ''))
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
                        <IconSample icon={icon} key={index} size={this.state.iconSize} />
                    ))}
                </div>
            </PageContainer>
        )
    }
}

class IconSample extends React.Component {
    render() {
        return (
            <div className="icon-sample">
                <Icon icon={this.props.icon} className="icon" style={{
                    width: this.props.size + 'px',
                    height: this.props.size + 'px'
                }} />
            </div>
        )
    }
}