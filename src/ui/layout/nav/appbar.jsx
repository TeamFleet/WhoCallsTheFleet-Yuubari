import React from 'react'
import { extend } from 'koot'

import installPWA from '@utils/install-app'

import Icon from '@ui/components/icon'

const AppBar = extend({
    connect: state => ({
        pageTitle: state.pageTitle,
        eventInstallPWA: state.app.eventInstallPWA,
    }),
    styles: require('./appbar.less')
})(
    ({
        className,
        pageTitle,
        eventInstallPWA,
        dispatch,
    }) =>
        <div className={className}>
            {pageTitle.sub && <span className="sub">{pageTitle.sub}</span>}
            <span className="main">{pageTitle.main}</span>
            <span className="buttons">
                {(eventInstallPWA || __DEV__) && (
                    <AppBarButton icon="download5" onClick={() => installPWA(eventInstallPWA, dispatch)} />
                )}
                {(navigator.share || __DEV__) && (
                    <AppBarButton icon="share3" onClick={() => {
                        navigator.share({
                            title: document.title,
                            text: document.querySelector('meta[name="description"]').getAttribute('content'),
                            url: location.href,
                        })
                            .then(() => console.log('Successful share'))
                            .catch((error) => console.log('Error sharing', error));
                    }} />
                )}
            </span>
        </div>
)
export default AppBar


const AppBarButton = ({ onClick, ...props }) => {
    if (!__CLIENT__) return null
    return (
        <span className="button" onClick={onClick}>
            <Icon className="icon" {...props} />
        </span>
    )
}
