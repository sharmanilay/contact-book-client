import { GoogleLogin } from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthStatus } from 'src/store/actions/user'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LoginBg from '../../assets/images/login-bg.png'
import http from 'src/components/utils/http'

const useStyles = makeStyles((theme) => ({
	root: {
		alignItems: 'center'
	},
	jumbotron: {
		margin: 'auto 10px',
		padding: '0 40px',
		color: theme.palette.common.white
	},
	jumbotronText: {
		marginBottom: 20
	},
	loginImage: {
		maxHeight: '700px',
		width: '100%'
	}
}))

const targets = ['Phone Book', 'Address Book', 'Mailing List']

const Login = () => {
	const classes = useStyles()
	const history = useHistory(useHistory)
	const dispatch = useDispatch()
	const [currentTarget, setCurrentTarget] = useState(0)

	useEffect(() => {
		const id = setInterval(() => {
			setCurrentTarget((prevValue) => {
				if (prevValue >= targets.length - 1) {
					return 0
				} else {
					return prevValue + 1
				}
			})
		}, 1000)
		return () => {
			clearInterval(id)
		}
	}, [])

	const handleLogin = async (data) => {
		try {
			const res = await http.post('/signin', {
				accessToken: data.accessToken,
				profile: data.profileObj
			})
			dispatch(setAuthStatus(Boolean(res.data.token)))
			localStorage.setItem('default_auth_token', res.data.token)
			history.push('/home')
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<Grid className={classes.root} container justify='flex-start'>
			<Grid item xs={12} sm={10} md={8} lg={6}>
				<div className={classes.jumbotron}>
					<img
						className={classes.loginImage}
						src={LoginBg}
						alt='login-background'
					/>
				</div>
			</Grid>
			<Grid item xs={12} sm={10} md={8} lg={6}>
				<div className={classes.jumbotron}>
					<div>
						<Typography variant='h2'>Welcome to Contact Book</Typography>
						<div>
							<Typography variant='h6' key={currentTarget} color='secondary'>
								{targets[currentTarget]}
							</Typography>
							<Typography className={classes.jumbotronText} variant='h6'>
								Everything in one app
							</Typography>
						</div>
					</div>
					<GoogleLogin
						clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
						buttonText='Get started'
						onSuccess={handleLogin}
						onFailure={handleLogin}
						scope={
							'email profile https://www.googleapis.com/auth/contacts.readonly'
						}
						cookiePolicy={'single_host_origin'}
					/>
				</div>
			</Grid>
		</Grid>
	)
}

export default Login
