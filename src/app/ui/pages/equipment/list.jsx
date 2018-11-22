import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import { pageinfo } from 'koot'

import htmlHead from '@utils/html-head'

import db from '@api/database'
import {
    reset as equipmentListReset
} from '@api/equipment-list/api.js'

import Page from '@ui/containers/page'

// import Link from '@ui/components/link'
import EquipmentList from '@ui/components/equipment-list'

const equipmentListId = 'pageEquipmentList'

// @connect(state => ({
//     isEquipmentListInit: (typeof state.equipmentList[equipmentListId] !== 'undefined')
// }))
@connect()
@pageinfo((state) => htmlHead(state, {
    title: __('nav.equipments')
}))
@ImportStyle(require('./list.less'))
export default class PageEquipmentList extends React.Component {

    constructor(props) {
        super(props)

        if (props.location.action === 'PUSH')
            props.dispatch(equipmentListReset(equipmentListId))
    }

    render() {
        if (__DEV__ && __CLIENT__) console.log('Equipment Collections', db.equipmentCollections)
        return (
            <Page className={this.props.className} >
                <EquipmentList id={equipmentListId} />
            </Page>
        )
        // return (
        //     <PageContainer
        //         className={this.props.className}
        //     >
        //         <p><i>{__('under_construction')}...</i></p>
        //         {db.equipmentCollections.map((collection, collectionIndex) => (
        //             <div key={collectionIndex}>
        //                 <h3>{collection.name}</h3>
        //                 {collection.list.map((list, listIndex) => (
        //                     <div key={`${collectionIndex}-${listIndex}`}>
        //                         <h5>{db.equipmentTypes[list.type]._name}</h5>
        //                         <ul>
        //                             {list.equipments.map((equipment, equipmentIndex) => (
        //                                 <li key={`${collectionIndex}-${listIndex}-${equipmentIndex}`}>
        //                                     <Link to={`/equipments/${equipment.id}`}>
        //                                         {equipment._name}
        //                                     </Link>
        //                                 </li>
        //                             ))}
        //                         </ul>
        //                     </div>
        //                 ))}
        //                 <hr />
        //                 <br />
        //             </div>
        //         ))}
        //     </PageContainer>
        // )
    }
}
