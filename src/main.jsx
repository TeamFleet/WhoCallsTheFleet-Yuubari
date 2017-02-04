import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import routes from './_core/routes.js'

import './main.less'
import './components/_base.less'

class Root extends Component {
    componentWillMount() {
        // path
        const getPath = (dir) => {
            if (self.nw) {
                const path = require('path')
                const mkdirp = require('mkdirp');
                let result = path.join(self.nw.root, dir)
                if (dir == 'bgimgs') {
                    const fs = require('fs')
                    try {
                        fs.accessSync(result, fs.F_OK);
                    } catch (e) {
                        result = path.join(self.nw.root, '/app/assets/images/homebg/')
                    }
                }
                mkdirp.sync(result)
                return result
            } else {
                if (dir.substr(0, 1) !== '/') dir = '/' + dir
                return dir
            }
        }
        self.path = {
            'db': getPath('/app-db/'),
            'bgimgs': getPath('/bgimgs/'),
            'bgimgs_custom': getPath('/app/assets/images/homebg-custom/'),
            'pics': {
                ships: getPath('/pics-ships/'),
                shipsExtra: getPath('/pics-ships-extra/'),
                items: getPath('/pics/items/')
            }
        }
        // KC.path.pics = _g.path.pics

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
