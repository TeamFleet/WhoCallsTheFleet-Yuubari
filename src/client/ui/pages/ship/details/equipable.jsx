import React from 'react'

import ComponentContainer from './layout/component-container.jsx'

import translate from 'sp-i18n'
// import db from 'Logic/database'

// import { ImportStyle } from 'sp-css-import'
// import styles from './header.less'

// @connect()
// @ImportStyle(styles)
export default class ShipDetailsContentEquipable extends React.Component {
    render() {
        return (
            <ComponentContainer>
                <p><i>{translate('under_construction')}...</i></p>
                <p><i>ShipDetailsContentEquipable</i></p>
            </ComponentContainer>
        )
    }
}