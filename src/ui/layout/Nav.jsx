import React, { PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import routes from '../../core/routes.js'

import './Nav.less'
import { BgContainerBlured } from './Bgimg.jsx'


export default class extends React.Component {
    static propTypes = {
        bgBlured: PropTypes.string
    }

    constructor(props){
        super(props)

        this.navList = [
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

            let index = this.navList.indexOf(path)
            if (index > -1) {
                this.navList.splice(index, 1, route);
            } else {
                if (this.navList[this.navList.length - 1] !== '')
                    this.navList.push('')
                this.navList.push(route)
            }
        })

        this.state = {
            showBackButton: false
        }
    }

    historyBack() {
        if( typeof history !== 'undefined' )
            history.back()
    }

    openBgControls() {
        document.body.classList.add('mode-bg')
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showBackButton: nextProps.location !== this.props.location
        })
    }

    renderItem(route, index) {
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
    }

    render() {
        return (
            <nav id="nav">
                <div className="wrapper">
                    <div className="logo">
                        <button type="button" className="btn-back" disabled={!this.state.showBackButton} onClick={this.historyBack} />
                        <IndexLink to="/" className="btn-home-logo" activeClassName="on" />
                    </div>
                    <div className="navs">
                        <IndexLink to="/" className="link" activeClassName="on">Home</IndexLink>
                        <s className="blank"></s>
                        {this.navList.map(this.renderItem)}
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
