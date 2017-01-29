import React from 'react'
import { Link, IndexLink } from 'react-router'
import routes from '../_core/routes.js'

import './Nav.less'

class Nav extends React.Component {
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
            if (route.path.search('/') > -1) return

            let index = navList.indexOf(route.path)
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
                                        activeClassName="on">{route.path}
                                        &nbsp;</Link>
                                )
                            }
                        })
                    }
                </div>
            </nav>
        )
    }
}

export default Nav
