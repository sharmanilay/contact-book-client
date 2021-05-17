import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk'
import RateReviewIcon from '@material-ui/icons/RateReview'
import useAxios from '../../hooks/useAxios'
import Loader from '../Loader'

const useStyles = makeStyles((theme) => ({
	gridRoot: {
		flexGrow: 1
	},
	header: {
		padding: '10px 0',
		color: theme.palette.common.white
	},
	paper: {
		display: 'flex',
		padding: 10,
		marginBottom: 20,
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			alignItems: 'flex-start'
		}
	},
	avatar: {
		alignSelf: 'center',
		width: theme.spacing(7),
		height: theme.spacing(7),
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	userInfo: {
		flexGrow: 1,
		marginLeft: 10,
		alignSelf: 'center',
		flexWrap: 'wrap',
		[theme.breakpoints.down('sm')]: {
			alignSelf: 'flex-start'
		}
	},
	actions: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	actionItems: {
		display: 'flex',
		justifyContent: 'center'
	},
	details: {
		margin: '10px 0',
		alignSelf: 'center'
	},
	detailLink: {
		padding: '5px 10px',
		letterSpacing: 1,
		'&:hover': {
			textDecoration: 'none',
			backgroundColor: 'rgba(0, 0, 0, 0.04)'
		}
	},
	actionIcons: {
		margin: '0 10px'
	}
}))

const Home = () => {
	const classes = useStyles()
	const { isLoading, response, error } = useAxios('/get-contacts', {
		method: 'GET'
	})
	const { connections } = response

	const showContactsData = () => {
		if (isLoading) {
			return <Loader type='skeleton' qty={7} />
		} else if (error) {
			return <h1>Something went wrong...</h1>
		} else if (connections) {
			return (
				<>
					{connections.map((item) => (
						<Paper className={classes.paper} key={item.resourceName}>
							<Avatar
								className={classes.avatar}
								alt={item.name}
								src={item.picture}
							/>
							<div className={classes.userInfo}>
								<Typography>
									Name: <strong>{item.name}</strong>
								</Typography>
								<Typography>
									Email: <strong>{item.email}</strong>
								</Typography>
								{item.phone && (
									<Typography>
										Phone: <strong>{item.phone}</strong>
									</Typography>
								)}
							</div>
							<div className={classes.actions}>
								<div className={classes.details}>
									<Link
										className={classes.detailLink}
										component={RouterLink}
										to={`/details/${item.resourceName}`}
										color='secondary'
									>
										More Details
									</Link>
								</div>
								<div className={classes.actionItems}>
									<Tooltip
										interactive
										placement='bottom'
										title={<Typography>Add/Edit note</Typography>}
									>
										<Link
											component={RouterLink}
											color='inherit'
											className={classes.actionIcons}
											to={`/details/${item.resourceName}`}
										>
											<RateReviewIcon color='secondary' />
										</Link>
									</Tooltip>
									{item.phone && (
										<Tooltip
											interactive
											placement='bottom'
											title={<Typography>Make a call</Typography>}
										>
											<Link
												color='inherit'
												className={classes.actionIcons}
												href={`tel://${item.phone}`}
											>
												<PhoneInTalkIcon color='secondary' />
											</Link>
										</Tooltip>
									)}
									<Tooltip
										interactive
										placement='bottom'
										title={<Typography>Write an email</Typography>}
									>
										<Link
											color='inherit'
											className={classes.actionIcons}
											href={`mailto://${item.email}`}
										>
											<EmailRoundedIcon color='secondary' />
										</Link>
									</Tooltip>
								</div>
							</div>
						</Paper>
					))}
				</>
			)
		}
	}

	return (
		<Container className={classes.root} maxWidth='xl'>
			<Container maxWidth='lg'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h3' className={classes.header}>
							Contacts List
						</Typography>
					</Grid>
					<Grid item xs={12}>
						{showContactsData()}
					</Grid>
				</Grid>
			</Container>
		</Container>
	)
}

export default Home
