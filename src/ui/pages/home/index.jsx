import React from 'react';
import { extend } from 'koot';

import pkgDatabase from 'whocallsthefleet-database/package.json';
import pkgKckit from 'kckit/package.json';

import htmlHead from '@utils/html-head';

import Page from '@ui/containers/page';
import CenterContainer from '@ui/containers/center';
import Markdown from '@ui/components/markdown';

// const getMD = (localeId) => {
//     if (__CLIENT__ && !__DEV__) return __HOME_MARKDOWN__;
//     return __HOME_MARKDOWN__[localeId];
// };

const PageHome = extend({
    pageinfo: (state) => htmlHead(state),
    styles: require('./styles.less'),
})(({ className }) => (
    <Page className={className}>
        <CenterContainer>
            <Markdown
                source={__('home_page_markdown')}
                childAfter={<span className="end-of-doc"></span>}
            />
        </CenterContainer>
    </Page>
));

export default PageHome;
