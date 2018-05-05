import React from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'
import { ImportStyle } from 'sp-css-import'
import { localeId } from 'super-i18n'

import htmlHead from '@appUtils/html-head'

import Page from '@appUI/containers/page'
import CenterContainer from '@appUI/containers/center'

import Title from '@appUI/components/title'
import Link from '@appUI/components/link'

const markdownRenderers = {
    heading: (props) => {
        // console.log(props)
        let type
        if (props.level == 2) {
            type = "line-append"
        }
        return <Title type={type} {...props} />
    },
    Link: (props) => {
        return (
            props.href.match(/^(https?:)?\/\//)
                ? (props.href.indexOf('://') < 0
                    ? <a href={props.href}>{props.children}</a>
                    : <a href={props.href} target="_blank">{props.children}</a>
                )
                : <Link to={props.href}>{props.children}</Link>
        );
    }
}

@connect()
@ImportStyle(require('./styles.less'))
export default class Home extends React.Component {
    static onServerRenderHtmlExtend({ htmlTool: ext, store }) {
        const head = htmlHead({
            store,
            title: __('title')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    getMD() {
        if (localeId === 'en')
            return require(`@appDocs/updates/1.0.0/en.md`)
        if (localeId === 'ja')
            return require(`@appDocs/updates/1.0.0/ja.md`)
        return require(`@appDocs/updates/1.0.0/zh.md`)
    }
    render() {
        return (
            <Page className={this.props.className}>
                <CenterContainer>
                    <Markdown
                        source={this.getMD()}
                        renderers={markdownRenderers}
                        childAfter={
                            <span className="end-of-doc"></span>
                        }
                    />
                </CenterContainer>
            </Page>
        )
    }
}
