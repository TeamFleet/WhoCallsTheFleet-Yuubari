import React from 'react'

import ComponentContainer from './commons/component-container.jsx'

import AACI from './components/aaci.jsx'

import translate from 'sp-i18n'
// import db from 'Logic/database'

// import { ImportStyle } from 'sp-css-import'
// import styles from './header.less'

// @connect()
// @ImportStyle(styles)
export default class ShipDetailsContentCapabilities extends React.Component {
    render() {
        return (
            <ComponentContainer>
                <p><i>{translate('under_construction')}...</i></p>
                <AACI ship={this.props.ship} className="shipinfo shipinfo-aaci" />
            </ComponentContainer>
        )
    }
}