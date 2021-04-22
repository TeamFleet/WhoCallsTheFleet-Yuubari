import { Component, Fragment } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';
import { Link } from 'react-router';

import {
    init,
    isBuildValid,
    getBuildUrl,
    newBuild,
    // editBuild,
} from '@api/fleets';
import htmlHead from '@utils/html-head';
import { appReady } from '@const/client-globals';

import Page from '@ui/containers/page';
import Center from '@ui/containers/center';

import Button from '@ui/components/button';
import Title from '@ui/components/title';
import LoaderFairyOoyodo2 from '@ui/components/loader/fairy-ooyodo-2';
import Header from '@ui/components/main-header/main-options';

//

const PageFleets = extend({
    pageinfo: (state) =>
        htmlHead(state, {
            title: __('nav.fleets'),
        }),
})(() => (
    <Page>
        <PageFleetsBody />
    </Page>
));
export default PageFleets;

//

@extend({
    connect: true,
    styles: require('./styles.less'),
})
class PageFleetsBody extends Component {
    state = {
        ready: false,
    };

    componentDidMount() {
        if (!__CLIENT__) return;
        Promise.all([
            this.props.dispatch(init()),
            new Promise((resolve) =>
                setTimeout(() => resolve(), window[appReady] ? 0 : 2000)
            ),
        ]).then(() => {
            this.setState({
                ready: true,
            });
        });
    }

    render() {
        if (!__CLIENT__)
            return <Title component="h2" children={__('nav.fleets')} />;

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
            );

        const { className } = this.props;

        return (
            <Fragment>
                <PageFleetsHeader className={className + '-header'} />
                <div className={className}>
                    <PageFleetsList className={className + '-list'} />
                </div>
            </Fragment>
        );
    }
}

//

const PageFleetsHeader = extend({
    connect: true,
})(({ className, dispatch }) => {
    function onClick() {
        dispatch(newBuild(true));
    }
    return (
        <Header
            className={className}
            main={
                <Fragment>
                    {__('under_construction')}
                    <Button children="NEW BUILD" onClick={onClick} />
                </Fragment>
            }
        />
    );
});

//

const PageFleetsList = extend({
    connect: (state) => ({
        builds: state.fleets.builds,
    }),
})(({ builds, dispatch }) => {
    builds = builds.filter((build) => {
        if (!isBuildValid(build)) {
            if (__DEV__) console.warn('INVALID BUILD', build);
            return false;
        }
        return true;
    });

    const hasData = Array.isArray(builds) && builds.length > 0;
    function onClick() {
        dispatch(newBuild(true));
    }

    return (
        <Fragment>
            <Title component="h2" children={__('under_construction')} />
            {hasData &&
                builds.map((build) => (
                    <div key={build._id}>
                        <Link to={getBuildUrl(build)}>{build._id}</Link>
                    </div>
                ))}
            {!hasData && (
                <div>
                    <Button children="NEW BUILD" onClick={onClick} />
                </div>
            )}
        </Fragment>
    );
});
