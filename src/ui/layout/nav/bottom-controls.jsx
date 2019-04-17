import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import bindEvent from 'bind-event'
import classNames from 'classnames'
import { extend } from 'koot'

import availableLocales from '@src/locales'
import { enterBackground as enterUIModeBackground } from '@api/ui-mode'
import installPWA from '@utils/install-app'

import Icon from '@ui/components/icon'

const langName = {
    en: ['EN', 'English'],
    ja: ['日', '日本語'],
    zh: ['简', '简体中文'],
}


//


const NavBottomControls = extend({
    connect: true,
    styles: require('./bottom-controls.less')
})(
    ({ className, dispatch }) => (
        <div className={className}>
            <NavInstall />
            <NavBottomItem
                onClick={() => dispatch(enterUIModeBackground())}
                icon="image-compare"
                children={__('nav.backgroundSwitch')}
            />
            <NavLangSwitch />
        </div>
    )
)
export default NavBottomControls


//


const NavBottomItem = ({
    className,
    icon,
    children,
    ...props,
}) => {
    return (
        <span
            className={classNames(['link', className])}
            {...props}
        >
            {icon && <Icon icon={icon} className="icon" />}
            {children}
        </span>
    )
}


//


@extend({
    connect: state => ({
        localeId: state.localeId,
        location: state.routing && state.routing.locationBeforeTransitions,
    }),
})
class NavLangSwitch extends React.Component {
    state = {
        showMenu: false
    }
    timeoutHideMenu = undefined

    getUrl(thisLocaleId) {
        let search = ''
        let query = { ...this.props.location.query }

        query.hl = thisLocaleId

        for (let key in query) {
            if (!search) search = '?'
            else search += '&'
            search += `${key}=${query[key]}`
        }

        return this.props.location.pathname + search
    }

    componentDidMount() {
        bindEvent(document.body, 'click', () => {
            this.timeoutHideMenu = setTimeout(() => {
                this.setState({
                    showMenu: false
                })
            }, 10)
        })
    }

    render() {
        return (
            <div className="lang-switch">
                <span
                    className={classNames({
                        "link": true,
                        "on": this.state.showMenu,
                    })}
                    children={__('nav.languageSwitch')}
                    data-current-locale-abbr={langName[this.props.localeId][0]}
                    onClick={() => {
                        this.setState({
                            showMenu: !this.state.showMenu
                        })
                        clearTimeout(this.timeoutHideMenu)
                    }}
                />
                <TransitionGroup component={React.Fragment}>
                    {this.state.showMenu &&
                        <CSSTransition
                            classNames="transition"
                            timeout={200}
                        >
                            <div className="lang-switch-menu">
                                {availableLocales.map(l => (
                                    <a
                                        href={this.getUrl(l)}
                                        key={l}
                                        children={langName[l][1]}
                                        className={classNames({
                                            'link-lang': true,
                                            'on': l === this.props.localeId
                                        })}
                                    />
                                ))}
                            </div>
                        </CSSTransition>
                    }
                </TransitionGroup>
            </div >
        )
    }
}


//


const NavInstall = extend({
    connect: state => ({
        evt: state.app.eventInstallPWA
    })
})(
    ({ evt, dispatch }) => {
        if (!evt)
            return null
        return (
            <NavBottomItem
                onClick={() => installPWA(evt, dispatch)}
                icon="download5"
                children={__('nav.install')}
            />
        )
    }
)
