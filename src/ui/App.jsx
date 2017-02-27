import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Nav from './layout/Nav.jsx'
import Main from './layout/Main.jsx'
import Bgimg from './layout/Bgimg.jsx'

import './App.less'

@connect(function mapStateToProps(state) {
    return {
        isBgimgLoaded: state.bgimgState.isLoaded
    }
})
export default class extends React.Component {
    static propTypes = {
        children: PropTypes.node
    }

    render() {
        if (this.props.isBgimgLoaded) {
            // setTimeout(() => {
            document.body.classList.add('is-ready')
            // }, 200000)
        }
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