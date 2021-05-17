export const setAuthStatus = (isAuthenticated) => (dispatch) => {
	return dispatch({
		type: 'SET_AUTH_STATUS',
		payload: {
			isAuthenticated
		}
	})
}
export const setUserInfo = (info) => (dispatch) => {
	return dispatch({
		type: 'SET_USER_INFO',
		payload: {
			info
		}
	})
}
