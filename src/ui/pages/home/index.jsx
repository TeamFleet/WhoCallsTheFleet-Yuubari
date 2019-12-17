import React from 'react';
import { extend } from 'koot';

import htmlHead from '@utils/html-head';

import Page from '@ui/containers/page';
import CenterContainer from '@ui/containers/center';
import Markdown from '@ui/components/markdown';

const getMD = localeId => {
    // TODO: write a webpack plugin to include docs
    // DOC('updates/1.0.0')

    if (localeId === 'en') return require(`@docs/updates/1.0.0/en.md`).default;
    if (localeId === 'ja') return require(`@docs/updates/1.0.0/ja.md`).default;
    return require(`@docs/updates/1.0.0/zh.md`).default;
};

const PageHome = extend({
    connect: state => ({
        localeId: state.localeId
    }),
    pageinfo: state => htmlHead(state),
    styles: require('./styles.less')
})(({ className, localeId }) => (
    <Page className={className}>
        <CenterContainer>
            <Markdown
                source={getMD(localeId)}
                childAfter={<span className="end-of-doc"></span>}
            />
        </CenterContainer>
    </Page>
));

export default PageHome;
