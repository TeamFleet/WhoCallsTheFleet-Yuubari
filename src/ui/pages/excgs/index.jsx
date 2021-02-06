import React from 'react';
import { extend } from 'koot';
import classNames from 'classnames';

import htmlHead from '@utils/html-head';
import getPic from '@utils/get-pic';

import db from '@database';
import {
    init as infosInit,
    changeTab as infosChangeTab,
    // reset as infosReset,
    TABINDEX,
} from '@api/pages';

import Page from '@ui/containers/page';

import Title from '@ui/components/title';
import Image from '@ui/components/image';
import UnderConstruction from '@ui/components/under-construction';
import MainHeader from '@ui/components/main-header/main-options';

import styles from './index.styles.less';

const infosId = 'PAGE_EXILLUSTS';
const illustIds = [8, 9];

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

@extend({
    connect: [
        (state) => state.pages[infosId] || {},
        (dispatch /*, ownProps*/) => ({
            init: (defaultIndex) =>
                dispatch(
                    infosInit(infosId, {
                        [TABINDEX]: defaultIndex,
                    })
                ),
            changeTab: (index) => {
                window.scrollTo(0, 0);
                return dispatch(infosChangeTab(infosId, index));
            },
        }),
    ],
    pageinfo: (state) =>
        htmlHead(state, {
            title: __('nav.excgs'),
        }),
    styles,
})
class PageExCGs extends React.Component {
    constructor() {
        super();

        // 将 exillustTypes 转为 array
        this.types = [];
        for (const id in db.exillustTypes) {
            this.types[id] = Object.assign(db.exillustTypes[id], {
                list: [],
            });
        }
        // 将 exillusts 写入 types
        for (const id in db.exillusts) {
            const obj = db.exillusts[id];
            if (this.types[obj.type]) this.types[obj.type].list.push(obj);
        }
        // 最终处理
        this.types = this.types
            .filter((value) => !!value)
            .sort((a, b) => a.sort - b.sort);

        this.state = {
            selected: undefined,
        };
    }

    render() {
        if (typeof this.props[TABINDEX] === 'undefined') {
            this.props.init(0);
            if (__CLIENT__) return null;
        }

        const cur = this.types[this.props[TABINDEX]];
        if (!cur) return null;

        return (
            <Page className={this.props.className}>
                <MainHeader
                    title={__('nav.excgs')}
                    className="header"
                    main={
                        <>
                            <UnderConstruction />

                            <div className="tabs">
                                <div className="wrapper">
                                    {this.types.map((obj, index) => (
                                        <Tab
                                            key={index}
                                            index={index}
                                            name={obj._name}
                                            count={obj.list.length}
                                            isOn={
                                                index === this.props[TABINDEX]
                                            }
                                            cbChangeTab={this.props.changeTab}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    }
                />

                <div>
                    <div className="title">
                        <Title type="inline-block" component="h2">
                            {cur._name}
                        </Title>
                        {cur._time && <small> ({cur._time})</small>}
                    </div>
                    {cur.list.reverse().map((obj) => (
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
                            {illustIds.map((illustId) => (
                                <div
                                    key={illustId}
                                    style={{
                                        flex: '1',
                                        position: 'relative',
                                        height: '100%',
                                    }}
                                >
                                    {(obj.exclude || []).includes(illustId) ? (
                                        <div
                                            style={{
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
                                            }}
                                        >
                                            无
                                        </div>
                                    ) : (
                                        <Image
                                            src={getPic(
                                                'ship-extra',
                                                obj.id,
                                                illustId
                                            )}
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
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Page>
        );
    }
}
export default PageExCGs;

// ============================================================================

const Tab = React.memo(({ index, name, count, isOn, cbChangeTab }) => {
    function onClick() {
        cbChangeTab(index);
    }
    return (
        <span
            className={classNames([
                'tab',
                {
                    on: isOn,
                },
            ])}
            onClick={onClick}
        >
            {name} ({count})
        </span>
    );
});
