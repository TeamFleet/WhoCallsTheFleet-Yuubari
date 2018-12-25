import React from 'react'

import ListContainer from '@ui/containers/list'
import LinkEntity from '@ui/components/link/entity'

const ListCasters = ({
    className,
    list: _list,
    array: _array,
    empty,
    children,
    count,
    ...props
}) => {
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
export default ListCasters
