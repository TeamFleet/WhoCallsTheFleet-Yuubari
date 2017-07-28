import React from 'react'
import Link from './_normal.jsx'

import getEntity from '@appUtils/get-entity.js'
import getPic from '@appUtils/get-pic.js'

import { ImportStyle } from 'sp-css-import'
import style from './entity.less'

@ImportStyle(style)
export default class LinkEntity extends React.Component {
    checkShow(type) {
        return (this.props[type] || typeof this.props[type] === 'undefined')
    }

    render() {
        this.entity = getEntity(this.props.entity || this.props.id)

        return (
            <Link
                className={this.props.className}
                to={'/entities/' + this.entity.id}
                onClick={this.props.onClick}
                pic={this.checkShow('pic') ? getPic(this.entity, '0-2') : null}
                name={this.checkShow('name') ? this.entity._name : null}
            >
                {this.props.children}
            </Link>
        )
    }
}