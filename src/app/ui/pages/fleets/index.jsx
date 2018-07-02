import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'
import { pageinfo } from 'super-project'

import {
    init,
    isBuildValid,
    getBuildUrl,
    newBuild,
    editBuild,
} from '@api/fleets'

import htmlHead from '@utils/html-head'
// import routerPush from '@utils/router-push'

import Page from '@ui/containers/page'
import Center from '@ui/containers/center'

import { Link } from 'react-router'
import Button from '@ui/components/button'
import Title from '@ui/components/title'
import LoaderFairyOoyodo2 from '@ui/components/loader/fairy-ooyodo-2'
import Header from '@ui/components/main-header/main-options'

@connect()
@pageinfo(() => htmlHead({
    title: __('nav.fleets')
}))
export default class PageFleets extends React.Component {
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
            return <Title component="h2" children={__('nav.fleets')} />

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
                    {__('under_construction')}
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
            <Title component="h2" children={__('under_construction')} />
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
