import React, { PropTypes } from 'react'

import './Main.less'

class Main extends React.Component {
    render() {
        return (
            <main id="main">
                {this.props.children}
            </main>
        )
    }
}

Main.propTypes = {
    children: PropTypes.node
}

export default Main
