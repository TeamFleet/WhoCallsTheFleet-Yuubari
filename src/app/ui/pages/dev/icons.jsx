import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import { pageinfo } from 'koot'

import htmlHead from '@utils/html-head'

import Page from '@ui/containers/page'

import MainHeader from '@ui/components/main-header'
import Icon from '@ui/components/icon'
import Title from '@ui/components/title'

@connect()
@pageinfo(() => htmlHead({
    title: 'Dev (Icons)'
}))
@ImportStyle(require('./icons.less'))
export default class extends React.Component {

    getIcons() {
        if (__SERVER__) return []

        const parser = new DOMParser()
        const doc = parser.parseFromString(__SVG_SYMBOLS__, "image/svg+xml")
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
                <input
                    type="text"
                    value={this.props.icon}
                    readOnly
                    onFocus={evt => {
                        evt.target.select()
                    }}
                />
                <Icon icon={this.props.icon} className="icon" />
            </label>
        )
    }
}
