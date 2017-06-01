import React from 'react'
import { Link } from 'react-router'

import db from 'Logic/database'
import getPic from 'Utils/get-pic.js'

import { ImportStyle } from 'sp-css-import'
import style from './link-ship.less'

const ext = __CLIENT__ && self._html && self._html.classList.contains('webp') ? 'webp' : 'png'

@ImportStyle(style)
export default class LinkShip extends React.Component {
    renderAvatar() {
        // return (
        //     <img className="avatar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAoCAQAAADTJTkTAAAATElEQVR42u3QMQEAAAgDoC2Z/VsZwscDItBMOKhAgQIFCkSgQIECEShQoEAEChQoEIECBQpEoECBAhEoUKBABAoUKBCBAgUKRKDAHxY6hwoBYQTrnwAAAABJRU5ErkJggg==" />
        // )
        // return (
        //     <span
        //         className="avatar"
        //         style={{
        //             backgroundImage: 'url(' + require(`Assets/dev/ship-avatar.${ext}`) + ')'
        //         }}
        //     />
        // )
        return (
            <span
                className="avatar"
                style={__CLIENT__ ? {
                    backgroundImage: `url(${getPic('ships', this.props.ship.id, '0-2')})`
                } : {}}
            />
        )
    }

    renderName() {
        return (
            <span className="name">
                {this.props.ship.getNameNoSuffix()}
                {this.props.ship.name.suffix && (<small className="name-suffix">{this.props.ship.getSuffix()}</small>)}
            </span>
        )
    }

    render() {
        if (typeof this.props.ship === 'string')
            this.props.ship = parseInt(this.props.ship)
        if (typeof this.props.ship === 'number')
            this.props.ship = db.ships[this.props.ship]

        return (
            <Link
                className={this.props.className}
                to={'/ships/' + this.props.ship.id}
                onClick={this.props.onClick}
            >
                {this.renderName()}
                {this.renderAvatar()}
                {this.props.children}
            </Link>
        )
    }
}