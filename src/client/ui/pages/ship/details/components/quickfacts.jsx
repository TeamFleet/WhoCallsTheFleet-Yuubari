import React from 'react'

import getPic from '@appUtils/get-pic'

import Link from '@appUI/components/link'
// import Icon from '@appUI/components/icon'
import FlagNavy from '@appUI/components/flag-navy'
import ComponentContainer from '@appUI/containers/infos-component'
import Stat from '@appUI/components/stat'

import translate from 'super-i18n'
// import db from '@appLogic/database'

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
                <div className="wrapper">
                    <Stat
                        className="item"
                        title={translate("ship_details.navy")}
                    >
                        <FlagNavy className="flag-navy" navy={ship._navy} />
                        {ship._navyName}
                    </Stat>
                    <Stat
                        className="item"
                        title={translate("seiyuu")}
                    >
                        {ship._cv && <Link to={`/entities/${ship.getRel('cv')}`}>{ship._cv}</Link>}
                        {!ship._cv && <span className="unknown">?</span>}
                    </Stat>
                    <Stat
                        className="item"
                        title={translate("artist")}
                    >
                        {ship._illustrator && <Link to={`/entities/${ship.getRel('illustrator')}`}>{ship._illustrator}</Link>}
                        {!ship._illustrator && <span className="unknown">?</span>}
                    </Stat>
                </div>
            </ComponentContainer>
        )
    }
}
