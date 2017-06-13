import React from 'react'
import { connect } from 'react-redux'

import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'
import DevHeader from 'UI/components/dev/header.jsx'

import Button from 'UI/components/button.jsx'
import ButtonGroup from 'UI/components/button-group.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './components.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            store,
            title: 'Dev (Components)'
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <PageContainer className={this.props.className}>
                <DevHeader />
                <SamplesButton />
                <SamplesButtonGroup />
            </PageContainer>
        )
    }
}


class SamplesButton extends React.Component {
    render() {
        return (
            <div>
                <h2>Button</h2>
                <p>
                    <Button>Sample Button</Button>
                    <Button href="/">With URI link</Button>
                    <Button to="/">With Router link</Button>
                    <Button tag="span">Custom tag name</Button>
                </p>
                <h4>Colors</h4>
                <p>
                    <Button>Default color</Button>
                    <Button color="primary">Primary</Button>
                    <Button color="success">Success</Button>
                    <Button color="warning">Warning</Button>
                    <Button color="danger">Danger</Button>
                </p>
                <h4>Sizes</h4>
                <p>
                    <Button>Default size</Button>
                    <Button size="large">Large</Button>
                    <Button size="small">Small</Button>
                    <Button size="tiny">Tiny</Button>
                </p>
                <h4>States</h4>
                <p>
                    <Button>Default state</Button>
                    <Button state="disabled">Disabled</Button>
                    <Button disabled={true}>Disabled another method</Button>
                    <Button state="active">Active</Button>
                </p>
            </div>
        )
    }
}


class SamplesButtonGroup extends React.Component {
    render() {
        return (
            <div>
                <h2>Button Group</h2>
                <p>
                    <ButtonGroup>
                        <Button>Sample Button</Button>
                        <Button href="/">With URI link</Button>
                        <Button to="/">With Router link</Button>
                        <Button tag="span">Custom tag name</Button>
                    </ButtonGroup>
                </p>
            </div>
        )
    }
}