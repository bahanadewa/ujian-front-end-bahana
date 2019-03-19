import {combineReducers} from 'redux'
import User from './userGlobal'
import Cart from './addcartGlobal'

export default combineReducers({
    user : User,
    cart : Cart
})