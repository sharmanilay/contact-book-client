import { ThemeProvider } from '@material-ui/core/styles'
import { LeverageTheme } from 'src/theme'
import { AppProvider } from 'src/context/AppContext'
import Header from 'src/components/Header'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom'
import PrivateRoute from 'src/components/utils/PrivateRoute'
import SideNavbar from 'src/components/Header/Sidebar'
import Home from 'src/components/Home'
import Footer from 'src/components/Footer'
import Login from 'src/components/Login'
import Details from 'src/components/Details'

const App = () => {
	return (
		<ThemeProvider theme={LeverageTheme}>
			<AppProvider>
				<div className='App'>
					<Router>
						<Header />
						<SideNavbar />
						<Switch>
							<Route exact path='/login' component={Login} />
							<PrivateRoute exact path='/home' component={Home} />
							<PrivateRoute
								exact
								path='/details/people/:id'
								component={Details}
							/>
							<Redirect from='*' to='/home' />
						</Switch>
						<Footer />
					</Router>
				</div>
			</AppProvider>
		</ThemeProvider>
	)
}

export default App
