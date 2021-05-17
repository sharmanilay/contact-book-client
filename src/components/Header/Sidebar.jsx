import React from 'react'
import { AppContext } from 'src/context/AppContext'
import { useContext } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { useDispatch } from 'react-redux'
import { setAuthStatus } from 'src/store/actions/user'

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
	sideNavItem: {
		fontSize: 20,
		borderBottom: '1px solid #eaeaea',
		padding: '15px 40px'
	},
	buttonWrapper: {
		padding: '15px 40px'
	}
}))
const SideNavbar = () => {
	const sideNavbarContext = useContext(AppContext)
	const { isSideNavbarOpen, setIsSideNavbarOpen } = sideNavbarContext
	const classes = useStyles()
	const dispatch = useDispatch()

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
