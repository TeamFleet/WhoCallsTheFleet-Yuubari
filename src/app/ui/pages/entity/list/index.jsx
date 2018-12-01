import React from 'react'
import { extend } from 'koot'

import htmlHead from '@utils/html-head'

import db from '@database'

import Page from '@ui/containers/page'

import ListCasters from '@ui/components/list/casters'
import ListArtists from '@ui/components/list/artists'
import Title from '@ui/components/title'

//

const PageEntityList = extend({
    connect: true,
    pageinfo: (state) => htmlHead(state, {
        title: __('nav.entities')
    })
})(
    (props) => {
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
            <Page
                className={props.className}
            >
                <ListTitle>{__('seiyuus')}</ListTitle>
                <ListCasters
                    list={listCVs.sort((a, b) => (
                        b.relation.cv.length - a.relation.cv.length
                    ))}
                    count={true}
                />

                <ListTitle>{__('artists')}</ListTitle>
                <ListArtists
                    list={listArtists.sort((a, b) => (
                        b.relation.illustrator.length - a.relation.illustrator.length
                    ))}
                    count={true}
                />
            </Page>
        )
    }
)
export default PageEntityList

//

const ListTitle = extend({
    styles: require('./styles-title.less')
})(
    (props) => (
        <Title
            component="h2"
            type="line-append"
            inherit={true}
            {...props}
        />
    )
)
