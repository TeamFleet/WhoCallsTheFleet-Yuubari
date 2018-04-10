import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'

import {
    init, getBuild,
    decompressBuild,
} from '@appLogic/fleets'

import htmlHead from '@appUtils/html-head'

import Page from '@appUI/containers/page'
import Center from '@appUI/containers/center'

import Button from '@appUI/components/button'
import Title from '@appUI/components/title'
import LoaderFairyOoyodo2 from '@appUI/components/loader/fairy-ooyodo-2'
import Header from '@appUI/components/main-header/main-options'

@connect()
export default class PageFleet extends React.Component {
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
            <Page>
                <PageFleetContainer
                    id={this.props.params.id}
                    initialBuild={decompressBuild(this.props.params.build)}
                />
            </Page>
        )
    }
}

@connect((state, ownProps) => {
    const isNedbInit = (
        typeof state.fleets === 'object' &&
        typeof state.fleets.current === 'object'
    )
    if (!isNedbInit)
        return {
            isNedbInit
        }

    const isBuildCurrent = (
        isNedbInit &&
        typeof state.fleets === 'object' &&
        ownProps.id === state.fleets.current._id
    )
    if (isBuildCurrent)
        return {
            isNedbInit,
            isBuildCurrent,
            // build: state.fleets.current,
        }

    return {
        isNedbInit,
        // isBuildCurrent,
        isBuildStored: (
            isNedbInit && (
                Array.isArray(state.fleets.builds) &&
                state.fleets.builds.some(build => build._id === ownProps._id)
            )
        ),
    }
})
@ImportStyle(require('./styles.less'))
class PageFleetContainer extends React.Component {
    state = {
        ready: false,
    }

    check() {
        if (
            this.state.ready ||
            !__CLIENT__ ||
            !this.mounted
        ) return

        const ready = () => {
            this.setState({
                ready: true,
            })
        }

        if (!this.props.isNedbInit)
            return this.props.dispatch(init())

        if (this.props.isBuildCurrent)
            return ready()

        if (this.props.isBuildStored)
            return Promise.all([
                this.props.dispatch(init()),
                new Promise(resolve => setTimeout(
                    () => resolve(),
                    self.isAppReady ? 500 : 2000
                ))
            ])
                .then(ready)
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

        const {
            className
        } = this.props

        return (
            <React.Fragment>
                <PageFleetHeader className={className + '-header'} />
                <div className={className}>
                    123
                </div>
            </React.Fragment>
        )
    }
}

const PageFleetHeader = connect()(({
    className,
    build,
}) => {
    return (
        <Header
            className={className}
            main={translate('under_construction')}
        />
    )
})
