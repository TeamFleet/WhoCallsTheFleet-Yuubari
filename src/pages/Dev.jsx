import React from 'react'

import {Title} from '../components/_.jsx'

export default class extends React.Component {
    render() {
        return (
            <div>
                <Title>Title / 标题 (H2)</Title>
                <Title tagName="h3">Title / 标题 (H3)</Title>
                <Title tagName="h4">Title / 标题 (H4)</Title>
                <Title tagName="h5">Title / 标题 (H5)</Title>
                <Title tagName="h6">Title / 标题 (H6)</Title>

                <hr />

                <p><strong>Paragraphes</strong></p>
                <p>Non ad minim non reprehenderit aliqua sint consequat dolor commodo occaecat. Sint ex eu duis aliquip. Veniam eiusmod minim consequat id irure anim consectetur proident. Veniam incididunt veniam ex dolor sit dolore in culpa commodo ea duis voluptate fugiat. Aliquip laborum nisi officia quis. Proident laborum culpa est exercitation laboris consectetur eiusmod adipisicing duis. Elit et do esse non magna.</p>
                <p>Ad consequat consequat enim et quis ullamco. Lorem irure elit ad Lorem nulla laborum. Qui excepteur sint eiusmod Lorem ut est labore sit magna eiusmod qui enim. Id irure velit non exercitation deserunt do sunt consequat velit nostrud sunt veniam. Ex incididunt excepteur sit cillum laboris tempor amet cupidatat eiusmod esse enim mollit duis anim. Aute incididunt quis consectetur deserunt. Tempor veniam tempor laboris qui magna adipisicing ipsum.</p>
                <p>Occaecat nisi quis culpa eiusmod culpa commodo amet. Laborum ut dolor mollit aute ut consectetur proident ut Lorem esse irure et sit do. Exercitation excepteur ut do laborum. Ut enim eiusmod mollit in cupidatat Lorem ea ad et duis dolore excepteur fugiat. Dolor voluptate incididunt tempor duis occaecat amet elit reprehenderit magna. Adipisicing Lorem excepteur ex cillum.</p>
                <p>Enim nisi minim occaecat Lorem consequat anim culpa. Id officia officia eu sunt laboris nisi consequat magna cillum voluptate ea in laboris. Minim nostrud amet cupidatat fugiat duis et in fugiat sint culpa non eu. Anim deserunt excepteur eu elit incididunt nostrud dolore elit laborum ullamco ut commodo amet. Reprehenderit elit voluptate eu elit laborum commodo cupidatat nisi duis do non exercitation magna. Duis proident sit fugiat qui tempor dolore eiusmod ad occaecat proident aliquip tempor fugiat. Laborum proident cupidatat proident eu do officia excepteur sint consectetur esse duis.</p>

                <hr />

                <p><a href="javascript:;">Link</a> | <span className="link">Link Style</span></p>

                <hr />

                <hr />
            </div>
        )
    }
}
