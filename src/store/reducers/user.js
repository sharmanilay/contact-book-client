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
		default:
			return state
	}
}
export default userReducer
