let store

export const set = obj => {
    // console.log(obj)
    if (typeof obj !== 'object' || typeof obj.dispatch !== 'function')
        return false
    store = obj
    // console.log(store)
    return store
}

export default () => store
