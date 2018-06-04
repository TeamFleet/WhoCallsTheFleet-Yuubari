import React from 'react'

import getPic from '@utils/get-pic'

import Link from '@ui/components/link'
// import Icon from '@ui/components/icon'
import FlagNavy from '@ui/components/flag-navy'
import ComponentContainer from '@ui/containers/infos-component'
import Stat from '@ui/components/stat'

// import db from '@api/database'

import { ImportStyle } from 'sp-css-import'
import styles from './quickfacts.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentSlotEquipments extends React.Component {
    render() {
        const ship = this.props.ship
        //title={__("ship_details.quickfacts")}
        return (
            <ComponentContainer className={this.props.className}>
                <div className="wrapper">
                    <Stat
                        className="item"
                        title={__("ship_details.navy")}
                    >
                        <FlagNavy className="flag-navy" navy={ship._navy} />
                        {ship._navyName}
                    </Stat>
                    <Stat
                        className="item"
                        title={__("seiyuu")}
                    >
                        {ship._cv && <Link to={`/entities/${ship.getRel('cv')}`}>{ship._cv}</Link>}
                        {!ship._cv && <span className="unknown">?</span>}
                    </Stat>
                    <Stat
                        className="item"
                        title={__("artist")}
                    >
                        {ship._illustrator && <Link to={`/entities/${ship.getRel('illustrator')}`}>{ship._illustrator}</Link>}
                        {!ship._illustrator && <span className="unknown">?</span>}
                    </Stat>
                </div>
            </ComponentContainer>
        )
    }
}
