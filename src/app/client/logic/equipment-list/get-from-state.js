export default (state, ownProps) => {
    if (typeof ownProps === 'object' && typeof ownProps.id !== 'undefined')
        return state.equipmentList[ownProps.id]

    if (typeof ownProps === 'number')
        return state.equipmentList[ownProps]

    return state.equipmentList
}