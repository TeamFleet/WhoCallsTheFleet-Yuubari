import React from 'react';
import { extend } from 'koot';

import htmlHead from '@utils/html-head';

import Page from '@ui/containers/page';
import Title from '@ui/components/title';
import UnderConstruction from '@ui/components/under-construction';

const ViewUnderConstruction = extend({
    pageinfo: (state, props) =>
        htmlHead(state, {
            title: props.title
        })
    // styles:
})(({ className, title }) => (
    <Page className={className}>
        <Title component="h2" children={title} />
        <UnderConstruction />
    </Page>
));

export default ViewUnderConstruction;
