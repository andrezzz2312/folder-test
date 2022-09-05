import { useContext } from 'react'
import { Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Company1 from '../assets/companies/company-1.png'
import Company2 from '../assets/companies/company-2.png'
import Company3 from '../assets/companies/company-3.png'
import Company4 from '../assets/companies/company-4.png'
import Company5 from '../assets/companies/company-5.png'
import { AppContext } from '../context/AppContext'
import styles from '../styles/components/Companies.module.sass'

const Companies = () => {
	const { language } = useContext(AppContext)

	const items = [
		{
			name: 'Legion Network',
			image: Company1,
		}, {
			name: 'Motive.io',
			image: Company2,
		}, {
			name: 'Quantified Design Solutions',
			image: Company3,
		}, {
			name: 'Tech Change',
			image: Company4,
		}, {
			name: 'Foresight Sports',
			image: Company5,
		},
	]

	if (language === 'es') return (
		<div className={styles.Container} data-aos="fade-up">
			<div className={styles.Title_Container}>
				<p className={styles.Title}>
          Empresas que<br/>han confiado<br/>en nosotros
				</p>
			</div>
			<Swiper
				className={styles.Images_Container}
				modules={[ Autoplay, Navigation ]}
				slidesPerView={1}
				spaceBetween={20}
				breakpoints={{
					425: {
						slidesPerView: 1,
						spaceBetween: 20
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 30
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 40
					},
					1200: {
						slidesPerView: 4,
						spaceBetween: 50
					}
				}}
				autoplay={{ delay: 4000, disableOnInteraction: false }}
				// navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
				loop
				speed={1500}
				grabCursor={true}
			>
				{items.map((item, index) => (
					<SwiperSlide key={`Company-${index}`} className={styles.Item}>
						<img
							className={styles.Image}
							src={item.image}
							alt={item.name}
							title={item.name}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)

	return (
		<div className={styles.Container} data-aos="fade-up">
			<div className={styles.Title_Container}>
				<p className={styles.Title}>
          Companies<br/>that believe<br/>on us
				</p>
			</div>
			<Swiper
				className={styles.Images_Container}
				modules={[ Autoplay, Navigation ]}
				slidesPerView={1}
				spaceBetween={20}
				breakpoints={{
					425: {
						slidesPerView: 1,
						spaceBetween: 20
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 30
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 40
					},
					1200: {
						slidesPerView: 4,
						spaceBetween: 50
					}
				}}
				autoplay={{ delay: 4000, disableOnInteraction: false }}
				// navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
				loop
				speed={1500}
				grabCursor={true}
			>
				{items.map((item, index) => (
					<SwiperSlide key={`Company-${index}`} className={styles.Item}>
						<img
							className={styles.Image}
							src={item.image}
							alt={item.name}
							title={item.name}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default Companies