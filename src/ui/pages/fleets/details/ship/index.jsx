import { Component } from 'react';
// import classNames from 'classnames'
import { extend } from 'koot';

@extend({
    styles: require('./styles.less'),
})
class Ship extends Component {
    render() {
        return <div />;
    }
}

export default Ship;
