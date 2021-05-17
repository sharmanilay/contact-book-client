import { combineReducers } from 'redux'
import userReducer from './user'

const mainReducer = combineReducers({
	user: userReducer
})

export default mainReducer
