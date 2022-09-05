import { gsap } from 'gsap'
import { useContext, useEffect, useRef, useState } from 'react'
import Helmet from 'react-helmet'
import { Link, useLocation } from 'react-router-dom'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import DetailWhite from '../assets/details/bottom-detail.svg'
import PlayIcon from '../assets/images/visor-button-icon.png'
import texture from '../assets/texture/grid2.png'
import { AppContext } from '../context/AppContext'
// asd
import styles from '../styles/pages/Home.module.sass'
// import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import moon from '../assets/glb/moonLR.glb'

const Home = () => {
	const [title, setTitle] = useState(0)
	const titleRef = useRef(null)
	const { pathname } = useLocation()
	const { language } = useContext(AppContext)

	// let target = { targetX: 0, targetY: 0 }
	// let mouse = { mouseX: 0, mouseY: 0 }
	// const windowHalfX = window.innerWidth / 2
	// const windowHalfY = window.innerHeight / 2

	useEffect(() => {
		const canvas = document.createElement('canvas')
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas,
			alpha: true,
		})
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setClearColor(0x000000, 0)
		renderer.toneMapping = THREE.ReinhardToneMapping

		renderer.setScissorTest(true)

		const panel = new GUI({ width: 310 })

		const folder1 = panel.addFolder('moon exposure')

		const params = {
			exposure: 1,
			bloomStrength: 1.5,
			bloomThreshold: 0,
			bloomRadius: 0,
		}

		const sceneElements = []
		function addScene(elem, fn) {
			const ctx = document.createElement('canvas').getContext('2d')
			elem.appendChild(ctx.canvas)
			sceneElements.push({ elem, ctx, fn })
		}
		const box = document.querySelector('#box')
		const background = document.querySelector('#background')

		function makeScene(elem) {
			const scene = new THREE.Scene()
			const fov = 75
			const aspect = box.clientWidth / box.clientHeight
			const near = 1
			const far = 100

			const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
			// camera.position.set(0, 0, 2)
			camera.position.set(-5, 2.5, -3.5)
			camera.lookAt(0, 0, 0)
			scene.add(camera)

			const controls = new OrbitControls(camera, elem)
			controls.enableZoom = false

			{
				const color = 0xffffff
				const intensity = 1
				const light = new THREE.DirectionalLight(color, intensity)
				light.position.set(-1, 2, 4)
				scene.add(light)
			}

			return {
				scene,
				camera,
				controls,
				// target, mouse
			}
		}

		const DISPLACEMENT_PATH =
			'https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/displacement.png'

		const textureLoader = new THREE.TextureLoader()
		const gridtexture = textureLoader.load(texture)
		const terraintexture = textureLoader.load(DISPLACEMENT_PATH)

		const sceneInitFunctionsByName = {
			box: (elem) => {
				const {
					scene,
					camera,
					controls,
					// target, mouse
				} = makeScene(elem)

				var moonObj
				const gltfloader = new GLTFLoader()
				gltfloader.load(moon, (gltf) => {
					moonObj = gltf.scene
					scene.add(moonObj)
				})

				// var ambient = new THREE.AmbientLight(0xffffff, 0.5)
				// scene.add(ambient)
				// const pointLight = new THREE.PointLight(0xffffff, 1)
				// camera.add(pointLight)
				scene.add(new THREE.AmbientLight(0x404040))
				const pointLight = new THREE.PointLight(0xffffff, 1)
				camera.add(pointLight)

				renderer.toneMapping = THREE.ReinhardToneMapping
				renderer.setClearColor(0x000000, 0)
				// effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
				const unrealBloom = new UnrealBloomPass(
					new THREE.Vector2(box.innerWidth, box.innerHeight),
					1.5,
					0.4,
					0.85
				)
				unrealBloom.threshold = params.bloomThreshold
				unrealBloom.strength = params.bloomStrength
				unrealBloom.radius = params.bloomRadius

				/**
				 * Add the render path to the composer
				 * This pass will take care of rendering the final scene
				 */
				const renderPass = new RenderPass(scene, camera)
				const effectComposer = new EffectComposer(renderer)
				effectComposer.setSize(box.clientWidth, box.clientHeight)
				effectComposer.addPass(renderPass)
				effectComposer.addPass(unrealBloom)

				folder1
					.add(params, 'exposure', -5.0, 5.0)

					.onChange(function (value) {
						renderer.toneMappingExposure = Math.pow(value, 4.0)
					})
				folder1
					.add(params, 'bloomStrength', -5.0, 5.0)

					.onChange(function (value) {
						unrealBloom.strength = Number(value)
					})
				folder1
					.add(params, 'bloomThreshold', -5.0, 5.0)

					.onChange(function (value) {
						unrealBloom.threshold = Number(value)
					})
				folder1
					.add(params, 'bloomRadius', -5.0, 5.0)

					.onChange(function (value) {
						unrealBloom.radius = Number(value)
					})
				return (time, rect) => {
					if (moonObj) {
						moonObj.rotation.y = time * 0.1
						moonObj.rotation.x = time * 0.1
						// moonObj.rotation.y += 0.05 * (target.targetX - moonObj.rotation.y)
						// moonObj.rotation.x += 0.05 * (target.targetY - moonObj.rotation.x)
					}
					// scene.background = new THREE.Color(0xf2f2f2)

					camera.aspect = rect.width / rect.height
					camera.updateProjectionMatrix()

					// target.targetX = mouse.mouseX * 0.001
					// target.targetY = mouse.mouseY * 0.001
					controls.update()
					// renderer.render(scene, camera)
					// renderer.autoClear = false
					// renderer.clear()
					effectComposer.render()
					// renderer.clearDepth()
					// renderer.render(scene, camera)
				}
			},
			background: (elem) => {
				const { scene, controls } = makeScene(elem)
				var camera = new THREE.PerspectiveCamera(
					75,
					background.clientWidth / background.clientHeight,
					0.01,
					20
				)

				camera.position.set(0, 0.06, 1.1)

				var geometry = new THREE.PlaneBufferGeometry(1, 3, 24, 24)
				var material = new THREE.MeshStandardMaterial({
					map: gridtexture,
					displacementMap: terraintexture,
					displacementScale: 0.3,
					metalness: 0.95,
					roughness: 0.5,
				})

				// const controls = new OrbitControls(camera, background)

				controls.enableDamping = true

				// scene.background = new THREE.Color('black')
				var plano = new THREE.Mesh(geometry, material)
				plano.rotation.x = -Math.PI * 0.5
				plano.position.set(0, 0, 0.15)

				var plano2 = new THREE.Mesh(geometry, material)
				plano2.rotation.x = -Math.PI * 0.5
				plano2.position.set(0, 0, -1.85)

				scene.add(plano, plano2)

				const fog = new THREE.Fog('#25719a', 0.5, 3.5)
				scene.fog = fog
				//luces ambientales
				var ambient = new THREE.AmbientLight(0xffffff, 10)
				//var directional = new THREE.DirectionalLight(0xffffff, 0.9)
				scene.add(ambient)
				const spotlight = new THREE.SpotLight(
					'#ffffff',
					50,
					3,
					Math.PI * 0.1,
					0.25
				)
				spotlight.position.set(0, 1, 2)
				// Target the spotlight to a specific point to the left of the scene
				spotlight.target.position.x = 0
				spotlight.target.position.y = 0
				spotlight.target.position.z = 0
				spotlight.position.set(0.5, 0.75, 2.2)
				// Target the spotlight to a specific point to the left of the scene
				spotlight.target.position.x = -0.25
				spotlight.target.position.y = 0.25
				spotlight.target.position.z = 0.25
				scene.add(spotlight)
				scene.add(spotlight.target)
				const spotlight2 = new THREE.SpotLight(
					'#ffffff',
					50,
					3,
					Math.PI * 0.1,
					0.25
				)

				spotlight2.position.set(-0.5, 0.75, 2.2)
				// Target the spotlight to a specific point to the right side of the scene
				spotlight2.target.position.x = 0.25
				spotlight2.target.position.y = 0.25
				spotlight2.target.position.z = 0.25
				scene.add(spotlight2)
				scene.add(spotlight2.target)

				// Post Processing
				// Add the effectComposer
				const effectComposer = new EffectComposer(renderer)
				effectComposer.setSize(background.clientWidth, background.clientHeight)

				/**
				 * Add the render path to the composer
				 * This pass will take care of rendering the final scene
				 */
				const renderPass = new RenderPass(scene, camera)
				effectComposer.addPass(renderPass)
				// effectComposer.addPass(unrealBloom)
				// const rgbShiftPass = new ShaderPass(RGBShiftShader)
				// rgbShiftPass.uniforms['amount'].value = 0.0015

				// effectComposer.addPass(rgbShiftPass)

				// const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
				// effectComposer.addPass(gammaCorrectionPass)
				const clock = new THREE.Clock()

				return () => {
					const elapsedTime = clock.getElapsedTime()
					camera.updateProjectionMatrix()

					controls.update()
					// renderer.render(scene, camera)
					effectComposer.render(scene, camera)

					// renderer.render(scene, camera)

					plano.position.z = (elapsedTime * 0.15) % 2

					plano2.position.z = ((elapsedTime * 0.15) % 2) - 2
				}
			},
		}

		document.querySelectorAll('[data-diagram]').forEach((elem) => {
			const sceneName = elem.dataset.diagram
			const sceneInitFunction = sceneInitFunctionsByName[sceneName]
			const sceneRenderFunction = sceneInitFunction(elem)
			addScene(elem, sceneRenderFunction)
		})

		function render(time) {
			time *= 0.001

			for (const { elem, fn, ctx } of sceneElements) {
				// get the viewport relative position of this element
				const rect = elem.getBoundingClientRect()
				const { left, right, top, bottom, width, height } = rect
				const rendererCanvas = renderer.domElement

				const isOffscreen =
					bottom < 0 ||
					top > window.innerHeight ||
					right < 0 ||
					left > window.innerWidth

				if (!isOffscreen) {
					// make sure the renderer's canvas is big enough
					if (rendererCanvas.width < width || rendererCanvas.height < height) {
						renderer.setSize(width, height, false)
					}

					// make sure the canvas for this area is the same size as the area
					if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
						ctx.canvas.width = width
						ctx.canvas.height = height
					}

					renderer.setScissor(0, 0, width, height)
					renderer.setViewport(0, 0, width, height)

					fn(time, rect)

					// copy the rendered scene to this element's canvas
					ctx.globalCompositeOperation = 'copy'
					ctx.drawImage(
						rendererCanvas,
						0,
						rendererCanvas.height - height,
						width,
						height, // src rect
						0,
						0,
						width,
						height
					) // dst rect
				}
			}

			requestAnimationFrame(render)
		}

		requestAnimationFrame(render)
	}, [])

	// function onDocumentMouseMove(event) {
	// 	mouse.mouseX = event.clientX - windowHalfX
	// 	mouse.mouseY = event.clientY - windowHalfY
	// }
	// document.addEventListener('mousemove', onDocumentMouseMove)

	const titles = [
		'Metaverso',
		'Realidad Virtual',
		'Realidad Aumentada',
		'Experiencias Web',
	]

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	useEffect(() => {
		if (titleRef.current) {
			gsap.fromTo(
				titleRef.current,
				{ x: 0, opacity: 1 },
				{
					x: -400,
					opacity: 0,
					duration: 2,
					delay: 2,
					onComplete() {
						if (title === 3) {
							setTitle(0)
							gsap.fromTo(
								titleRef.current,
								{ x: 200, opacity: 0 },
								{ x: 0, opacity: 1, duration: 1 }
							)
						} else {
							setTitle(title + 1)

							gsap.fromTo(
								titleRef.current,
								{ x: 200, opacity: 0 },
								{ x: 0, opacity: 1, duration: 1 }
							)
						}
					},
				}
			)
		}
	}, [titleRef, title])

	if (language === 'es')
		return (
			<main>
				<Helmet>
					<title>Wireframe Reality</title>
				</Helmet>

				{/* Hero */}

				<section className={`${styles.Hero_Container_Fluid} container-fluid`}>
					<div className={`${styles.Hero} container p-0`}>
						<div className={styles.Hero_Banner}>
							<div className={styles.Hero_Title_Container}>
								<h1 className={styles.Hero_Title} data-aos='fade-up'>
									Servicios de <br />
									<div className={styles.Hero_Title_Variable} ref={titleRef}>
										{titles[title]}
									</div>
								</h1>
								<h3
									className={styles.Hero_Caption}
									data-aos='fade-up'
									data-aos-delay='250'
								>
									Un nuevo mundo de{' '}
									<span className={styles.Hero_Caption_Highlight}>
										soluciones digitales
									</span>
								</h3>
								<div data-aos='fade-up' data-aos-delay='500'>
									<Link
										to='/contacto'
										className={`${styles.Hero_Link} transition-all`}
									>
										Contáctanos
									</Link>
								</div>
							</div>
							{/* <img
							src={Planet}
							className={styles.Hero_Image}
							alt="Wireframes Planet"
							data-aos="zoom-in"
						/> */}
							{/* <canvas id='c' className={styles.c}> */}
							<div className={styles.threed}>
								<span
									id='box'
									data-diagram='box'
									className={` ${styles.box}`}
								></span>
							</div>

							{/* </canvas> */}
						</div>
					</div>

					<div className='container'>
						<div className={`${styles.Visor_Container} row`}>
							<div
								className={`${styles.Visor} col-12 col-lg-6`}
								data-aos='fade-up'
							>
								<span className={styles.Visor_Text}>
									¡Conoce{' '}
									<span className={styles.Visor_Text_Highlight}>
										nuestro trabajo!
									</span>
								</span>
								<Link to='/portafolio' className={styles.Visor_Button}>
									<img
										src={PlayIcon}
										className={styles.Visor_Button_Icon}
										alt='Wireframes Visor'
									/>
								</Link>
							</div>
							<div className={`${styles.Visor_Data} col-12 col-lg-6 py-2`}>
								<div
									className={styles.Visor_Data_Item}
									data-aos='fade-up'
									data-aos-delay='150'
								>
									<h4 className={styles.Visor_Data_Title}>Tecnología</h4>
									<p className={styles.Visor_Data_Text}>
										Soluciones innovadoras con tecnología WebXR
									</p>
								</div>
								<div
									className={styles.Visor_Data_Item}
									data-aos='fade-up'
									data-aos-delay='300'
								>
									<h4 className={styles.Visor_Data_Title}>Posicionamiento</h4>
									<p className={styles.Visor_Data_Text}>
										Proveemos nuevas experiencias para que sus productos o
										servicios tengan mejor visibilidad en el mercado.
									</p>
								</div>
								<div
									className={styles.Visor_Data_Item}
									data-aos='fade-up'
									data-aos-delay='450'
								>
									<h4 className={styles.Visor_Data_Title}>
										Sociedad Internacional
									</h4>
									<p className={styles.Visor_Data_Text}>
										Trabajamos junto a empresas de Estados Unidos, Canadá,
										Dubái, U.K. entre otros.
									</p>
								</div>
								<div
									className={styles.Visor_Data_Item}
									data-aos='fade-up'
									data-aos-delay='600'
								>
									<h4 className={styles.Visor_Data_Title}>Versatilidad</h4>
									<p className={styles.Visor_Data_Text}>
										Empleamos la realidad virtual en beneficio de la medicina,
										educación, arquitectura, etc.
									</p>
								</div>
							</div>
						</div>
					</div>

					<img
						src={DetailWhite}
						className={styles.Hero_Bottom_Detail}
						alt='White Detail'
					/>
				</section>
			</main>
		)
}

export default Home
