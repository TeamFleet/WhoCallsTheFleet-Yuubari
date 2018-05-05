import React from 'react'
import { connect } from 'react-redux'

import htmlHead from '@appUtils/html-head.js'
import db from '@appLogic/database'
import { ImportStyle } from 'sp-css-import'
import getSubtitle from './get-subtitle'

import Header from './commons/header.jsx'
import InfosPageContainer from '@appUI/containers/infos-page'
import ComponentContainer from '@appUI/containers/infos-component'

import Pictures from './components/pictures'
import ListShips from '@appUI/components/list/ships'
import Title from '@appUI/components/title'

const extractFromState = (state) => {
    const pathname = state.routing.locationBeforeTransitions.pathname
    const segs = pathname.split('/')
    const indexEntities = segs.indexOf('entities')

    return {
        id: parseInt(segs[indexEntities + 1])
    }
}

const isCV = entity => (Array.isArray(entity.relation.cv) && entity.relation.cv.length)

const getDescription = entity => {
    return entity._name
        // 类型
        + `, ${isCV(entity) ? __('seiyuu') : __('artist')}`
}

@connect()
@ImportStyle(require('./styles.less'))
export default class extends React.Component {
    static onServerRenderHtmlExtend({ htmlTool: ext, store }) {
        const { id } = extractFromState(store.getState())

        const entity = db.entities[id]
        const obj = {
            store
        }
        if (entity) {
            obj.title = entity._name
            obj.subtitle = getSubtitle(entity)
            obj.description = getDescription(entity)
        }
        const head = htmlHead(obj)

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    get data() {
        if (!this._data && this.props.params.id)
            this._data = db.entities[this.props.params.id]
        return this._data || {}
    }

    getList(type) {
        if (Array.isArray(this.data.relation[type]) && this.data.relation[type].length)
            return this.data.relation[type].map(series => (
                series[series.length - 1]
            ))
        return []
    }

    render() {
        if (__CLIENT__ && __DEV__) console.log('thisEntity', this.data)

        // const isCV = (Array.isArray(this.data.relation.cv) && this.data.relation.cv.length)
        const hasPics = isCV(this.data)

        return (
            <InfosPageContainer
                className={this.props.className}
                has-tabs={false}
            >
                <Header
                    entity={this.data}
                />

                {hasPics && <Pictures entity={this.data} className="entityinfo entityinfo-pictures" />}

                <ContentList
                    type="casts"
                    list={this.getList('cv')}
                />
                <ContentList
                    type="illustrates"
                    list={this.getList('illustrator')}
                    extraIllust={true}
                />

                <ContentLinks links={this.data.links} />

            </InfosPageContainer>
        )
    }
}

const ContentList = ({ list, type, ...props }) => {
    if (!list.length) return null
    return (
        <ComponentContainer
            title={
                <div className="title">
                    <Title tag="h2" className="title-inline" children={__(`entity_details`, type)} />
                    <small className="count">({list.length})</small>
                </div>
            }
            className={`entityinfo entityinfo-list entityinfo-${type}`}
        >
            <ListShips
                list={list}
                type="names"
                className="list"
                sort={false}
                {...props}
            />
        </ComponentContainer>
    )
}

const ContentLinks = ({ links }) => {
    if (!Array.isArray(links)) return null

    links = links.filter(obj => !!(obj.name))
    if (!links.length) return null

    return (
        <ComponentContainer
            title={__(`entity_details.links`)}
            className={`entityinfo entityinfo-links`}
        >
            {links.map((obj, index) => (
                <a
                    className="item"
                    href={obj.url}
                    target="_blank"
                    key={index}
                >
                    {obj.name}
                </a>
            ))}
        </ComponentContainer>
    )
}
