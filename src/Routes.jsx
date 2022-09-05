import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'swiper/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import AppContextProvider from './context/AppContext.js'
import Layout from './layout/Layout.jsx'
import Home from './pages/Home.jsx'
import './styles/globals.sass'

const App = () => {
	config.autoAddCss = false

	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: 'ease-out',
			once: true,
		})
	}, [])

	return (
		<AppContextProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</AppContextProvider>
	)
}

export default App
