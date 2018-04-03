import React from 'react'
import { connect } from 'react-redux'

// import Link from '@appUI/components/link'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from '@appUtils/html-head.js'
import db from '@appLogic/database'
import {
    reset as equipmentListReset
} from '@appLogic/equipment-list/api.js'

import EquipmentList from '@appUI/components/equipment-list'

import { ImportStyle } from 'sp-css-import'
import style from './list.less'

const equipmentListId = 'pageEquipmentList'

@connect(state => ({
    isEquipmentListInit: (typeof state.equipmentList[equipmentListId] !== 'undefined')
}))
@ImportStyle(style)
export default class PageEquipmentList extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.equipments')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    componentWillMount() {
        if (this.props.isEquipmentListInit && this.props.location.action === 'PUSH')
            this.props.dispatch(equipmentListReset(equipmentListId))
    }

    render() {
        if (__DEV__) console.log('Equipment Collections', db.equipmentCollections)
        return (
            <PageContainer className={this.props.className} >
                <EquipmentList id={equipmentListId} />
            </PageContainer>
        )
        // return (
        //     <PageContainer
        //         className={this.props.className}
        //     >
        //         <p><i>{translate('under_construction')}...</i></p>
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
