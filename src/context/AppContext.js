import { createContext, useState } from 'react'

const initialContextValue = {
	isSideNavbarOpen: false,
	setIsSideNavbarOpen: (value) => undefined
}

const AppContext = createContext(initialContextValue)

const AppProvider = ({ children }) => {
	const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false)
	const value = {
		isSideNavbarOpen,
		setIsSideNavbarOpen
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }
