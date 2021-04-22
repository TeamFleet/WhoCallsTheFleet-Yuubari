import { Component } from 'react';
import { extend } from 'koot';

import db from '@database';

import IconEquipment from '@ui/components/icon-equipment';
import Title from '@ui/components/title';

@extend({
    styles: require('./title.less'),
})
class ShipListTitle extends Component {
    render() {
        if (this.props.type) {
            const type = db.equipmentTypes[this.props.type];
            return (
                <IconEquipment
                    tag="div"
                    className={this.props.className}
                    icon={type.icon}
                >
                    <Title
                        component="h4"
                        className={this.props.className + '-title'}
                        children={type._name}
                    />
                </IconEquipment>
            );
        } else
            return (
                <h4 className={this.props.className} disabled>
                    --
                </h4>
            );
    }
}

export default ShipListTitle;
