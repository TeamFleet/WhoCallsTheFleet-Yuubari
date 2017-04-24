import React, { PropTypes } from 'react'
import filterProps from '../../core/react/filter-props'
// import checkCssProp from 'check-css-prop'

import './Title.less'

class Title extends React.Component {
    constructor(props){
        super(props)

        let _props = Object.assign({}, this.props),
            {tagName, content} = _props
        
        delete _props.tagName
        delete _props.content

        tagName = tagName || 'h2'
        content = content || this.props.children
        _props = filterProps(_props)

        _props.className = (_props.className || '').split(' ')
        _props.className.push('gradient')
        _props.className = _props.className.join(' ')

        this.tagName = tagName
        this.content = content
        this._props = _props

        // if( checkCssProp('background-clip') ){
            
        // }
    }

    render() {
        const TagName = this.tagName

        return (
            <TagName data-content={this.content} {...this._props}>
                {this.content}
            </TagName>
        )
    }
}

Title.propTypes = {
    children: PropTypes.node,
    tagName: PropTypes.string
}

export default Title
