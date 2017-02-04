import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import routes from './_core/routes.js'

import './main.less'
import './components/_base.less'

class Root extends Component {
    componentWillMount() {
        // get all background images
        

        // after all end, remove .loading from body
    }

    componentDidMount() {
        setTimeout(() => {
            document.body.classList.add('is-ready')
        }, 2000)
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
