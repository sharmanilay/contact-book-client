import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import useAxios from 'src/hooks/useAxios'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import Loader from '../Loader'
import { useEffect } from 'react'
import http from 'src/components/utils/http'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
	root: {
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
	},
	wrapper: {}
}))

const Comments = () => {
	const classes = useStyles()
	const { id } = useParams()
	const [input, setInput] = useState('')
	const [editMode, setEditMode] = useState(false)
	const [updated, setUpdated] = useState(false)
	const [comments, setComments] = useState([])
	// const { isLoading, response, error } = useAxios(
	// 	`/get-comments?comment_for_user=${id}`,
	// 	{
	// 		method: 'GET'
	// 	}
	// )

	useEffect(() => {
		const getComments = async () => {
			const resp = await http.get(`/get-comments?comment_for_user=${id}`)
			setComments(resp.data)
			setUpdated(false)
			setInput('')
		}
		getComments()
	}, [id, updated])

	const deleteComment = async (id) => {
		await http.post('/delete-comment', {
			id
		})
		setUpdated(true)
	}

	const updateComments = async () => {
		await http.post('/create-comment', {
			id,
			comment: input
		})
		setUpdated(true)
		setEditMode(false)
	}

	const handleInputChange = (evt) => {
		evt.preventDefault()
		setInput(evt.target.value)
	}

	const showExistingComments = () => {
		if (comments.length === 0) {
			return <Typography>No comments to show</Typography>
		} else {
			return (
				<Grid item xs={12} md={8} lg={6} className={classes.commentWrapper}>
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
		<div className={classes.root}>
			<Typography variant='h6'>Available Comments</Typography>
			<div className={classes.wrapper}>{showExistingComments()}</div>
			{/* <Button onClick={getComments}>get comments</Button> */}
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
