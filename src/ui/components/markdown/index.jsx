import { memo } from 'react';
import { extend } from 'koot';

// import pluginLink from './plugin-link'

import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import Title from '@ui/components/title';
import LinkMini from '@ui/components/link-mini';
// import LinkShip from '@ui/components/link/ship';

const regex = {
    Ship: /ship:([0-9]+):*([:a-z]*)\|*([^|^:]*)/i,
};

const markdownRenderers = {
    heading: (props) => {
        let type;
        if (props.level === 2) {
            type = 'line-append';
        }
        return <Title type={type} {...props} />;
    },
    a: (props) => {
        const linkRegExp = /^([a-z]+?):([0-9]+):([a-z]+)$/;
        const exec = linkRegExp.exec(props.node?.properties?.href);
        if (Array.isArray(exec) && exec.length) {
            const [, type, id, style] = exec;
            const firstChildren = props.children[0];
            // console.log({ type, id, style });
            const thisProps = {
                className: 'mod-inline',
                ship: id,
                noLink: firstChildren === '__',
            };
            if (firstChildren && firstChildren !== '__')
                thisProps.name = props.children[0];

            if (style === 'mini') {
                return <LinkMini {...thisProps} />;
            }
        }
        // if(props.node?.properties?.href)
        return props.href.match(/^(https?:)?\/\//) ? (
            props.href.indexOf('://') < 0 ? (
                <a href={props.href}>{props.children}</a>
            ) : (
                <a href={props.href} target="_blank" rel="noopener noreferrer">
                    {props.children}
                </a>
            )
        ) : (
            <Link to={props.href}>{props.children}</Link>
        );
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
            const [child] = props.children;
            let transformed;
            Object.keys(regex).some((type) => {
                const match = regex[type].exec(child.props.children);
                if (!Array.isArray(match) || !match.length) return false;

                const [, shipId, nodeTypes, name] = match;
                const nodeType = {};
                nodeTypes.split(':').forEach((type) => {
                    nodeType[type] = true;
                });

                const p = {
                    className: 'mod-inline',
                    ship: shipId,
                    noLink: nodeType.text,
                };
                if (name) p.name = name;

                if (nodeType.mini) {
                    transformed = <LinkMini {...p} />;
                }

                return true;
            });
            if (transformed) return transformed;
        }
        return <a href={props.href}>{props.children}</a>;
    },
};

// ============================================================================

const Markdown = extend({
    styles: require('./styles.less'),
})(
    memo(
        ({
            content,
            markdown,
            md,
            children,
            source,
            components,
            renderers,
            ...props
        }) => {
            // plugins = [],
            if (typeof props.children === 'undefined')
                props.children =
                    children ?? source ?? content ?? markdown ?? md;

            props.components = { ...markdownRenderers };
            const thisComponents = components ?? renderers;
            if (typeof thisComponents === 'object')
                Object.assign(props.components, thisComponents);

            // if (!Array.isArray(props.astPlugins))
            //     props.astPlugins = []
            // props.astPlugins.push(pluginLink)

            return <ReactMarkdown {...props} />;
        }
    )
);

export default Markdown;
