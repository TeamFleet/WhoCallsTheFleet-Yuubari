import { memo } from 'react';
import { extend } from 'koot';

import htmlHead from '@utils/html-head';

import Page from '@ui/containers/page';
import Title from '@ui/components/title';
import UnderConstruction from '@ui/components/under-construction';

const PageAbout = extend({
    pageinfo: (state) =>
        htmlHead(state, {
            title: __('nav.about'),
        }),
    styles: require('./styles.less'),
})(
    memo(({ className }) => (
        <Page className={className}>
            <Title component="h2" children={__('nav.about')} />
            <UnderConstruction />
            <p>
                Based on{' '}
                <a
                    href="https://github.com/cmux/koot"
                    target="_blank"
                    rel="noreferrer"
                >
                    Koot.js
                </a>{' '}
                v{require('koot/package.json').version}
                <br />
                Fork on{' '}
                <a
                    href="https://github.com/TeamFleet/WhoCallsTheFleet-Yuubari"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
            </p>
        </Page>
    ))
);

// const PageAbout = ({ className }) => (
//     <Page
//         className={className}
//     >
//         <Title component="h2" children={__('nav.about')} />
//         <p><i>{__('under_construction')}...</i></p>
//         <p>
//             Based on <a href="https://github.com/cmux/koot" target="_blank">Koot.js</a> v{require('koot/package.json').version}
//             <br />
//             Fork on <a href="https://github.com/TeamFleet/WhoCallsTheFleet-Yuubari" target="_blank">GitHub</a>
//         </p>
//     </Page>
// )

export default PageAbout;
