import React, { PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import routes from '../../core/routes.js'

import './Nav.less'
import { BgContainerBlured } from './Bgimg.jsx'

export default class extends React.Component {
    static propTypes = {
        bgBlured: PropTypes.string
    }

    openBgControls() {
        document.body.classList.add('mode-bg')
    }

    render() {
        let navList = [
            'fleets',
            'calctp',
            '',
            'ships',
            'equipments',
            'arsenal',
            'entities'
        ]

        routes.childRoutes.forEach(route => {
            if (route.path === '/') return

            let path = route.path.replace(/^\//, '')
            if (path.search('/') > -1) return

            let index = navList.indexOf(path)
            if (index > -1) {
                navList.splice(index, 1, route);
            } else {
                if (navList[navList.length - 1] !== '')
                    navList.push('')
                navList.push(route)
            }
        })

        return (
            <nav id="nav">
                <div className="wrapper">
                    <div className="navs">
                        <IndexLink to="/" className="link" activeClassName="on">Home</IndexLink>
                        <s className="blank"></s>
                        {
                            navList.map((route, index) => {
                                if (route === '') {
                                    return <s className="blank" key={index}></s>
                                } else {
                                    return (
                                        <Link
                                            to={route.path}
                                            key={index}
                                            className="link"
                                            activeClassName="on">{route.title || route.name || route.path}</Link>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="controls">
                        <button type="button" onClick={this.openBgControls}>[PH] BG CONTROLS</button>
                    </div>
                </div>
                <BgContainerBlured />
            </nav>
        )
    }
}
