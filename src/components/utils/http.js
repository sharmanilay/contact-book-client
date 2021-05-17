import axios from 'axios'

console.log(process.env.REACT_APP_API_BASE_URL)

const http = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL
})

http.interceptors.request.use(function (config) {
	const token = localStorage.getItem('default_auth_token')
	config.headers.Authorization = token ? `Bearer ${token}` : ''
	return config
})

export default http
