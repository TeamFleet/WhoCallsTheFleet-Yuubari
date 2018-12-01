const ora = require('ora')
const variables = require('./variables')

module.exports = (options = {}) => {
    const waiting = ora(
        Object.assign(
            {
                spinner: 'dots',
                color: 'cyan'
            },
            typeof options === 'string' ? {
                text: options
            } : options
        )
    ).start()
    waiting.finish = (options = {}) => {
        waiting.color = 'green'
        waiting.stopAndPersist(Object.assign({
            symbol: variables.symbols.complete
        }, options))
    }
    return waiting
}