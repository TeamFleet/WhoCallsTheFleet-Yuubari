import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import routes from './_core/routes.js'

class Root extends Component {
    render() {
        return (
            <Router history={hashHistory} routes={routes} />
        )
    }
}

render(<Root />, document.getElementById('app'))