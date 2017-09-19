import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
// import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from '@appUtils/html-head.js'
import Header from './commons/header.jsx'
import InfosPageContainer from '@appUI/containers/infos-page'
import ComponentContainer from '@appUI/containers/infos-component'
import db from '@appLogic/database'

import Pictures from './components/pictures'

import { ImportStyle } from 'sp-css-import'

@connect()
@ImportStyle(require('./styles.less'))
export default class extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: db.entities[store.getState().routing.locationBeforeTransitions.pathname.split('/').reverse()[0]]._name
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
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