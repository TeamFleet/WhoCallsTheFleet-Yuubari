import React, { PropTypes } from 'react'

import Nav from './Nav.jsx'
import Main from './Main.jsx'

import './App.less'

class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Nav />
                <Main>
                    {this.props.children}
                </Main>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node
}

export default App
