import React, { Component } from 'react'
import { render } from 'react-dom'

import { Router, hashHistory } from 'react-router'
import routes from './core/routes.js'

import { Provider } from 'react-redux'
import store from './core/store.js'

import * as defaults from './core/defaults.js'

class Root extends Component {
    // componentWillMount() {
    //     // console.log(_g)
    // }

    // componentDidMount() {
    //     if (this.props.isBgimgLoaded) {
    //         // setTimeout(() => {
    //         document.body.classList.add('is-ready')
    //         // }, 200000)
    //     }
    // }

    render() {
        // console.log(styles)
        // console.log(require('./main.less'))
        // console.log(routes)
        return (
            <Provider store={store}>
                <Router history={hashHistory} routes={routes} />
            </Provider>
        )
    }
}

render(<Root />, document.getElementById('root'))
