import React from 'react'
import { Link, IndexLink } from 'react-router'
import routes from '../_core/routes.js'

class Header extends React.Component {
    render() {
        return (
            <header>
                <IndexLink to="/">Home</IndexLink>
                &nbsp;
                {
                    routes.childRoutes.map(route => {
                        return (
                            <Link to={route.path} key={route.path}>{route.path}
                                &nbsp;</Link>
                        )
                    })
                }
            </header>
        )
    }
}

export default Header