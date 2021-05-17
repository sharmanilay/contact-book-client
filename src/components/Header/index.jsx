import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import { AppContext } from 'src/context/AppContext'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthStatus } from 'src/store/actions/user'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	appBar: {
		display: 'flex',
		background: theme.palette.primary.main
	},
	toolbar: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between'
		}
	},
	rightNav: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	brand: {
		flexGrow: 1,
		[theme.breakpoints.down('xs')]: {
			padding: '20px 30px'
		}
	},
	media: {
		verticalAlign: 'middle',
		height: 40
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		padding: '5px 20px'
	},
	dropButton: {
		display: 'flex',
		alignItems: 'center',
		color: theme.palette.primary.main
	},
	mobileRightMenu: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	}
}))

const Navbar = () => {
	const classes = useStyles()
	const history = useHistory()
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	// const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const sideNavbarContext = useContext(AppContext)

	const handleOpenSidebar = () => {
		const { isSideNavbarOpen, setIsSideNavbarOpen } = sideNavbarContext
		setIsSideNavbarOpen(!isSideNavbarOpen)
	}

	const logoutUser = () => {
		localStorage.removeItem('default_auth_token')
		dispatch(setAuthStatus(false))
	}

	return (
		<div className={classes.root}>
			<AppBar className={classes.appBar} position='static'>
				<Toolbar className={classes.toolbar}>
					<div className={classes.brand}>
						<Typography variant='h5'>
							<Link to='/home'>
								<img
									className={classes.media}
									src='https://www.tryleverage.ai/assets/images/logo-name-light.svg'
									alt='Leverage'
								/>
							</Link>
						</Typography>
					</div>
					{user.isAuthenticated && (
						<div>
							<div className={classes.rightNav}>
								<Button
									onClick={logoutUser}
									variant='contained'
									color='secondary'
								>
									Logout
								</Button>
							</div>
							<div
								className={classes.mobileRightMenu}
								onClick={handleOpenSidebar}
							>
								<MenuIcon color='secondary' fontSize='large' />
							</div>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar
