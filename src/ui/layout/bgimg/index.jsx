import { PureComponent, Component, createRef, memo } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

import Cookies from 'js-cookie';

import {
    leave as leaveUIMode,
    animationEnd as actionAnimationEnd,
} from '@api/ui-mode';
import modeBackgroundOnAnimationEnd from '@api/ui-mode/mode-background.js';
import * as bgimgApi from '@api/bgimg/api.js';

import backgroundImages from '@const/background-images';

import getStyles from '@utils/background-styles.js';

import Background from '@ui/components/background.jsx';

const setCookieSessionBackgroundIndex = (index) => {
    Cookies.set('session_background_index', index);
};

/* Bgimg
 * main background image beneath App view
 * bgimg controls UI
 */
@extend({
    connect: (state) => ({
        show: __SERVER__ || state.app.type !== 'v0-iframe',
    }),
    styles: require('./styles.less'),
})
class Bgimg extends PureComponent {
    constructor(props) {
        super(props);

        // 确定初始背景图
        if (this.props.show) {
            const initialIndex =
                Cookies.get('session_background_index') ||
                'default-' +
                    Math.floor(Math.random() * backgroundImages.length);
            this.props.dispatch(bgimgApi.initList(initialIndex));
            setCookieSessionBackgroundIndex(initialIndex);
        }
        // if (__SERVER__) {
        //     this.props.dispatch(bgimgApi.initList('default-0'));
        // }

        this.onAnimationEnd = this.onAnimationEnd.bind(this);
    }

    onAnimationEnd(evt) {
        const action = modeBackgroundOnAnimationEnd(evt.nativeEvent);
        if (action) this.props.dispatch(action);
    }

    componentDidMount() {
        if (__DEV__) console.warn('Bgimg mounted');
        if (!this.props.show) {
            this.props.dispatch(actionAnimationEnd());
            this.props.dispatch(bgimgApi.mainImgLoaded());
        }
    }

    render() {
        if (!this.props.show) return null;

        return (
            <div
                id="bgimg"
                className={this.props.className}
                onAnimationEnd={this.onAnimationEnd}
            >
                <BackgroundMain />
                <BackgroundMainBlured type="nav" />
                <BackgroundMainBlured type="main" />
                <BackgroundPanels />
            </div>
        );
    }
}
export default Bgimg;

//

const BackgroundMainBlured = extend({
    styles: require('./styles-main-blured.less'),
})(
    memo(({ className, type }) => (
        <div className={classNames([className, type])}>
            <Background className="bg-container" type="blured" />
        </div>
    ))
);

/* main background image beneath App view. animation/transition process
 1. blured bgimg load
    original bgimg load
 2. blured bgimg enter on blured img loaded
    original bgimg enter on original img loaded
 4. after original bgimg transition end
   1. delete blured container element
   2. dispatch LOADED_MAIN_BGIMG
 */
@extend({
    connect: (state) => ({
        currentBg: state.bgimg.current,
        isMainLoaded: state.bgimg.isMainLoaded,
    }),
    styles: require('./styles-main.less'),
})
class BackgroundMain extends Component {
    state = {
        stylesOriginal: false,
        showOriginal: false,
    };

    OriginalRef = createRef();

    mounted = false;

    constructor() {
        super();

        [
            'originalTransitionEnd',
            'originalLoaded',
            'bluredTransitionEnd',
            'bluredLoaded',
        ].forEach((key) => {
            this[key] = this[key].bind(this);
        });
    }

    componentDidUpdate() {
        this.isOriginalLoaded = false;
        this.isOriginalTransitionEnd = false;
    }

