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
        const file = '/bgimgs/bob-1.jpg'
        const fileBlured = '/bgimgs/blured/bob-1.jpg'
        return (
            <div id="app">
                <Nav bgBlured={fileBlured} />
                <Main bgBlured={fileBlured} location={this.props.location}>
                    {this.props.children}
                </Main>
                <Bgimg bgImg={file} />
            </div>
        )
    }
}