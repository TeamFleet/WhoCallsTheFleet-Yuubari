import { extend } from 'koot';

import installPWA from '@utils/install-app';

import Icon from '@ui/components/icon';

const AppBar = extend({
    connect: (state) => ({
        pageTitle: state.pageTitle,
        eventInstallPWA: state.app.eventInstallPWA,
    }),
    styles: require('./appbar.less'),
})(({ className, pageTitle, eventInstallPWA, dispatch }) => (
    <div className={className}>
        {pageTitle.sub && <span className="sub">{pageTitle.sub}</span>}
        <span className="main">{pageTitle.main}</span>
        <span className="buttons">
            {(eventInstallPWA || __DEV__) && (
                <AppBarButton
                    icon="download5"
                    onClick={() => installPWA(eventInstallPWA, dispatch)}
                />
            )}
            {((typeof navigator !== 'undefined' && navigator.share) ||
                __DEV__) && (
                <AppBarButton
                    icon="share3"
                    onClick={() => {
                        const elMetaDescription = document.querySelector(
                            'meta[name="description"]'
                        );
                        navigator
                            .share({
                                title: document.title,
                                text: elMetaDescription
                                    ? elMetaDescription.getAttribute('content')
                                    : '',
                                url: window.location.href,
                            })
                            .then(() => console.log('Successful share'))
                            .catch((error) =>
                                console.log('Error sharing', error)
                            );
                    }}
                />
            )}
        </span>
    </div>
));
export default AppBar;

const AppBarButton = ({ onClick, ...props }) => {
    if (!__CLIENT__) return null;
    return (
        <span className="button" onClick={onClick}>
            <Icon className="icon" {...props} />
        </span>
    );
};
