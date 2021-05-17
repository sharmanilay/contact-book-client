import useAxios from '../../hooks/useAxios'
import Loader from '../Loader'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded'
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk'
import { useParams } from 'react-router-dom'
import Comments from './Comments'

const useStyles = makeStyles((theme) => ({
	gridRoot: {
		flexGrow: 1
	},
	header: {
		padding: '10px 0',
		color: theme.palette.common.white
	},
	profile: {
		display: 'flex',
		padding: 20
	},
	avatar: {
		alignSelf: 'center',
		width: theme.spacing(7),
		height: theme.spacing(7)
	},
	userInfo: {
		flexGrow: 1,
		marginLeft: 10,
		alignSelf: 'center'
	},
	actions: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-stretch'
	},
	actionItems: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	otherInfo: {
		padding: 20,
		borderBottom: `1px solid ${theme.palette.divider}`
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

const Details = () => {
	const classes = useStyles()
	const { id } = useParams()
	const { isLoading, response, error } = useAxios(
		`/get-contact-details?refName=${id}`,
		{
			method: 'GET'
		}
	)

	const showNames = (names) => {
		return (
			<div className={classes.otherInfo}>
				<Typography variant='h6'>Other Names</Typography>
				{names.map((name) => {
					return (
						<Typography key={name.unstructuredName}>
							{name.displayName}
						</Typography>
					)
				})}
			</div>
		)
	}
	const showEmailAddresses = (emailAddresses) => {
		return (
			<div className={classes.otherInfo}>
				<Typography variant='h6'>Other Emails</Typography>
				{emailAddresses.map((email) => {
					return <Typography key={email.value}>{email.value}</Typography>
				})}
			</div>
		)
	}
	const showOrganizations = (organizations) => {
		return (
			<div className={classes.otherInfo}>
				<Typography variant='h6'>Organizations</Typography>
				{organizations.map((org, i) => {
					return <Typography key={org.name}>{org.name}</Typography>
				})}
			</div>
		)
	}
	const showAddresses = (addresses) => {
		return (
			<div className={classes.otherInfo}>
				<Typography variant='h6'>Available addresses</Typography>
				{addresses.map((addresses, i) => {
					return (
						<Typography key={addresses.formattedValue}>
							{addresses.formattedValue}
						</Typography>
					)
				})}
			</div>
		)
	}
	const showPhoneNumbers = (phoneNumbers) => {
		return (
			<div className={classes.otherInfo}>
				<Typography variant='h6'>Other phone numbers</Typography>
				{phoneNumbers.map((phone) => {
					return <Typography key={phone.value}>{phone.value}</Typography>
				})}
			</div>
		)
	}

	const showContactsData = () => {
		if (isLoading) {
			return <Loader type='skeleton' qty={1} />
		} else if (error) {
			return <h1>Something went wrong...</h1>
		} else if (response && response.resourceName) {
			const {
				names,
				photos,
				emailAddresses,
				phoneNumbers,
				addresses,
				organizations
			} = response
			let email, name, picture, phone
			if (emailAddresses && emailAddresses.length) {
				email = emailAddresses[0].value
			}
			if (names && names.length) {
				name = names[0].displayName
			}
			if (photos && photos.length) {
				picture = photos[0].url
			}
			if (phoneNumbers && phoneNumbers.length) {
				phone = phoneNumbers[0].value
			}
			return (
				<Paper
					shadows={4}
					className={classes.paper}
					key={response.resourceName}
				>
					<Grid container>
						<Grid item xs={12} sm={10} md={6}>
							<div className={classes.profile}>
								<Avatar className={classes.avatar} alt={name} src={picture} />
								<div className={classes.userInfo}>
									<Typography>
										Name: <strong>{name}</strong>
									</Typography>
									<Typography>
										Email: <strong>{email}</strong>
									</Typography>
									{phone && (
										<Typography>
											Phone: <strong>{phone}</strong>
										</Typography>
									)}
								</div>
								<div className={classes.actions}>
									<div className={classes.actionItems}>
										{phone && (
											<Tooltip
												interactive
												placement='bottom'
												title={<Typography>Make a call</Typography>}
											>
												<Link
													color='inherit'
													className={classes.actionIcons}
													href={`tel://${phone}`}
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
												href={`mailto://${email}`}
											>
												<EmailRoundedIcon color='secondary' />
											</Link>
										</Tooltip>
									</div>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={10} md={6}>
							<Comments />
						</Grid>
						<Grid item xs={12}>
							{names && names.length > 1 && showNames(names.slice(1))}
							{emailAddresses &&
								emailAddresses.length > 1 &&
								showEmailAddresses(emailAddresses.slice(1))}
							{phoneNumbers &&
								phoneNumbers.length > 1 &&
								showPhoneNumbers(phoneNumbers.slice(1))}
							{organizations &&
								organizations.length > 0 &&
								showOrganizations(organizations)}
							{addresses && addresses.length > 0 && showAddresses(addresses)}
						</Grid>
					</Grid>
				</Paper>
			)
		}
	}

	return (
		<Container className={classes.root} maxWidth='xl'>
			<Container maxWidth='lg'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h3' className={classes.header}>
							Contacts Details
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

export default Details