    componentDidMount() {
        this.mounted = true;
        setTimeout(() => {
            if (__DEV__ && this.mounted && !this.props.isMainLoaded)
                this.props.dispatch(bgimgApi.mainImgLoaded());
        }, 200);
        if (!this.isBluredLoaded) {
            setTimeout(() => {
                if (this.mounted && !this.isBluredLoaded) {
                    this.bluredLoaded(undefined, true);
                }
            }, 2000);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    originalLoaded(evt) {
        // if (__DEV__)
        //     console.log('originalLoaded', this.isOriginalLoaded)
        if (this.isOriginalLoaded) return;
        // console.log('originalLoaded')
        this.isOriginalLoaded = true;
        this.props.currentBg.onLoaded(evt);
        this.setState({
            stylesOriginal: getStyles(this.props.currentBg),
        });
        setTimeout(() => {
            if (!this.isOriginalTransitionEnd)
                this.originalTransitionEnd(undefined, true);
        }, 2000);
    }

    originalTransitionEnd(evt, isForce) {
        if (isForce || evt.propertyName === 'opacity') {
            this.isOriginalTransitionEnd = true;
            this.props.dispatch(bgimgApi.mainImgLoaded());
        }
    }

    bluredLoaded(evt /*, isForce*/) {
        // if (__DEV__) console.log('[BgMain] bluredLoaded')
        this.isBluredLoaded = true;
        this.props.currentBg.onLoaded(evt);
        this.setState({
            stylesBlured: getStyles(this.props.currentBg, 'blured'),
        });
        setTimeout(() => {
            if (this.mounted && !this.state.showOriginal)
                this.bluredTransitionEnd(undefined, true);
        }, 2000);
    }

    bluredTransitionEnd(evt, isForce) {
        // if (__DEV__) console.log('[BgMain] bluredTransitionEnd')
        if (
            !this.state.showOriginal &&
            (isForce || evt.propertyName === 'opacity')
        ) {
            this.setState({
                showOriginal: true,
            });
            setTimeout(() => {
                if (!this.mounted) return;
                const event = new Event('load', { bubbles: true });
                if (this.OriginalRef && this.OriginalRef.current)
                    this.OriginalRef.current.dispatchEvent(event);
            }, 1000);
        }
    }

    render() {
        // if (__DEV__) console.log('[BgMain] state.showOriginal', this.state.showOriginal)
        return (
            <div className={this.props.className}>
                {this.state.showOriginal && (
                    <div
                        className={
                            'item item-original' +
                            (this.state.stylesOriginal ? ' is-loaded' : '')
                        }
                        style={this.state.stylesOriginal || {}}
                        onTransitionEnd={this.originalTransitionEnd}
                    >
                        <img
                            alt="background"
                            src={this.props.currentBg.getPath()}
                            onLoad={this.originalLoaded}
                            onError={this.originalLoaded}
                            ref={this.OriginalRef}
                        />
                    </div>
                )}

                <div
                    className={
                        'item item-blured' +
                        (this.state.stylesBlured ? ' is-loaded' : '')
                    }
                    style={this.state.stylesBlured || {}}
                    onTransitionEnd={this.bluredTransitionEnd}
                >
                    <img
                        alt="blurred background"
                        src={this.props.currentBg.getPath('blured')}
                        onLoad={this.bluredLoaded}
                        onError={this.bluredLoaded}
                    />
                </div>
            </div>
        );
    }
}
/* only original
class BgMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            styles: false
        }
    }

    onLoad() {
        this.setState({
            styles: getStyles(this.props.currentBg, 'blured')
        })
    }

    onTransitionEnd(evt) {
        // console.log('originalTransitionEnd', evt.target)
        // console.log('showBlured', this.state.showBlured)
        if (evt.propertyName == 'opacity') {
            this.props.dispatch(bgimgApi.mainImgLoaded())
        }
    }

    render() {
        return (
            <div className="background-main">
                <div
                    className={"item" + (this.state.styles ? ' is-loaded' : '')}
                    style={this.state.styles || {}}
                    onTransitionEnd={this.onTransitionEnd.bind(this)}
                >
                    <img src={this.props.currentBg.getPath('blured')} onLoad={this.onLoad.bind(this)} />
                </div>
            </div>
        )
    }
}
*/
/* rev:1
class BgMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylesOriginal: false,
            stylesBlured: false,
            showOriginal: false,
            showBlured: true
        }
    }

    originalLoaded() {
        // console.log('originalLoaded')
        this.setState({
            stylesOriginal: getStyles(this.props.currentBg)
        })
    }

    originalAnimationEnd(evt) {
        // console.log('originalAnimationEnd')
        if (evt.nativeEvent.animationName == 'background-original-leave') {
            setTimeout(() => {
                document.body.classList.remove('mode-bg-leaving')
                document.body.classList.remove('mode-bg')
            }, evt.nativeEvent.elapsedTime * 1000 * 2)
        }
    }

    originalTransitionEnd(evt) {
        // console.log('originalTransitionEnd', evt.target)
        // console.log('showBlured', this.state.showBlured)
        if (evt.propertyName == 'opacity' && this.state.showBlured) {
            this.props.dispatch(bgimgApi.mainImgLoaded())
            this.setState({
                showBlured: false
            })
        }
    }

    bluredLoaded(evt) {
        // console.log('bluredLoaded')
        this.setState({
            stylesBlured: getStyles(this.props.currentBg, 'blured')
        })
        evt.target.parentNode.removeChild(evt.target)
    }

    bluredTransitionEnd(evt) {
        if (evt.propertyName == 'opacity' && !this.state.showOriginal) {
            this.setState({
                showOriginal: true
            })
        }
    }

    // bluredTransitionEnd(evt) {
    // console.log('bluredTransitionEnd', evt.target)
    // if (evt.propertyName == 'opacity' && !evt.target.style.opacity) {
    //     evt.target.parentNode.removeChild(evt.target)
    // }
    // }

    render() {
        return (
            <div className="background-main">
                {this.state.showOriginal &&
                    <div
                        className={"item" + (this.state.stylesOriginal ? ' is-loaded' : '')}
                        style={this.state.stylesOriginal || {}}
                        onAnimationEnd={this.originalAnimationEnd.bind(this)}
                        onTransitionEnd={this.originalTransitionEnd.bind(this)}
                    >
                        <img src={this.props.bgImg} onLoad={this.originalLoaded.bind(this)} />
                    </div>
                }

                {this.state.showBlured &&
                    <div
                        className={"item is-blured" + (this.state.stylesBlured ? ' is-loaded' : '')}
                        style={this.state.stylesBlured || {}}
                        onTransitionEnd={this.bluredTransitionEnd.bind(this)}
                    >
                        <img src={this.props.bgImgBlured} onLoad={this.bluredLoaded.bind(this)} />
                    </div>
                }
            </div>
        )
    }
}
*/

//

const BackgroundPanels = extend({
    connect: [
        (state) => ({
            isModeBackground: state.uiMode.mode === 'background',
        }),
        (dispatch) => ({
            leaveAppModeBackground: () => dispatch(leaveUIMode()),
        }),
    ],
    styles: require('./styles-panels.less'),
})(
    memo(({ className, isModeBackground, leaveAppModeBackground }) => {
        if (!isModeBackground) return null;
        return (
            <div className={className}>
                <button
                    type="button"
                    className="back"
                    onClick={leaveAppModeBackground}
                >
                    [PH] BACK
                </button>
                <BackgroundPanelsImg className="panel" />
                <BackgroundPanelsList className="panel" />
            </div>
        );
    })
);

//

const BackgroundPanelsImg = extend({
    connect: (state) => ({
        currentBgPath:
            __CLIENT__ && state.bgimg.current && state.bgimg.current.getPath(),
    }),
    styles: require('./styles-panels-img.less'),
})(({ className, currentBgPath }) => (
    <div
        className={className}
        style={{
            backgroundImage: `url(${currentBgPath})`,
        }}
    />
));

//

@extend({
    connect: (state) => ({
        list: state.bgimg.list,
        index: state.bgimg.current && state.bgimg.current.index,
    }),
    styles: require('./styles-panels-list.less'),
})
class BackgroundPanelsList extends Component {
    change(obj) {
        setCookieSessionBackgroundIndex(obj.index);
        this.props.dispatch(bgimgApi.change(obj));
    }

    renderList(type) {
        return (
            <div className={`list-${type}`}>
                {this.props.list[type].map((obj, index) => (
                    <BackgroundPanelsListItem
                        bgimg={obj}
                        index={index}
                        key={index}
                    />
                ))}
            </div>
        );
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.renderList('custom')}
                {this.renderList('default')}
            </div>
        );
        // return <div></div>
    }
}

@extend({
    connect: true,
})
class BackgroundPanelsListItem extends PureComponent {
    constructor() {
        super();
        this.change = this.change.bind(this);
    }
    change() {
        setCookieSessionBackgroundIndex(this.props.bgimg.index);
        this.props.dispatch(bgimgApi.change(this.props.bgimg));
    }
    render() {
        return (
            <div
                className={`background-thumbnail${
                    this.props.bgimg.index === this.props.index ? ' on' : ''
                }`}
                onClick={this.change}
            >
                <span
                    className="ratio"
                    style={{
                        backgroundImage: `url(${this.props.bgimg.getPath(
                            'thumbnail'
                        )})`,
                    }}
                />
            </div>
        );
    }
}
