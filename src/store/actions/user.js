export const setAuthStatus = (isAuthenticated) => (dispatch) => {
	return dispatch({
		type: 'SET_AUTH_STATUS',
		payload: {
			isAuthenticated
		}
	})
}
