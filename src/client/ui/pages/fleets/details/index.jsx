import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'

import {
    init, editBuild,
    decompressBuild,
} from '@appLogic/fleets'

import htmlHead from '@appUtils/html-head'

// import Page from '@appUI/containers/page'
import InfosPage from '@appUI/containers/infos-page'
import Center from '@appUI/containers/center'

import Button from '@appUI/components/button'
import Title from '@appUI/components/title'
import LoaderFairyOoyodo2 from '@appUI/components/loader/fairy-ooyodo-2'

import Header from './header'
import Fleet from './fleet'
import Bases from './bases'

@connect()
export default class PageFleetDetails extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.fleets')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    shouldComponentUpdate(newProps) {
        if (
            typeof newProps.params === 'object' &&
            typeof this.props.params === 'object' &&
            newProps.params.id === this.props.params.id
        )
            return false
        return true
    }

    render() {
        return (
            <InfosPage>
                <PageFleetDetailsBody
                    id={this.props.params.id}
                    initialBuild={decompressBuild(this.props.params.build)}
                />
            </InfosPage>
        )
    }
}

@connect((state, ownProps) => {
    if (
        typeof state.fleets !== 'object' ||
        !Array.isArray(state.fleets.builds)
    ) return {
        status: 'no-nedb'
    }

    if (
        typeof state.fleets.current === 'object' &&
        ownProps.id === state.fleets.current._id
    ) return {
        status: 'is-current'
    }

    if (
        state.fleets.builds.some(build => build._id === ownProps.id)
    ) return {
        status: 'build-stored-not-current'
    }

    return {
        status: 'build-not-stored'
    }
})
@ImportStyle(require('./styles.less'))
class PageFleetDetailsBody extends React.Component {
    state = {
        ready: false,
    }

    check() {
        if (
            this.state.ready ||
            !__CLIENT__ ||
            !this.mounted
        ) return

        // if (__CLIENT__ && __DEV__) {
        //     console.log(' ')
        //     console.log('status', this.props.status)
        //     console.log(' ')
        // }
        Promise.all([
            new Promise(resolve => {
                switch (this.props.status) {
                    case 'no-nedb': {
                        this.props.dispatch(init())
                            .then(resolve)
                        break
                    }

                    case 'is-current': {
                        resolve()
                        break
                    }

                    case 'build-stored-not-current': {
                        this.props.dispatch(editBuild(
                            this.props.initialBuild
                        ))
                            .then(resolve)
                        break
                    }

                    case 'build-not-stored': {
                        console.warn('WIP: build-not-stored')
                        break
                    }
                }
            }),
            new Promise(resolve => setTimeout(
                () => resolve(),
                self.isAppReadyFull ? 0 : 2000
            ))
        ])
            .then(() => {
                this.setState({
                    ready: true,
                })
            })
    }

    componentDidMount() {
        this.mounted = true
        this.check()
    }

    componentDidUpdate() {
        this.check()
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        if (!__CLIENT__)
            return <Title component="h2" children={translate('nav.fleets')} />

        if (!this.state.ready)
            return (
                <Center
                    className={classNames([
                        this.props.className,
                        'is-initializing',
                    ])}
                >
                    <LoaderFairyOoyodo2 className="loader" />
                </Center>
            )

        if (this.props.status === 'build-not-stored')
            return (
                <Center
                    className={classNames([
                        this.props.className,
                        'is-initializing',
                    ])}
                >
                    <div style={{ display: 'inline-block' }}>
                        <Title component="h4" style={{ margin: '0' }} children="W.I.P." />
                        <Title component="h2" style={{ marginTop: '5px' }} children="BUILD NOT STORED" />
                    </div>
                </Center>
            )

        return (
            <div className={classNames([
                this.props.className,
                'is-ready',
            ])}>
                <Header className={this.props.className + '-header'} />
                <Fleet />
                <Bases />
            </div>
        )
    }
}
