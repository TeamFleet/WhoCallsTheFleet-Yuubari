import React from 'react'
import { connect } from 'react-redux'

import { ImportStyle } from 'sp-css-import'
import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'

import htmlHead from '@appUtils/html-head.js'
import db from '@appLogic/database'

import ListCasters from '@appUI/components/list/casters'
import ListArtists from '@appUI/components/list/artists'

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
                <Title>{translate('seiyuus')}</Title>
                <ListCasters
                    list={listCVs.sort((a, b) => (
                        b.relation.cv.length - a.relation.cv.length
                    ))}
                    count={true}
                />

                <Title>{translate('artists')}</Title>
                <ListArtists
                    list={listArtists.sort((a, b) => (
                        b.relation.illustrator.length - a.relation.illustrator.length
                    ))}
                    count={true}
                />
            </PageContainer>
        )
    }
}

@ImportStyle(require('./styles-title.less'))
class Title extends React.Component {
    render() {
        const {
            children,
            ...props
        } = this.props
        return (
            <h2 {...props}>
                {children}
            </h2>
        )
    }
}