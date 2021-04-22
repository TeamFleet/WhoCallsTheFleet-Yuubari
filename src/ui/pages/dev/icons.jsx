import { Component } from 'react';
import { extend } from 'koot';

import htmlHead from '@utils/html-head';

import Page from '@ui/containers/page';

import MainHeader from '@ui/components/main-header';
import Icon from '@ui/components/icon';
import Title from '@ui/components/title';

@extend({
    pageinfo: (state) =>
        htmlHead(state, {
            title: 'Dev (Icons)',
        }),
    styles: require('./icons.less'),
})
class PageDevIcons extends Component {
    getIcons() {
        if (__SERVER__) return [];

        const parser = new DOMParser();
        const doc = parser.parseFromString(__SVG_SYMBOLS__, 'image/svg+xml');
        const icons = [];

        for (const symbol of doc.querySelectorAll('symbol[id]')) {
            icons.push(symbol.getAttribute('id').replace(/^icon-/, ''));
        }

        return icons;
    }

    render() {
        this.getIcons();
        return (
            <Page className={this.props.className}>
                <MainHeader>
                    <div
                        className="header"
                        style={{ height: '100px', paddingTop: '20px' }}
                    >
                        <Title component="h1">Icons</Title>
                    </div>
                </MainHeader>
                <div className="icon-sample-group">
                    {this.getIcons().map((icon, index) => (
                        <IconSample icon={icon} key={index} />
                    ))}
                </div>
            </Page>
        );
    }
}

export default PageDevIcons;

class IconSample extends Component {
    render() {
        return (
            <label className="icon-sample">
                <input
                    type="text"
                    value={this.props.icon}
                    readOnly
                    onFocus={(evt) => {
                        evt.target.select();
                    }}
                />
                <Icon icon={this.props.icon} className="icon" />
            </label>
        );
    }
}
