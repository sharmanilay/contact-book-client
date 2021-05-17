import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
const { breakpoints } = createMuiTheme({})
const theme = createMuiTheme({
	props: {
		MuiButtonBase: {
			disableRipple: true
		}
	},
	palette: {
		primary: {
			main: '#0F0320'
		},
		secondary: {
			main: '#FF5A46',
			hover: '#DF1800;'
		}
	},
	typography: {
		fontFamily: 'Nunito Sans, sans-serif'
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': ['Nunito Sans']
			}
		},
		MuiButton: {
			root: {
				borderRadius: 4,
				padding: '5px 30px'
			},
			containedSecondary: {
				color: 'white'
			}
		},

		MuiCard: {
			root: {
				width: 'fit-content',
				boxShadow: '0px 3px 6px #00000029;',
				padding: '20px 40px'
			}
		},
		MuiCardHeader: {
			title: {
				color: '#0A2E57',
				fontWeight: 600
			}
		},
		MuiTextField: {
			root: {
				background: 'transparent'
			}
		},
		MuiTable: {
			root: {
				border: '1px solid #EAEAEA',
				boxShadow: '0px'
			}
		},
		MuiTableCell: {
			root: {
				borderRight: '1px solid #EAEAEA'
			}
		},
		MuiTypography: {
			h4: {
				[breakpoints.down('xs')]: {
					fontSize: '2rem'
				}
			},
			h5: {
				[breakpoints.down('xs')]: {
					fontSize: '1.3rem'
				}
			},
			h6: {
				[breakpoints.down('xs')]: {
					fontSize: '1.1rem'
				}
			}
		}
	}
})

export const LeverageTheme = responsiveFontSizes(theme)
