import { extend } from 'koot';

import pkgDatabase from 'whocallsthefleet-database/package.json';
import pkgKckit from 'kckit/package.json';
import pkgKoot from 'koot/package.json';

import htmlHead from '@utils/html-head';

import Page from '@ui/containers/page';
import CenterContainer from '@ui/containers/center';
import Markdown from '@ui/components/markdown';
import Title from '@ui/components/title';

import styles, { wrapper as classNameModule } from './styles.less';

// const getMD = (localeId) => {
//     if (__CLIENT__ && !__DEV__) return __HOME_MARKDOWN__;
//     return __HOME_MARKDOWN__[localeId];
// };

const PageHome = extend({
    pageinfo: (state) => htmlHead(state),
    styles,
})(({ className }) => (
    <Page className={className}>
        <CenterContainer>
            <div className={classNameModule + '-title'}>
                <Title level="1" className="title">
                    {__('title')}
                </Title>
                <Title level="3" className="sub-title">
                    {__('description')}
                </Title>
            </div>
            <hr />
            <article className={classNameModule + '-article'}>
                <div className={classNameModule + '-block main'}>
                    <Title level="2">{__('homepage.update')}</Title>
                    <Markdown
                        className="content"
                        // source={__('home_page_markdown')}
                        source={`_${'under_construction'}_`}
                    />
                </div>
                <div className={classNameModule + '-block'}>
                    <Title level="3">{__('homepage.versions')}</Title>
                    <ul className="list">
                        {[
                            [
                                'Database',
                                'https://github.com/TeamFleet/WhoCallsTheFleet-DB',
                                pkgDatabase.version,
                            ],
                            [
                                'KCKit',
                                'https://github.com/TeamFleet/KCKit',
                                pkgKckit.version,
                            ],
                            [
                                'Koot.js',
                                'https://koot.js.org/',
                                pkgKoot.version,
                            ],
                        ].map(([name, url, version]) => (
                            <li key={name}>
                                <a
                                    className="color-alt"
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {name}
                                </a>
                                <span>{version}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
            <hr />
            <footer className={classNameModule + '-footer'}>
                <div className={classNameModule + '-block'}>
                    <Title level="3">{__('homepage.support')}</Title>
                </div>
                <div className={classNameModule + '-block'}>
                    <Title level="3">{__('homepage.contact')}</Title>
                </div>
                <div className={classNameModule + '-block'}>
                    <Title level="3">{__('homepage.donate')}</Title>
                </div>
            </footer>
        </CenterContainer>
    </Page>
));

export default PageHome;
