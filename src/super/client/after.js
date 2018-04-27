import { set as setStore } from '@utils/get-store'

export default ({
    store,
}) => {
    if (__DEV__) console.log('⚓ Client inited.')
    setStore(store)
}
