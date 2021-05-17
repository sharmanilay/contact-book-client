import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthStatus } from 'src/store/actions/user'
import { AppContext } from 'src/context/AppContext'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import Close from '@material-ui/icons/Close'

const useStyles = makeStyles(() => ({
	wrapper: {
		width: '80%'
	},
	crossIcon: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: 20
	},
	sideNavWrapper: {
		top: 80,
		marginTop: 70
	},
	buttonWrapper: {
		padding: '15px 40px'
	}
}))

const SideNavbar = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const sideNavbarContext = useContext(AppContext)
	const { isSideNavbarOpen, setIsSideNavbarOpen } = sideNavbarContext

	const logoutUser = () => {
		localStorage.removeItem('default_auth_token')
		dispatch(setAuthStatus(false))
		setIsSideNavbarOpen(false)
	}

	return (
		<SwipeableDrawer
			anchor='left'
			classes={{
				paper: classes.wrapper
			}}
			open={isSideNavbarOpen}
			onClose={() => setIsSideNavbarOpen(false)}
			onOpen={() => setIsSideNavbarOpen(true)}
		>
			<div className={classes.crossIcon}>
				<Close onClick={() => setIsSideNavbarOpen(false)} />
			</div>
			<div className={classes.sideNavWrapper}>
				<div className={classes.buttonWrapper}>
					<Button
						onClick={logoutUser}
						variant='contained'
						color='secondary'
						disableElevation
					>
						Logout
					</Button>
				</div>
			</div>
		</SwipeableDrawer>
	)
}

export default SideNavbar
