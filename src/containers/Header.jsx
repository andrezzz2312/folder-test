import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../context/AppContext'
import BrandIcon from '../assets/brand/icon.png'
import BrandLogo from '../assets/brand/logo.png'
import XIcon from '../assets/icons/x.svg'
import HamburguerIcon from '../assets/icons/hamburguer.svg'
import styles from '../styles/containers/Header.module.sass'

const Header = () => {
	const [showMenu, setShowMenu] = useState(false)
	const [showServices, setShowServices] = useState(false)

	const [isMobile, setIsMobile] = useState(false)
	const { language } = useContext(AppContext)

	function scrollHeader() {
		const header = document.getElementById('header')
		// When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
		if (this.scrollY >= 50) header.classList.add(styles.scrollH)
		else header.classList.remove(styles.scrollH)
	}

	window.addEventListener('scroll', scrollHeader)

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const toggleServices = () => {
		setShowServices(!showServices)
	}

	useEffect(() => {
		if (window.innerWidth > 768) {
			setIsMobile(false)
		} else {
			setIsMobile(true)
		}

		window.addEventListener('resize', () => {
			if (window.innerWidth > 768) {
				setIsMobile(false)
			} else {
				setIsMobile(true)
			}
		})
	}, [])

	useEffect(() => {
		setShowMenu(false)
		setShowServices(false)
	}, [])

	if (language === 'es')
		return (
			<header
				className={`${styles.Container_Fluid} container-fluid`}
				id='header'
			>
				<div className={`${styles.Container} container p-0`}>
					<div className={styles.Logo_Container}>
						<button
							className={styles.Button}
							onClick={toggleMenu}
							aria-label='Go to Home'
						>
							{isMobile ? (
								showMenu ? (
									<img src={XIcon} alt='Close Menu' />
								) : (
									<img src={HamburguerIcon} alt='Open Menu' />
								)
							) : (
								<></>
							)}
						</button>
						<Link to='/' className={styles.Link_Container}>
							<img
								src={BrandIcon}
								className={styles.Icon}
								alt='Wireframes Icon'
								width={37}
								height={29}
								quality={100}
							/>
							<img
								src={BrandLogo}
								className={styles.Logo}
								alt='Wireframes Logo'
								width={137}
								height={31}
								quality={100}
							/>
						</Link>
					</div>

					{isMobile ? (
						showMenu && (
							<nav className={styles.Nav}>
								<button
									className={styles.Service_Button}
									onMouseClick={toggleServices}
								>
									Servicios <FontAwesomeIcon icon={faChevronDown} />
									<div
										className={
											showServices
												? styles.Services_Links
												: styles.Services_Links_Hidde
										}
									>
										<Link
											to='/servicio/realidad-virtual'
											className={styles.Service_Link}
										>
											Realidad Virtual
										</Link>
										<Link
											to='/servicio/realidad-aumentada'
											className={styles.Service_Link}
										>
											Realidad Aumentada
										</Link>
										<Link
											to='/servicio/experiencias-3D'
											className={styles.Service_Link}
										>
											Experiencias 3D
										</Link>
										<Link
											to='/servicio/metaverso'
											className={styles.Service_Link}
										>
											Metaverso
										</Link>
									</div>
								</button>
								<Link to='/portafolio' className={styles.Link}>
									Portafolio
								</Link>
								<Link to='/nosotros' className={styles.Link}>
									Nosotros
								</Link>
								<Link to='/contacto' className={styles.Link}>
									Contacto
								</Link>
							</nav>
						)
					) : (
						<nav className={styles.Nav}>
							<button
								className={styles.Service_Button}
								onMouseEnter={toggleServices}
								onMouseLeave={toggleServices}
							>
								Servicios <FontAwesomeIcon icon={faChevronDown} />
								<div
									className={
										showServices
											? styles.Services_Links
											: styles.Services_Links_Hidde
									}
								>
									<Link
										to='/servicio/realidad-virtual'
										className={styles.Service_Link}
									>
										Realidad Virtual
									</Link>
									<Link
										to='/servicio/realidad-aumentada'
										className={styles.Service_Link}
									>
										Realidad Aumentada
									</Link>
									<Link
										to='/servicio/experiencias-3D'
										className={styles.Service_Link}
									>
										Experiencias 3D
									</Link>
									<Link
										to='/servicio/metaverso'
										className={styles.Service_Link}
									>
										Metaverso
									</Link>
								</div>
							</button>
							<Link to='/portafolio' className={styles.Link}>
								Portafolio
							</Link>
							<Link to='/nosotros' className={styles.Link}>
								Nosotros
							</Link>
							<Link to='/contacto' className={styles.Link}>
								Contacto
							</Link>
						</nav>
					)}
				</div>
			</header>
		)

	return (
		<header className={`${styles.Container_Fluid} container-fluid`}>
			<div className={`${styles.Container} container p-0`}>
				<div className={styles.Logo_Container}>
					<button
						className={styles.Button}
						onClick={toggleMenu}
						aria-label='Go to Home'
					>
						{isMobile ? (
							showMenu ? (
								<img src={XIcon} />
							) : (
								<img src={HamburguerIcon} />
							)
						) : (
							<></>
						)}
					</button>
					<Link to='/' className={styles.Link_Container}>
						<img
							src={BrandIcon}
							className={styles.Icon}
							alt='Wireframes Icon'
							width={37}
							height={29}
							quality={100}
						/>
						<img
							src={BrandLogo}
							className={styles.Logo}
							alt='Wireframes Logo'
							width={137}
							height={31}
							quality={100}
						/>
					</Link>
				</div>

				{isMobile ? (
					showMenu && (
						<nav className={styles.Nav}>
							<button
								className={styles.Service_Button}
								onClick={toggleServices}
							>
								Services <FontAwesomeIcon icon={faChevronDown} />
								<div
									className={
										showServices
											? styles.Services_Links
											: styles.Services_Links_Hidde
									}
								>
									<Link
										to='/servicio/realidad-virtual'
										className={styles.Service_Link}
									>
										Virtual Reality
									</Link>
									<Link
										to='/servicio/realidad-aumentada'
										className={styles.Service_Link}
									>
										Augmented Reality
									</Link>
									<Link
										to='/servicio/experiencias-3D'
										className={styles.Service_Link}
									>
										3D Web Experiences
									</Link>
									<Link
										to='/servicio/metaverso'
										className={styles.Service_Link}
									>
										Metaverse
									</Link>
								</div>
							</button>
							<Link to='/portafolio' className={styles.Link}>
								Portfolio
							</Link>
							<Link to='/nosotros' className={styles.Link}>
								About us
							</Link>
							<Link to='/contacto' className={styles.Link}>
								Contact
							</Link>
						</nav>
					)
				) : (
					<nav className={styles.Nav}>
						<button className={styles.Service_Button} onClick={toggleServices}>
							Services <FontAwesomeIcon icon={faChevronDown} />
							<div
								className={
									showServices
										? styles.Services_Links
										: styles.Services_Links_Hidde
								}
							>
								<Link
									to='/servicio/realidad-virtual'
									className={styles.Service_Link}
								>
									Virtual Reality
								</Link>
								<Link
									to='/servicio/realidad-aumentada'
									className={styles.Service_Link}
								>
									Augmented Reality
								</Link>
								<Link
									to='/servicio/experiencias-3D'
									className={styles.Service_Link}
								>
									3D Web Experiences
								</Link>
								<Link to='/servicio/metaverso' className={styles.Service_Link}>
									Metaverse
								</Link>
							</div>
						</button>
						<Link to='/portafolio' className={styles.Link}>
							Portfolio
						</Link>
						<Link to='/nosotros' className={styles.Link}>
							About us
						</Link>
						<Link to='/contacto' className={styles.Link}>
							Contact
						</Link>
					</nav>
				)}
			</div>
		</header>
	)
}

export default Header
