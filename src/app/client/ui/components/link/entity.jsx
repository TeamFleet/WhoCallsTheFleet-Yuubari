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
            entity: _entity, id,
            pic,
            name,
            children,
            ...props
        } = this.props

        const entity = getEntity(_entity || id)

        return (
            <Link
                to={getLink('entity', entity.id)}
                pic={checkShow(pic) ? getPic(entity, '0-2') : null}
                name={checkShow(name) ? entity._name : null}
                {...props}
            >
                {children}
            </Link>
        )
    }
}