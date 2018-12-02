import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import bindEvent from 'bind-event'
import classNames from 'classnames'
import { extend } from 'koot'

import availableLocales from '@src/locales'
import { enterBackground as enterUIModeBackground } from '@api/ui-mode'

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
            <span
                className="link"
                onClick={() => dispatch(enterUIModeBackground())}
                children={__('nav.backgroundSwitch')}
            />
            <NavLangSwitch />
        </div>
    )
)
export default NavBottomControls


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
                    className="link"
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
