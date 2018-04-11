import React from 'react'
// import { ImportStyle } from 'sp-css-import'

import ListContainer from '@appUI/containers/list'
import LinkEntity from '@appUI/components/link/entity'

// @connect()
// @ImportStyle(require('../ships/styles.less'))
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
                        <LinkEntity
                            entity={entity}
                            key={entity.id}
                            className="item"
                            count={count ? 'cv' : false}
                            {...props}
                        />
                    ))
                }
                {!hasItem && !!(empty) && <span className="list-empty">{empty}</span>}
                {children}
            </ListContainer>
        )
    }
}