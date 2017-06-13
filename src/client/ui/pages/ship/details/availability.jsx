import React from 'react'

import translate from 'sp-i18n'
// import db from 'Logic/database'

// import { ImportStyle } from 'sp-css-import'
// import styles from './header.less'

// @connect()
// @ImportStyle(styles)
export default class ShipDetailsContentAvailability extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <p><i>{translate('under_construction')}...</i></p>

                <p><i>ShipDetailsContentAvailability</i></p>
            </div>
        )
    }
}