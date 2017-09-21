import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
// import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from '@appUtils/html-head.js'
import db from '@appLogic/database'
import { ImportStyle } from 'sp-css-import'
import getSubtitle from './get-subtitle'

import Header from './commons/header.jsx'
import InfosPageContainer from '@appUI/containers/infos-page'
import ComponentContainer from '@appUI/containers/infos-component'

import Pictures from './components/pictures'

const extractFromState = (state) => {
    const pathname = state.routing.locationBeforeTransitions.pathname
    const segs = pathname.split('/')
    const indexEntities = segs.indexOf('entities')

    return {
        id: parseInt(segs[indexEntities + 1])
    }
}

@connect()
@ImportStyle(require('./styles.less'))
export default class extends React.Component {
    // static onServerRenderHtmlExtend(ext, store) {
    //     const head = htmlHead({
    //         store,
    //         title: db.entities[store.getState().routing.locationBeforeTransitions.pathname.split('/').reverse()[0]]._name
    //     })

    //     ext.metas = ext.metas.concat(head.meta)
    //     ext.title = head.title
    // }
    static onServerRenderHtmlExtend(ext, store) {
        const { id } = extractFromState(store.getState())

        const entity = db.entities[id]
        const obj = {
            store
        }
        if (entity) {
            obj.title = entity._name
            obj.subtitle = getSubtitle(entity)
            // obj.description = getDescription(ship)
        }
        const head = htmlHead(obj)

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title// + translate("ship_details." + tab)
    }

    get data() {
        if (!this._data && this.props.params.id)
            this._data = db.entities[this.props.params.id]
        return this._data || {}
    }

    render() {
        if (__CLIENT__ && __DEV__) console.log('thisEntity', this.data)

        const isCV = (Array.isArray(this.data.relation.cv) && this.data.relation.cv.length)
        const hasPics = (isCV)

        return (
            <InfosPageContainer
                className={this.props.className}
                has-tabs={false}
            >
                <Header
                    entity={this.data}
                />

                {hasPics && <Pictures entity={this.data} className="entityinfo entityinfo-pictures" />}
                <ComponentContainer>
                    <p><i>{translate('under_construction')}...</i></p>
                </ComponentContainer>
            </InfosPageContainer>
        )
    }
}