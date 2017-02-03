import React, { PropTypes } from 'react'
import filterProps from '../_core/react/filter-props.js'
// import checkCssProp from '../_core/check-css-prop.js'

import './Title.less'

class Title extends React.Component {
    render() {
        let props = this.props,
            {TagName, content} = props
        
        delete props.TagName
        delete props.content

        TagName = TagName || 'h2'
        content = content || this.props.children
        props = filterProps(props)

        props.className = (props.className || '').split(' ')
        props.className.push('gradient')
        props.className = props.className.join(' ')

        // if( checkCssProp('background-clip') ){
            
        // }

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
