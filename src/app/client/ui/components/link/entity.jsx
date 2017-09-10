import React from 'react'
import Link from './_normal.jsx'

import getEntity from '@appUtils/get-entity.js'
import getPic from '@appUtils/get-pic.js'
import getLink from '@appUtils/get-link.js'

import { ImportStyle } from 'sp-css-import'

const checkShow = value => (value || typeof value === 'undefined')

@ImportStyle(require('./entity.less'))
export default class LinkEntity extends React.Component {
    render() {
        const {
            entity, id,
            pic,
            name,
            children,
            ...props
        } = this.props

        this.entity = getEntity(entity || id)

        return (
            <Link
                to={getLink('entity', this.entity.id)}
                pic={checkShow(pic) ? getPic(this.entity, '0-2') : null}
                name={checkShow(name) ? this.entity._name : null}
                {...props}
            >
                {children}
            </Link>
        )
    }
}