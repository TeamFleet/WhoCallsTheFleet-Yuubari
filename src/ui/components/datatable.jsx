import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

const DataTable = extend({
    styles: require('./datatable.less'),
})((props) => {
    const CRef = useRef(null);
    const TrueRef = props.ref ?? props.forwardedRef ?? CRef;

    const C = props.tag || 'table';
    // console.log('DataTable', props.forwardedRef, ContainerRef);

    useEffect(() => {
        // console.log('DataTable didMount', TrueRef);
        // console.log('DataTable', this.props.forwardedRef, this.ContainerRef);
        // console.log(prevProps.scrollLeft, this.props.scrollLeft, this._table, this._table.scrollLeft)
        if (
            !TrueRef ||
            !TrueRef.current ||
            typeof props.scrollLeft === 'undefined' ||
            TrueRef.current.scrollLeft === props.scrollLeft
        )
            return;
        TrueRef.current.scrollLeft = props.scrollLeft;
    }, [TrueRef, props.scrollLeft]);

    return (
        <C
            className={props.className + (C !== 'table' ? ' flex' : '')}
            onScroll={props.onScroll}
            ref={TrueRef}
        >
            <Header tag={props.tag} headers={props.headers} />
            <Body tag={props.tag} data={props.data} />
        </C>
    );
});

export default DataTable;

// ============================================================================

const Header = ({ headers, tag }) => {
    if (!headers) return null;
    const C = tag || 'thead';
    return (
        <C className="header">
            <Rows data={headers} />
        </C>
    );
};

const Body = ({ data, tag }) => {
    if (!data) return null;
    const C = tag || 'tbody';
    return (
        <C className="body">
            {data.map((row, index) => {
                if (typeof row === 'object' && row.cells)
                    return (
                        <Rows
                            key={index}
                            tag={tag}
                            data={row.cells}
                            index={row.key || index}
                            {...row.props}
                        />
                    );
                return <Rows tag={tag} data={row} index={index} />;
                // return null;
            })}
        </C>
    );
};

const Rows = ({ tag, className, index, data, ...props }) => {
    const C = tag || 'tr';
    return (
        <C className={classNames(['row', className])} key={index} {...props}>
            {data.map((children, index2) => (
                <Cell
                    key={index2}
                    tag={tag}
                    data={children}
                    indexRow={index}
                    indexCell={index2}
                />
            ))}
        </C>
    );
};

const Cell = ({ tag, data, indexRow, indexCell }) => {
    const C = tag || 'td';

    let props = {};

    if (Array.isArray(data)) {
        props = data[1];
        props.children = data[0];
    } else if (typeof data === 'object') {
        props = data;
    } else {
        props.children = data;
    }

    if (props.className) props.className = 'cell ' + props.className;
    else props.className = 'cell';

    return <C key={indexRow + '-' + indexCell} {...props} />;
};
