import React from 'react'
import { ImportStyle } from 'sp-css-import'

import ListContainer from '@ui/containers/list'
import LinkMini from '@ui/components/link-mini'

import getEntity from '@utils/get-entity'

// @connect()
@ImportStyle(require('./styles.less'))
export default class ListCasters extends React.Component {
    render() {
        const {
            className,
            list: _list,
            array: _array,
            empty,
            children,
            count,
            ...props
        } = this.props

        const list = _list || _array || []
        const hasItem = list.length ? true : false

        return (
            <ListContainer className={className}>
                {hasItem && list
                    .map(entity => (
                        <LinkMini
                            entity={entity}
                            key={entity.id}
                            className="item"
                            {...props}
                        >
                            {count && <small className="count">({getEntity(entity).relation.illustrator.length})</small>}
                        </LinkMini>
                    ))
                }
                {!hasItem && !!(empty) && <span className="list-empty">{empty}</span>}
                {children}
            </ListContainer>
        )
    }
}
