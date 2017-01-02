import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import routes from './_core/routes.js'

import styles from './main.less'

class Root extends Component {
    componentWillMount() {
        // all data binding process

        // after all end, remove .loading from body
    }

    componentDidMount() {
        // setTimeout(() => {
        //     document.body.classList.remove('loading')
        // }, 5000)
    }

    render() {
        // console.log(styles)
        // console.log(require('./main.less'))
        return (
            <Router history={hashHistory} routes={routes} />
        )
    }
}

render(<Root />, document.getElementById('root'))