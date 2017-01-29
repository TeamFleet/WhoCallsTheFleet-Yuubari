import React, { PropTypes } from 'react'

import './Main.less'

class Main extends React.Component {
    render() {
        return (
            <main id="main">
                <div className="wrapper">
                    {this.props.children}
                </div>
            </main>
        )
    }
}

Main.propTypes = {
    children: PropTypes.node
}

export default Main
