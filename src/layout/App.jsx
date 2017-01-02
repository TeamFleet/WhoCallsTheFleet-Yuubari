import React, { PropTypes } from 'react'

import Header from './Header.jsx'
import Main from './Main.jsx'

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
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