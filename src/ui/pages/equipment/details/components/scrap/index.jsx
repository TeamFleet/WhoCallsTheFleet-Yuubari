import React from 'react'
import classNames from 'classnames'
import { extend } from 'koot'

import arrResources from '@const/resources'
import getValue from '@utils/get-value'

import ComponentContainer from '@ui/containers/infos-component'
import Stat from '@ui/components/stat'

const EquipmentDetailsComponentScrap = extend({
    styles: require('./styles.less')
})(
    ({ className, equipment }) =>
        <ComponentContainer className={className} title={__("equipment_details.scrap")}>
            {arrResources.map((resource, index) => {
                const value = getValue(equipment.dismantle[index])
                return (
                    <Stat
                        className={
                            classNames(['item', {
                                disabled: !value
                            }])
                        }
                        key={index}
                        stat={resource}
                    >
                        {value}
                    </Stat>
                )
            })}
        </ComponentContainer>
)
export default EquipmentDetailsComponentScrap
