import React from 'react'
import { connect } from 'react-redux'

// import { ImportStyle } from 'sp-css-import'
import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'

import htmlHead from '@appUtils/html-head.js'
import db from '@appLogic/database'

import LinkEntity from '@appUI/components/link/entity'
import ListCasters from '@appUI/components/list/casters'


@connect()
// @ImportStyle(style)
export default class extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.entities')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        const listCVs = []
        const listArtists = []

        for (let id in db.entities) {
            const entity = db.entities[id]
            if (!entity.relation) continue
            if (Array.isArray(entity.relation.cv) && entity.relation.cv.length)
                listCVs.push(entity)
            if (Array.isArray(entity.relation.illustrator) && entity.relation.illustrator.length)
                listArtists.push(entity)
        }

        return (
            <PageContainer
                className={this.props.className}
            >
                <p><i>{translate('under_construction')}...</i></p>

                <h2>{translate('seiyuu')}</h2>
                <ListCasters
                    list={listCVs.sort((a, b) => (
                        b.relation.cv.length - a.relation.cv.length
                    ))}
                />

                <h2>{translate('artist')}</h2>
            </PageContainer>
        )
    }
}