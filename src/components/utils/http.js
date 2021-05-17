import axios from 'axios'

const http = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL
})

http.interceptors.request.use(function (config) {
	const token = localStorage.getItem('default_auth_token')
	config.headers.Authorization = token ? `Bearer ${token}` : ''
	config.headers[
		'Access-Control-Allow-Origin'
	] = `${process.env.REACT_APP_ORIGIN_URL}`
	return config
})

export default http
