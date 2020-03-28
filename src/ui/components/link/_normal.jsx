import React from 'react';
import { Link } from 'react-router';
import { extend } from 'koot';

import routerReplace from '@utils/router-replace';

const renderName = (name, extra) => {
    if (typeof name === 'string') {
        return (
            <span className="name">
                {name}
                {typeof extra !== 'undefined' && (
                    <small className="name-extra">{extra}</small>
                )}
            </span>
        );
    }
    return React.cloneElement(name, {
        className: 'name',
    });
};

const LinkDefault = extend({
    styles: require('./_normal.less'),
})(
    ({
        pic,
        avatar,
        image,
        src,
        picture,
        img,
        name,
        title,
        text,
        nameExtra,
        alt,
        to: _to,
        href,
        link,
        replace = false,
        children,
        ...props
    }) => {
        const thisPic = pic || avatar || image || src || picture || img;
        const thisName = name || title || text || null;

        const Component = replace ? 'a' : Link;
        const to = _to || href || link;

        if (Component === 'a') {
            props.href = to;
            props.onClick = (evt) => {
                evt.preventDefault();
                routerReplace(to);
            };
        } else props.to = to;

        return (
            <Component {...props}>
                {thisPic && (
                    // <span
                    //     className="pic"
                    //     style={{
                    //         backgroundImage: `url(${thisPic})`,
                    //     }}
                    // />
                    <img
                        className="pic"
                        data-src={__CLIENT__ ? undefined : thisPic}
                        src={__CLIENT__ ? thisPic : undefined}
                        loading="lazy"
                        alt={alt}
                    />
                )}
                {thisName && renderName(thisName, nameExtra)}
                {children}
            </Component>
        );
    }
);

export default LinkDefault;
