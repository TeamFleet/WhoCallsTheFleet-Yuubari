import React from 'react'
import classNames from 'classnames'

import { ImportStyle } from 'sp-css-import'
import style from './flag-navy.less'

const navies = [
    "ijn", // 日本帝国海军
    "km", // 纳粹德国海军"
    "rm", // 意大利皇家海军"
    "mn", // 法国海军"
    "rn", // 英国皇家海军"
    "usn", // 美国海军"
    "vmf", // 苏联海军"
    "sm", // 瑞典海军"
]

@ImportStyle(style)
export default class extends React.Component {
    render() {
        const {
            tag,
            className,
            shadow,
            navy,
            ...props
        } = this.props
        const TagName = tag || 'span'
        return (
            <TagName className={classNames({
                [className]: true,
                'has-shadow': !!(shadow)
            })} data-navy={navies.indexOf(navy)} {...props} />
        )
    }
}
