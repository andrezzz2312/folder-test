import { useEffect, useRef, useContext } from 'react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'
import { AppContext } from '../context/AppContext'
import styles from '../styles/components/Form.module.sass'

const Form = () => {
	const { language } = useContext(AppContext)
	const form = useRef()
	const recaptcha = useRef()

	const sendEmail = async (e) => {
		e.preventDefault()

		try {
			const result = await emailjs.sendForm('service_o0xi85j', 'template_3is6jf4', form.current, 'w9iypXOq-1iYndKCd')
			console.log(result)
		} catch (error) {
			console.error(error)
		}

		window.location.reload()
	}

	useEffect(() => {
		setTimeout(() => {
			const recaptcha = document.querySelector('#g-recaptcha-response')

			if(recaptcha) {
				recaptcha.setAttribute('required', 'required')
			}
		}, 1000)
	}, [recaptcha])

	if (language === 'es') return (
		<form method="post" id="form" className={styles.Form} data-aos="fade-up" ref={form} onSubmit={(e) => sendEmail(e)}>
			<div className={styles.Input_Double}>
				<input
					className={styles.Input}
					type="text"
					name="first_name"
					placeholder='Nombre'
					maxLength={200}
					required/>
				<input
					className={styles.Input}
					type="text"
					name="last_name"
					placeholder='Apellido'
					maxLength={200}
					required/>
			</div>
			<div className={styles.Input_Double}>
				<input
					className={styles.Input}
					type="email"
					name="email"
					placeholder='Correo'
					maxLength={100}
					required
				/>
				<input
					className={styles.Input}
					type="tel"
					name="phone"
					placeholder='Teléfono*'/>
			</div>
			<div className={styles.Input_Double}>
				<input
					className={styles.Input}
					type="text"
					name="job"
					placeholder='Profesión/área de trabajo*'
					maxLength={100}
				/>
				<input
					className={styles.Input}
					type="text"
					name="city"
					placeholder='Ciudad/región*'
					maxLength={100}
				/>
			</div>
			<div className={styles.Input_Single}>
				<input
					className={styles.Input}
					type="text"
					name="subject"
					placeholder='¿Cómo podríamos ayudarte?'
					maxLength={200}
					required
				/>
			</div>
			<div className={styles.Input_Single}>
				<textarea
					className={styles.Textarea}
					type="text"
					name="message"
					placeholder='Escribe brevemente acerca de tu proyecto o idea'
					rows={4}
					maxLength={500}
					required
				>
				</textarea>
			</div>

			<div className={`${styles.Recaptcha} d-flex justify-content-center`}>
				<ReCAPTCHA
					ref={recaptcha}
					sitekey="6LeDEgMgAAAAAIOclB0p9hHV5Z35GP7IqkgKb1rO"
				/>
			</div>

			<button type="submit" className={styles.Button}>Enviar</button>
		</form>
	)

	return (
		<form method="post" id="form" className={styles.Form} data-aos="fade-up" ref={form} onSubmit={(e) => sendEmail(e)}>
			<div className={styles.Input_Double}>
				<input
					className={styles.Input}
					type="text"
					name="first_name"
					placeholder='Name'
					maxLength={200}
					required/>
				<input
					className={styles.Input}
					type="text"
					name="last_name"
					placeholder='Surname'
					maxLength={200}
					required/>
			</div>
			<div className={styles.Input_Double}>
				<input
					className={styles.Input}
					type="email"
					name="email"
					placeholder='Email'
					maxLength={100}
					required
				/>
				<input
					className={styles.Input}
					type="tel"
					name="phone"
					placeholder='Phone*'/>
			</div>
			<div className={styles.Input_Double}>
				<input
					className={styles.Input}
					type="text"
					name="job"
					placeholder='Profession/work  area*'
					maxLength={100}
				/>
				<input
					className={styles.Input}
					type="text"
					name="city"
					placeholder='City/región*'
					maxLength={100}
				/>
			</div>
			<div className={styles.Input_Single}>
				<input
					className={styles.Input}
					type="text"
					name="subject"
					placeholder='How can we help you?'
					maxLength={200}
					required
				/>
			</div>
			<div className={styles.Input_Single}>
				<textarea
					className={styles.Textarea}
					type="text"
					name="message"
					placeholder='Write briefly about your project or idea'
					rows={4}
					maxLength={500}
					required
				>
				</textarea>
			</div>

			<div className={`${styles.Recaptcha} d-flex justify-content-center`}>
				<ReCAPTCHA
					ref={recaptcha}
					sitekey="6LeDEgMgAAAAAIOclB0p9hHV5Z35GP7IqkgKb1rO"
					lang='en'
				/>
			</div>

			<button type="submit" className={styles.Button}>Send</button>
		</form>
	)
}

export default Form