/* global __DEV_COMPONENTS_ROUTES__:false */

import React from 'react'
import { extend } from 'koot'

import routerPush from '@utils/router-push'

import Title from '@ui/components/title'
import MainHeader from '@ui/components/main-header'

const DevComponentsHeader = extend({
    connect: state => ({
        current: state.routing.locationBeforeTransitions.pathname.replace(/^\/dev-components\//, '')
    }),
    styles: require('./header.less')
})(
    ({ className, current }) => {
        return (
            <MainHeader className={className}>
                <Title component="h2" className="title">Components</Title>
                <select className="select" defaultValue={current} onChange={evt => routerPush(`/dev-components/${evt.target.value}`)}>
                    {__DEV_COMPONENTS_ROUTES__.map(({ path, name }, index) => (
                        <option key={index} value={path}>{name}</option>
                    ))}
                </select>
            </MainHeader>
        )
    }
)
export default DevComponentsHeader
