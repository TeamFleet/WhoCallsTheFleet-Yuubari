import React, { PropTypes } from 'react'

import Nav from './Nav.jsx'
import Main from './Main.jsx'
import Bgimg from './Bgimg.jsx'

import './App.less'

class App extends React.Component {
    render() {
        const file = '/bgimgs/bob-1.jpg'
        const fileBlured = '/bgimgs/blured/bob-1.jpg'
        return (
            <div id="app">
                <Nav bgBlured={fileBlured} />
                <Main bgBlured={fileBlured}>
                    {this.props.children}
                </Main>
                <Bgimg bgImg={file} />
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node
}

export default App
