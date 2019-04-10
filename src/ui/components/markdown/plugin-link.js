import React from 'react'
import visit from 'unist-util-visit'

const regex = {
    Ship: /[({]ship:([0-9]+):*([a-z]*)[)}]/i
}

export default (tree) => {
    console.log(tree)
    visit(tree, 'text', (node, index, parent) => {
        if (parent.type === 'link') return

        Object.keys(regex).forEach(type => {
            const match = regex[type].exec(node.value)
            if (!Array.isArray(match) || !match.length) return
            const [input, shipId, nodeType] = match
            const { index: matchIndex } = match
            console.log({
                matchIndex,
                input, shipId, nodeType,
                node, index
            })
            const textBefore = node.value.substr(0, matchIndex)
            const textAfter = node.value.substr(matchIndex + input.length)
            node.value = node.value.substr(0, matchIndex)
                + `[ship#${shipId}](/ships/${shipId})`
                + node.value.substr(matchIndex + input.length)
            console.log(node.value)
        })
        //     if (parent.type !== 'link' && /dvc [a-z-.]+/.test(node.value)) {
        //         parent.children[index] = {
        //             type: 'link',
        //             url: 'https://dvc.org/doc/commands-reference/' + node.value.split(' ')[1],
        //             children: [node],
        //             position: node.position
        //         };
        //     }
    })
    return tree
}
