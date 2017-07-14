import React from 'react'

import getPic from 'Utils/get-pic'

import Link from 'UI/components/link'
// import Icon from 'UI/components/icon'
import FlagNavy from 'UI/components/flag-navy'
import ComponentContainer from '../commons/component-container.jsx'
import Stat from '../commons/stat.jsx'

import translate from 'sp-i18n'
import db from 'Logic/database'

import { ImportStyle } from 'sp-css-import'
import styles from './quickfacts.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentSlotEquipments extends React.Component {
    render() {
        const ship = this.props.ship
        //title={translate("ship_details.quickfacts")}
        return (
            <ComponentContainer className={this.props.className}>
                <Stat
                    className="item"
                    title={translate("ship_details.navy")}
                >
                    <FlagNavy className="flag-navy" navy={ship._navy} />
                    {ship._navyName}
                </Stat>
                <Stat
                    className="item"
                    title={translate("ship_details.cv")}
                >
                    <Link to={`/entities/${ship.getRel('cv')}`}>
                        {ship._cv}
                    </Link>
                </Stat>
                <Stat
                    className="item"
                    title={translate("ship_details.illustrator")}
                >
                    <Link to={`/entities/${ship.getRel('illustrator')}`}>{ship._illustrator}</Link>
                </Stat>
            </ComponentContainer>
        )
    }
}