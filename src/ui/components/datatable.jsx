import { Component, createRef } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

@extend({
    styles: require('./datatable.less'),
})
class DataTable extends Component {
    ContainerRef = createRef();
    // _scrollLeft

    componentDidUpdate(/*prevProps*/) {
        const Ref = this.props.forwardedRef || this.ContainerRef;
        // console.log(prevProps.scrollLeft, this.props.scrollLeft, this._table, this._table.scrollLeft)
        if (
            !Ref ||
            !Ref.current ||
            typeof this.props.scrollLeft === 'undefined' ||
            Ref.current.scrollLeft === this.props.scrollLeft
        )
            return;
        Ref.current.scrollLeft = this.props.scrollLeft;
    }

    renderHeader() {
        if (!this.props.headers) return null;
        const TagName = this.props.tag || 'thead';
        return (
            <TagName className="header">
                {this.renderRow(this.props.headers)}
            </TagName>
        );
    }

    renderBody() {
        if (!this.props.data) return null;
        const TagName = this.props.tag || 'tbody';
        return (
            <TagName className="body">
                {this.props.data.map((row, index) => {
                    if (typeof row === 'object' && row.cells)
                        return this.renderRow(
                            row.cells,
                            row.key || index,
                            row.props
                        );
                    return this.renderRow(row, index);
                })}
            </TagName>
        );
    }

    renderRow(data, index = 0, props = {}) {
        const Component = this.props.tag || 'tr';
        const { className, ...thisProps } = props;
        return (
            <Component
                className={classNames(['row', className])}
                key={index}
                {...thisProps}
            >
                {data.map((children, index2) =>
                    this.renderCell(children, index, index2)
                )}
            </Component>
        );
    }

    renderCell(data, indexRow, indexCell) {
        const Component = this.props.tag || 'td';

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

        return <Component key={indexRow + '-' + indexCell} {...props} />;
    }

    render() {
        // const {
        //     tag,
        //     className,
        //     headers,
        //     data,
        //     scrollLeft,
        //     children,
        //     ...props
        // } = this.props

        const TagName = this.props.tag || 'table';

        return (
            <TagName
                className={
                    this.props.className + (TagName !== 'table' ? ' flex' : '')
                }
                onScroll={this.props.onScroll}
                ref={this.props.forwardedRef || this.ContainerRef}
            >
                {this.renderHeader()}
                {this.renderBody()}
            </TagName>
        );
    }
}
export default DataTable;
