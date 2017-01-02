import React, { PropTypes } from 'react'

class Main extends React.Component {
    render() {
        return (
            <main>
                {this.props.children}
            </main>
        )
    }
}

Main.propTypes = {
    children: PropTypes.node
}

export default Main