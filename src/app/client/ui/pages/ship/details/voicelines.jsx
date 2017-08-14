import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'

import translate from 'sp-i18n'
// import db from '@appLogic/database'

// import { ImportStyle } from 'sp-css-import'
// import styles from './header.less'

// @connect()
// @ImportStyle(styles)
export default class ShipDetailsContentVoicelines extends React.Component {
    render() {
        return (
            <ComponentContainer>
                <p><i>{translate('under_construction')}...</i></p>
                <p><i>ShipDetailsContentVoicelines</i></p>
            </ComponentContainer>
        )
    }
}