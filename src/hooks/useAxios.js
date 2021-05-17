/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthStatus } from '../store/actions/user'
import http from 'src/components/utils/http'

const useAxios = (url, options) => {
	const [response, setResponse] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		let mounted = true
		const getData = async () => {
			setIsLoading(true)
			try {
				const res = await http.request(url, options)
				if (mounted) {
					setResponse(res.data)
				}
			} catch (error) {
				if (error.response && error.response.status === 401) {
					localStorage.removeItem('default_auth_token')
					dispatch(setAuthStatus(false))
					history.push('/login')
				}
				if (mounted) {
					setError(error)
				}
			} finally {
				if (mounted) {
					setIsLoading(false)
				}
			}
		}
		getData()
		return () => {
			mounted = false
		}
	}, [url])

	return { response, error, isLoading }
}

export default useAxios
