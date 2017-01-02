import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import routes from './_core/routes.js'

import styles from './main.less'

class Root extends Component {
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