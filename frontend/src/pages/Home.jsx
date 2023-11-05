import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation';
import { BiDollar } from 'react-icons/bi'

import styles from './Home.module.css'

const Home = () => {
	const navigate = useNavigate()

	function handleSearch(e) {
		e.preventDefault()
		// setTimeout(() => {
		navigate('/visuals');
		//   }, 3000);
	}

	return (
		<div>
			<Navbar />

			<div className={styles.container}>

				<div className={styles.body}>

					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className={styles.tagline}>
							<span className={styles.invest}>Powering</span> all the ways you <span className={styles.invest}>invest.</span>
						</div>

						<div className={styles.subtitle}>
							<TypeAnimation
								sequence={[
									"Invest securely for the future.", 1
								]}
								speed={70}
								style={{ fontSize: '24px' }}
								cursor={false}
								className='text-heading' />
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<img src='/frontEnd.jpg' alt='finance graphic' className={styles.finGraphic} />
					</motion.div>
				</div>

				<div className={styles.entry}>
					
					<div>
						{/* <BiDollar className={styles.dollar}/> */}
						<input type='text' className={styles.input}
							placeholder="Current Risk/Capital ($)	" />
					</div>
					<input type='text' className={styles.input}
						placeholder="Years to Grow (1-20)" />


					<button className={styles.searchButton} onClick={handleSearch}>
						<span>Analyze</span>
					</button>
				</div>

			</div>
		</div>
	)
}

export default Home