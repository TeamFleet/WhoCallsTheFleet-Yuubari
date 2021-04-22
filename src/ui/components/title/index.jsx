import { memo } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

const Title = extend({
    styles: require('./styles.less'),
})(
    memo(
        ({
            className,
            classNameInner,
            component,
            tag,
            tagname,
            element,
            level,
            children,
            title,
            type,
            inherit,
            ...props
        }) => {
            // console.log(this.props)

            const Component =
                component ||
                tag ||
                tagname ||
                element ||
                (typeof level === 'undefined' ? undefined : `h${level}`) ||
                'div';

            const arrClassName = className.split(' ');
            const classNameSelf = arrClassName[0];
            // const classNameComponent = classNames.length
            //     ? [classNameSelf + '-child'].concat(classNames.slice(1)).join(' ')
            //     : undefined

            props.children = children;

            const theChild = Array.isArray(children) ? children[0] : children;
            if (typeof title === 'string') {
                props['data-text'] = title;
            } else if (typeof theChild === 'string') {
                props['data-text'] = theChild;
            } else if (
                typeof theChild === 'object' &&
                typeof theChild.props === 'object' &&
                typeof theChild.props.value === 'string'
            ) {
                props['data-text'] = theChild.props.value;
            }

            if (inherit) {
                props['data-title-is-inherit'] = '';
            }

            switch (type) {
                case 'line-append': {
                    return (
                        <div
                            className={className}
                            data-title-type={type}
                            data-title-tag={Component}
                        >
                            <Component
                                className={classNames([
                                    classNameSelf + '-child',
                                    classNameInner,
                                ])}
                                {...props}
                            />
                        </div>
                    );
                }
                default: {
                    return (
                        <Component
                            data-title-type={type}
                            className={className}
                            {...props}
                        />
                    );
                }
            }
        }
    )
);

export default Title;
