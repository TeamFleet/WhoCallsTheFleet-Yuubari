import { PureComponent } from 'react';
import Cookies from 'js-cookie';
import { extend } from 'koot';

import availableLocales from '@src/locales';

const langName = {
    en: 'EN',
    ja: '日',
    zh: '简',
};

@extend({
    connect: (state) => ({
        localeId: state.localeId,
        location: state.routing && state.routing.locationBeforeTransitions,
    }),
    styles: require('./lang-switch.less'),
})
class LangSwitch extends PureComponent {
    currentUrl(thisLocaleId) {
        let search = '';
        const query = { ...this.props.location.query };

        delete thisLocaleId.hl;
        delete thisLocaleId.fb_locale;

        if (thisLocaleId) query.hl = thisLocaleId;

        for (const key in query) {
            if (!search) search = '?';
            else search += '&';
            search += `${key}=${query[key]}`;
        }

        return this.props.location.pathname + search;
    }

    onClickSPA(evt, newLocaleId) {
        if (__SPA__) {
            evt.preventDefault();
            Cookies.set('spLocaleId', newLocaleId, { expires: 365 });
            window.location.reload();
        }
    }
    onClickOption(evt) {
        this.onClickSPA(evt, evt.currentTarget.getAttribute('data-lang'));
    }
    onClickOption = this.onClickOption.bind(this);

    renderOption(thisLocaleId, index) {
        // const locales = require(`@appLocales/${thisLocaleId}.json`)
        return (
            <a
                href={this.currentUrl(thisLocaleId)}
                className={
                    'item' + (this.props.localeId === thisLocaleId ? ' on' : '')
                }
                data-lang={thisLocaleId}
                key={index}
                onClick={this.onClickOption}
            >
                {/* {locales.name.short} */}
                {langName[thisLocaleId] || thisLocaleId}
            </a>
        );
    }

    render() {
        return (
            <span className={this.props.className}>
                {availableLocales.map(this.renderOption.bind(this))}
            </span>
        );
    }
}
export default LangSwitch;
