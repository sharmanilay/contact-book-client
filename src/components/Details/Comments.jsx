import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete'
import http from 'src/components/utils/http'

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: 20
	},
	commentWrapper: {
		marginBottom: 5
	},
	comment: {
		padding: 5,
		margin: '10px 0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	actionButton: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	deleteIcon: {
		cursor: 'pointer',
		'&:hover': {
			color: theme.palette.primary.main
		}
	},
	commentSubmit: {
		margin: 10
	}
}))

const Comments = () => {
	const classes = useStyles()
	const { id } = useParams()
	const [input, setInput] = useState('')
	const [editMode, setEditMode] = useState(false)
	const [updated, setUpdated] = useState(false)
	const [comments, setComments] = useState([])

	useEffect(() => {
		const getComments = async () => {
			try {
				const resp = await http.get(`/get-comments?comment_for_user=${id}`)
				setComments(resp.data)
				setUpdated(false)
				setInput('')
			} catch (err) {
				console.error(err)
			}
		}
		getComments()
	}, [id, updated])

	const handleInputChange = (evt) => {
		evt.preventDefault()
		setInput(evt.target.value)
	}

	const deleteComment = async (id) => {
		try {
			await http.post('/delete-comment', {
				id
			})
			setUpdated(true)
		} catch (err) {
			console.error(err)
		}
	}

	const updateComments = async () => {
		try {
			await http.post('/create-comment', {
				id,
				comment: input
			})
			setUpdated(true)
			setEditMode(false)
		} catch (err) {
			console.error(err)
		}
	}

	const showExistingComments = () => {
		if (comments.length === 0) {
			return <Typography>No comments to show</Typography>
		} else {
			return (
				<Grid item xs={12} lg={6} className={classes.commentWrapper}>
					{comments.map((item) => {
						return (
							<Paper key={item.id} className={classes.comment}>
								<Typography className={classes.commentText}>
									{item.text}
								</Typography>
								<DeleteIcon
									className={classes.deleteIcon}
									color='secondary'
									onClick={() => deleteComment(item.id)}
								/>
							</Paper>
						)
					})}
				</Grid>
			)
		}
	}

	return (
		<div className={classes.wrapper}>
			<Typography variant='h6'>Available Comments</Typography>
			{showExistingComments()}
			<div>
				{editMode ? (
					<div className={classes.inputForm}>
						<TextField
							value={input}
							onChange={handleInputChange}
							required
							fullWidth
							className={classes.input}
							placeholder='Add a comment'
							variant='outlined'
						/>
						<div className={classes.actionButton}>
							<Button
								variant='contained'
								color='secondary'
								className={classes.commentSubmit}
								onClick={() => setEditMode(false)}
							>
								cancel
							</Button>
							<Button
								variant='contained'
								color='secondary'
								className={classes.commentSubmit}
								onClick={updateComments}
							>
								submit
							</Button>
						</div>
					</div>
				) : (
					<div className={classes.actionButton}>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => setEditMode(true)}
						>
							add comments
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Comments
