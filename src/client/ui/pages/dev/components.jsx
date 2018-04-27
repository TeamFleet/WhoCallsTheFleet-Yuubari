import React from 'react'
import { connect } from 'react-redux'

import { ImportStyle } from 'sp-css-import'

import htmlHead from '@appUtils/html-head'

import Page from '@appUI/containers/page'

import Title from '@appUI/components/title'
import DevHeader from '@appUI/components/dev/header'
import Button from '@appUI/components/button'
import ButtonGroup from '@appUI/components/button-group'
import InputCounter from '@appUI/components/input/counter'

@connect()
@ImportStyle(require('./components.less'))
export default class extends React.Component {
    static onServerRenderHtmlExtend({ htmlTool: ext, store }) {
        const head = htmlHead({
            store,
            title: 'Dev (Components)'
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <Page className={this.props.className}>
                <DevHeader />
                <SamplesButton />
                <SamplesButtonGroup />
                <SamplesInput />
                <SamplesLoaders />
                <SamplesList />
            </Page>
        )
    }
}

const Samples = ({ className, ...props }) => (
    <div
        className={
            ['dev-sample-container', className]
                .filter(c => !!c)
                .join(' ')
        }
        {...props}
    />
)

const SamplesButton = () => (
    <Samples>
        <Title component="h2">Button</Title>
        <p>
            <Button>Sample Button</Button>
            <Button href="/">With URI link</Button>
            <Button to="/">With Router link</Button>
            <Button tag="span">Custom tag name</Button>
        </p>
        <Title component="h4">Colors</Title>
        <p>
            <Button>Default color</Button>
            <Button color="primary">Primary</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="danger">Danger</Button>
        </p>
        <Title component="h4">Sizes</Title>
        <p>
            <Button>Default size</Button>
            <Button size="large">Large</Button>
            <Button size="small">Small</Button>
            <Button size="tiny">Tiny</Button>
        </p>
        <Title component="h4">States</Title>
        <p>
            <Button>Default state</Button>
            <Button state="disabled">Disabled</Button>
            <Button disabled={true}>Disabled another method</Button>
            <Button state="active">Active</Button>
        </p>
    </Samples>
)

const SamplesButtonGroup = () => (
    <Samples>
        <Title component="h2">Button Group</Title>
        <p>
            <ButtonGroup>
                <Button>Sample Button</Button>
                <Button href="/">With URI link</Button>
                <Button to="/">With Router link</Button>
                <Button tag="span">Custom tag name</Button>
            </ButtonGroup>
        </p>
    </Samples>
)

const SamplesInput = () => (
    <Samples>
        <Title component="h2">input / counter</Title>
        <p>
            <InputCounter />
            <InputCounter defaultValue="10" max="20" min="-5" />
        </p>
    </Samples>
)

import LoaderFairyOoyodo2 from '@appUI/components/loader/fairy-ooyodo-2'
const SamplesLoaders = () => (
    <Samples>
        <Title component="h2">loader / fairy-ooyodo-2</Title>
        <p>
            <LoaderFairyOoyodo2 />
        </p>
    </Samples>
)

import ListShips from '@appUI/components/list/ships'
const _listShips = [394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404,]
const SamplesList = () => (
    <Samples>
        <Title component="h2">list / ships</Title>
        <ListShips
            list={_listShips}
            empty="EMPTY"
        />
        <Title component="h4">unsort</Title>
        <ListShips
            list={_listShips}
            empty="EMPTY"
            sort={false}
        />
        <Title component="h4">without navy, with min-level</Title>
        <ListShips
            list={_listShips}
            empty="EMPTY"
            navy={false}
            min-level={true}
        />
        <Title component="h4">without type</Title>
        <ListShips
            list={_listShips}
            empty="EMPTY"
            type={false}
        />
        <Title component="h4">size: mini</Title>
        <ListShips
            list={_listShips}
            empty="EMPTY"
            size="mini"
        />
        <Title component="h4">size: mini, no grid</Title>
        <ListShips
            list={_listShips}
            empty="EMPTY"
            size="mini"
            grid={false}
        />
    </Samples>
)
