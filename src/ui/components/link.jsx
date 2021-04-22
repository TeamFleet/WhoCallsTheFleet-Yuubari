import { memo } from 'react';
import { Link } from 'react-router';
import routerReplace from '@utils/router-replace';

export default memo(
    ({
        to: _to,
        href: _href,

        className,
        // children,

        replace = false,
        onClick,

        ...props
    }) => {
        const to = _to || _href || '';

        if (to.match(/^(https?:)?\/\//))
            return to.indexOf('://') < 0 ? (
                <a className={className} href={to} {...props} />
            ) : (
                <a
                    className={className}
                    href={to}
                    target="_blank"
                    rel="noreferrer"
                    {...props}
                />
            );

        function _onClick(evt) {
            routerReplace(to);
            evt.preventDefault();
            if (typeof onClick === 'function') return onClick(evt);
        }

        return (
            <Link
                className={className}
                to={to}
                onClick={replace ? _onClick : onClick}
                {...props}
            />
        );
    }
);
