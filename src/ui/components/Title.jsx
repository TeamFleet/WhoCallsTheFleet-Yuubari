import React, { PropTypes } from 'react'
import filterProps from '../../core/react/filter-props'
// import checkCssProp from '../../core/check-css-prop.js'

import './Title.less'

class Title extends React.Component {
    render() {
        let props = Object.assign({}, this.props),
            {tagName, content} = props
        
        delete props.tagName
        delete props.content

        tagName = tagName || 'h2'
        content = content || this.props.children
        props = filterProps(props)

        props.className = (props.className || '').split(' ')
        props.className.push('gradient')
        props.className = props.className.join(' ')

        // if( checkCssProp('background-clip') ){
            
        // }

        const TagName = tagName

        return (
            <TagName data-content={content} {...props}>
                {content}
            </TagName>
        )
    }
}

Title.propTypes = {
    children: PropTypes.node,
    tagName: PropTypes.string
}

export default Title
