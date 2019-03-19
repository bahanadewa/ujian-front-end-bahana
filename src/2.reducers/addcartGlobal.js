const INITIAL_STATE = {cart : [], iconcart : 0} 

export default (state =INITIAL_STATE, action) => {
    if (action.type === 'CART_SAVE'){
        return {...INITIAL_STATE, cart : action.payload}
    } else if (action.type ==='ICON_CART' ){
        return {...INITIAL_STATE, iconcart : action.payload}
    }else {
        return state
    }
}