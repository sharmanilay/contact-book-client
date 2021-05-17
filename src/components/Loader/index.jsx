import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Skeleton from '@material-ui/lab/Skeleton'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
	circularWrapper: {
		marginTop: 20,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& > * + *': {
			marginLeft: theme.spacing(2)
		}
	},
	skeletonWrapper: {
		padding: '20px 10px'
	},
	skeletonItem: {
		marginBottom: 30
	},
	paper: {
		padding: 10,
		marginBottom: 20
	}
}))

const Loader = ({ type, qty = 3 }) => {
	const classes = useStyles()

	const showLoaderByType = () => {
		if (type === 'skeleton') {
			return (
				<div className={classes.skeletonWrapper}>
					{[...Array(qty)].map((e, i) => {
						return (
							<Paper className={classes.paper} key={i}>
								<Skeleton height={30} width={210} animation='wave' />
								<Skeleton height={20} width={410} animation='wave' />
								<Skeleton
									height={20}
									className={classes.skeletonItem}
									animation='wave'
								/>
							</Paper>
						)
					})}
				</div>
			)
		} else {
			return (
				<div className={classes.circularWrapper}>
					<CircularProgress />
				</div>
			)
		}
	}

	return <div>{showLoaderByType()}</div>
}

export default Loader
