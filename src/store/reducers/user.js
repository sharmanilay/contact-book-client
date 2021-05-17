const initialState = {
	isAuthenticated: false,
	info: {}
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_AUTH_STATUS':
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated
			}
		case 'SET_USER_INFO':
			return {
				...state,
				info: action.payload.info
			}
		default:
			return state
	}
}
export default userReducer
