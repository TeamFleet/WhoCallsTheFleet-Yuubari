import React from 'react'
import { connect } from 'react-redux'

// import { ImportStyle } from 'sp-css-import'

import htmlHead from '@appUtils/html-head.js'
import getPic from '@appUtils/get-pic.js'

import db from '@appLogic/database'
import {
    init as infosInit,
    changeTab as infosChangeTab,
    // reset as infosReset,
    TABINDEX
} from '@appLogic/pages'

import Page from '@appUI/containers/page'

import Title from '@appUI/components/title'
import Image from '@appUI/components/image'

const infosId = 'PAGE_EXILLUSTS'
const illustIds = [8, 9]

// @connect()
// // @ImportStyle(style)
// export default class extends React.Component {
//     static onServerRenderHtmlExtend({ htmlTool: ext, store }) {
//         const head = htmlHead({
//             store,
//             title: __('nav.exillusts')
//         })

//         ext.metas = ext.metas.concat(head.meta)
//         ext.title = head.title
//     }

//     render() {
//         return (
//             <PageContainer
//                 className={this.props.className}
//             >
//                 <p><i>{__('under_construction')}...</i></p>
//             </PageContainer>
//         )
//     }
// }

@connect(
    state => state.pages[infosId] || {},
    (dispatch, ownProps) => ({
        init: defaultIndex => dispatch(
            infosInit(
                infosId,
                {
                    [TABINDEX]: defaultIndex
                }
            )
        ),
        changeTab: index => dispatch(
            infosChangeTab(infosId, index)
        )
    })
)
// @ImportStyle(style)
export default class extends React.Component {
    static onServerRenderHtmlExtend({ htmlTool: ext, store }) {
        const head = htmlHead({
            store,
            title: __('nav.exillusts')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    constructor() {
        super()

        // 将 exillustTypes 转为 array
        this.types = []
        for (const id in db.exillustTypes) {
            this.types[id] = Object.assign(db.exillustTypes[id], {
                list: []
            })
        }
        // 将 exillusts 写入 types
        for (const id in db.exillusts) {
            const obj = db.exillusts[id]
            if (this.types[obj.type])
                this.types[obj.type].list.push(obj)
        }
        // 最终处理
        this.types = this.types
            .filter(value => !!value)
            .sort((a, b) => a.sort - b.sort)

        this.state = {
            selected: undefined
        }
    }

    render() {
        if (typeof this.props[TABINDEX] === 'undefined') {
            this.props.init(0)
            if (__CLIENT__) return null
        }

        const cur = this.types[this.props[TABINDEX]]
        if (!cur) return null

        return (
            <Page
                className={this.props.className}
            >
                <p><i>{__('under_construction')}...</i></p>

                <div style={{
                    marginRight: '-10px',
                    overflow: 'hidden',
                }}>
                    {this.types.map((obj, index) => (
                        <span
                            key={index}
                            style={{
                                display: 'block',
                                float: 'left',
                                marginRight: '10px',
                                padding: '.2em .5em',
                                fontSize: 'smaller',
                                lineHeight: '1.2em',
                                background: index === this.props[TABINDEX] ? 'rgba(255,255,255,.2)' : undefined,
                                color: index === this.props[TABINDEX] ? '#fff' : undefined,
                            }}
                            onClick={() => {
                                this.props.changeTab(index)
                            }}
                        >
                            {obj._name} ({obj.list.length})
                        </span>
                    ))}
                </div>

                <hr />

                <div>
                    <div className="title">
                        <Title type="inline-block" component="h2">
                            {cur._name}
                        </Title>
                        {cur._time && <small>  ({cur._time})</small>}
                    </div>
                    {cur.list.map(obj => (
                        <div
                            key={obj.id}
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                height: '300px',
                                position: 'relative',
                                marginTop: '1em',
                            }}
                        >
                            {illustIds.map(illustId => (
                                <div
                                    key={illustId}
                                    style={{
                                        flex: '1',
                                        position: 'relative',
                                        height: '100%',
                                    }}
                                >
                                    {(obj.exclude || []).includes(illustId)
                                        ? <div style={{
                                            color: 'rgba(255,255,255,.15)',
                                            fontSize: '3rem',
                                            display: 'block',
                                            position: 'absolute',
                                            width: '100%',
                                            height: '0',
                                            textAlign: 'center',
                                            top: '50%',
                                            lineHeight: '0',
                                            fontWeight: '100',
                                        }}>无</div>
                                        : <Image
                                            src={getPic('ship-extra', obj.id, illustId)}
                                            style={{
                                                display: 'block',
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            styleImg={{
                                                display: 'block',
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Page>
        )
    }
}
