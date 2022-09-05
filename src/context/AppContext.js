import { createContext, useState, useEffect } from 'react'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
	const [ language, setLanguage ] = useState('es')

	useEffect(() => {
		const systemLanguage = window.navigator.language.split('-')[0]

		if(systemLanguage === 'es') {
			setLanguage('es')
		} else {
			setLanguage('en')
		}
	}, [])

	return (
		<AppContext.Provider value={{ language, setLanguage }}>
			{ children }
		</AppContext.Provider>
	)
}

export default AppContextProvider