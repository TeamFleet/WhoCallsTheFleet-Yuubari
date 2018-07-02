import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import { pageinfo } from 'super-project'

import db from '@api/database'
import htmlHead from '@utils/html-head'
import getSubtitle from './get-subtitle'

import Header from './commons/header'
import Pictures from './components/pictures'
import InfosPageContainer from '@ui/containers/infos-page'
import ComponentContainer from '@ui/containers/infos-component'
import ListShips from '@ui/components/list/ships'
import Title from '@ui/components/title'

const isCV = entity => (Array.isArray(entity.relation.cv) && entity.relation.cv.length)

@connect()
@pageinfo((state, renderProps) => {
    const id = typeof renderProps.params === 'object' ? renderProps.params.id : undefined

    if (typeof id === 'undefined')
        return {}

    const entity = db.entities[id]
    const name = entity._name

    return htmlHead({
        title: name,
        subtitle: getSubtitle(entity),
        description: (
            name
            // 类型
            + `, ${isCV(entity) ? __('seiyuu') : __('artist')}`
        ),
    })
})
@ImportStyle(require('./styles.less'))
export default class extends React.Component {

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
