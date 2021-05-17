import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import HeadsetRoundedIcon from '@material-ui/icons/HeadsetRounded'
import FreeBreakfastRoundedIcon from '@material-ui/icons/FreeBreakfastRounded'

const useStyles = makeStyles((theme) => ({
	appBar: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		background: theme.palette.primary.main
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'center'
	},
	footerIcon: {
		verticalAlign: 'middle',
		fontSize: 20
	}
}))

const Footer = () => {
	const classes = useStyles()
	return (
		<AppBar className={classes.appBar} position='static'>
			<Toolbar className={classes.toolbar}>
				<Typography>
					Made with{' '}
					<FreeBreakfastRoundedIcon
						className={classes.footerIcon}
						color='secondary'
					/>{' '}
					and{' '}
					<HeadsetRoundedIcon
						className={classes.footerIcon}
						color='secondary'
					/>{' '}
					by Nilay Sharma
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Footer
