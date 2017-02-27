import React, { PropTypes } from 'react'

import Nav from './layout/Nav.jsx'
import Main from './layout/Main.jsx'
import Bgimg from './layout/Bgimg.jsx'

import './App.less'

export default class extends React.Component {
    static propTypes = {
        children: PropTypes.node
    }

    render() {
        return (
            <div id="app">
                <Nav location={this.props.location} />
                <Main location={this.props.location}>
                    {this.props.children}
                </Main>
                <Bgimg />
            </div>
        )
    }
}