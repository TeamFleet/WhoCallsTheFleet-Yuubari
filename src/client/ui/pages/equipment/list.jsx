import React from 'react'
import { connect } from 'react-redux'

// import Link from '@appUI/components/link'

import { ImportStyle } from 'sp-css-import'

import htmlHead from '@appUtils/html-head.js'

import db from '@appLogic/database'
import {
    reset as equipmentListReset
} from '@appLogic/equipment-list/api.js'

import Page from '@appUI/containers/page'

import EquipmentList from '@appUI/components/equipment-list'

const equipmentListId = 'pageEquipmentList'

// @connect(state => ({
//     isEquipmentListInit: (typeof state.equipmentList[equipmentListId] !== 'undefined')
// }))
@connect()
@ImportStyle(require('./list.less'))
export default class PageEquipmentList extends React.Component {
    static onServerRenderHtmlExtend({ htmlTool: ext, store }) {
        const head = htmlHead({
            store,
            title: __('nav.equipments')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    constructor(props) {
        super(props)

        if (props.location.action === 'PUSH')
            props.dispatch(equipmentListReset(equipmentListId))
    }

    render() {
        if (__DEV__) console.log('Equipment Collections', db.equipmentCollections)
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
