import propTypes from 'prop-types'
import Header from '../containers/Header'
import Footer from '../containers/Footer'

const Layout = ({ children }) => {
	return (
		<>
			<Header />

			{children}

			<Footer />
		</>
	)
}

Layout.propTypes = {
	children: propTypes.node.isRequired,
}

export default Layout
