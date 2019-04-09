import React from 'react'
import { extend } from 'koot'
import visit from 'unist-util-visit'

import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router'
import Title from '@ui/components/title'

const markdownRenderers = {
    heading: (props) => {
        // console.log(props)
        let type
        if (props.level == 2) {
            type = "line-append"
        }
        return <Title type={type} {...props} />
    },
    link: (props) => {
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


// ============================================================================


const Markdown = extend({
    styles: require('./styles.less')
})(
    ({
        content, markdown, md,
        renderers,
        plugins = [],
        ...props
    }) => {

        if (typeof props.source === 'undefined')
            props.source = content || markdown || md

        props.renderers = { ...markdownRenderers }
        if (typeof renderers === 'object')
            Object.assign(props.renderers, renderers)

        props.plugins = [
            ...plugins,
            () => (tree) => {
                visit(tree, (node) => {
                    console.log(node)
                })
            }
        ]

        return (
            <ReactMarkdown {...props} />
        )

    }
)
export default Markdown
