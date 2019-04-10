import React from 'react'
import { extend } from 'koot'

// import pluginLink from './plugin-link'

import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router'
import Title from '@ui/components/title'
import LinkMini from '@ui/components/link-mini'
import LinkShip from '@ui/components/link/ship'

const regex = {
    Ship: /ship:([0-9]+):*([a-z]*)/i
}

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
        )
    },
    // text: (props) => {
    //     if (/\{ship:[0-9]+:*[a-z]*\}/i.test(props.children)) {
    //         console.log('text', props)
    //         return 'aaa'
    //     }
    //     return props.children
    // },
    linkReference: (props) => {
        if (Array.isArray(props.children) && props.children.length === 1) {
            const [child] = props.children
            let transformed
            Object.keys(regex).some(type => {
                const match = regex[type].exec(child.props.children)
                if (!Array.isArray(match) || !match.length) return false
                const [input, shipId, nodeType = ''] = match
                switch (nodeType.toLowerCase()) {
                    case 'mini': {
                        transformed = <LinkMini ship={shipId} />
                        break
                    }
                    default: {

                    }
                }
                return true
            })
            if (transformed) return transformed
        }
        return <a href={props.href}>{props.children}</a>
    }
}


// ============================================================================


const Markdown = extend({
    styles: require('./styles.less')
})(
    ({
        content, markdown, md,
        renderers,
        // plugins = [],
        ...props
    }) => {

        if (typeof props.source === 'undefined')
            props.source = content || markdown || md

        props.renderers = { ...markdownRenderers }
        if (typeof renderers === 'object')
            Object.assign(props.renderers, renderers)

        // if (!Array.isArray(props.astPlugins))
        //     props.astPlugins = []
        // props.astPlugins.push(pluginLink)

        return (
            <ReactMarkdown {...props} />
        )

    }
)
export default Markdown
