import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'

import {
    init,
    isBuildValid,
    getBuildUrl,
    newBuild,
    editBuild,
} from '@appLogic/fleets'

import htmlHead from '@appUtils/html-head'
// import routerPush from '@appUtils/router-push'

import Page from '@appUI/containers/page'
import Center from '@appUI/containers/center'

import { Link } from 'react-router'
import Button from '@appUI/components/button'
import Title from '@appUI/components/title'
import LoaderFairyOoyodo2 from '@appUI/components/loader/fairy-ooyodo-2'
import Header from '@appUI/components/main-header/main-options'

@connect()
export default class PageFleets extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.fleets')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <Page>
                <PageFleetsBody />
            </Page>
        )
    }
}

@connect()
@ImportStyle(require('./styles.less'))
class PageFleetsBody extends React.Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        if (!__CLIENT__) return
        Promise.all([
            this.props.dispatch(init()),
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
                <PageFleetsHeader className={className + '-header'} />
                <div className={className}>
                    <PageFleetsList className={className + '-list'} />
                </div>
            </React.Fragment>
        )
    }
}

const PageFleetsHeader = connect()(({
    className,
    dispatch,
}) => {
    return (
        <Header
            className={className}
            main={
                <React.Fragment>
                    {translate('under_construction')}
                    <Button
                        children="NEW BUILD"
                        onClick={() => dispatch(newBuild(true))}
                    />
                </React.Fragment>
            }
        />
    )
})

const PageFleetsList = connect(state => ({
    builds: state.fleets.builds
}))(({
    // className,
    builds,
    dispatch,
}) => {
    builds = builds
        .filter(build => {
            if (!isBuildValid(build)) {
                if (__DEV__)
                    console.warn('INVALID BUILD', build)
                return false
            }
            return true
        })
    const hasData = Array.isArray(builds) && builds.length > 0
    return (
        <React.Fragment>
            <Title component="h2" children={translate('under_construction')} />
            {hasData && builds.map(build => (
                <div
                    key={build._id}
                >
                    <Link to={getBuildUrl(build)}>
                        {build._id}
                    </Link>
                </div>
            ))}
            {!hasData &&
                <div>
                    <Button
                        children="NEW BUILD"
                        onClick={() => dispatch(newBuild(true))}
                    />
                </div>
            }
        </React.Fragment>
    )
})
