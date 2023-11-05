import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation';
import { BiDollar } from 'react-icons/bi'
import { Card, List, ListItem, LineChart, Title } from "@tremor/react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useContext } from 'react'
import { MyContext } from '../App'

import styles from './Home.module.css'

const Home = () => {
	const navigate = useNavigate()

	const { investment, setInvestment } = useContext(MyContext)
	const { time, setTime } = useContext(MyContext)
	const { recurrence, setRecurrence } = useContext(MyContext)
	const { strat, setStrat } = useContext(MyContext)

	function handleSearch(e) {
		e.preventDefault()
		// setTimeout(() => {
		navigate('/visuals');
		//   }, 3000);
	}

	function changeInvest(value) {
		setInvestment(value)
	}

	function changeTime(value) {
		setTime(value)
	}

	function changeRec(value) {
		setRecurrence(value)
	}

	function changeStrat(value) {
		setStrat(value)
	}

	const invest = [
		{
			value: 100,
			label: '$100',
		},
		{
			value: 500,
			label: '$500',
		},
		{
			value: 1000,
			label: '$1000',
		},
		{
			value: 5000,
			label: '$5000',
		},
		{
			value: 10000,
			label: '$10000',
		},
		{
			value: 25000,
			label: '$25000',
		},
	];

	const timings = [
		{
			value: 0.5,
			label: '.5',
		},
		{
			value: 1,
			label: '1',
		},
		{
			value: 2,
			label: '2',
		},
		{
			value: 5,
			label: '5',
		},
		{
			value: 10,
			label: '10',
		},
		{
			value: 20,
			label: '20',
		},
	];

	const recurr = [
		{
			value: 20,
			label: '20',
		},
		{
			value: 50,
			label: '50',
		},
		{
			value: 100,
			label: '100',
		},
		{
			value: 500,
			label: '500',
		},
		{
			value: 1000,
			label: '1000',
		},
		{
			value: 10000,
			label: '10000',
		},
	];

	const strategy = [
		{
			value: 40,
			label: 'passive',
		},
		{
			value: 100,
			label: 'moderate',
		},
		{
			value: 160,
			label: 'aggressive',
		},
		
	];

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
						{/* <input type='text' className={styles.input}
							placeholder="Current Risk/Capital ($)	" /> */}
					</div>
					{/* <input type='text' className={styles.input}
						placeholder="Years to Grow (1-20)" /> */}

					<div className={styles.barContainer}>
						<div>
							<Grid>
								<Typography id="input-slider" gutterBottom>
									Initial Investment ($)
								</Typography>
								<Box sx={{ width: 400 }}>
									<Slider
										aria-label="Custom marks"
										defaultValue={1000}
										min={100}
										max={25000}
										step={null}
										valueLabelDisplay="auto"
										marks={invest}
										onChange={changeInvest}
									/>
								</Box>
							</Grid>
						</div>

						<div>
							<Grid>
								<Typography id="input-slider" gutterBottom>
									Time Horizon (years)
								</Typography>
								<Box sx={{ width: 400 }}>
									<Slider
										aria-label="Custom marks"
										defaultValue={1}
										min={0}
										max={20}
										step={null}
										valueLabelDisplay="auto"
										marks={timings}
										onChange={changeTime}
									/>
								</Box>
							</Grid>
						</div>
					</div>


					<div className={styles.barContainer}>
						<div>
							<Grid>
								<Typography id="input-slider" gutterBottom>
									Recurring payment ($)
								</Typography>
								<Box sx={{ width: 400 }}>
									<Slider
										aria-label="Custom marks"
										defaultValue={1000}
										min={0}
										max={10000}
										step={null}
										valueLabelDisplay="auto"
										marks={recurr}
										onChange={changeRec}
									/>
								</Box>
							</Grid>
						</div>

						<div>
							<Grid>
								<Typography id="input-slider" gutterBottom>
									Investment Strategy
								</Typography>
								<Box sx={{ width: 400 }}>
									<Slider
										aria-label="Custom marks"
										defaultValue={40}
										min={0}
										max={200}
										step={null}
										valueLabelDisplay="auto"
										marks={strategy}
										onChange={changeStrat}
									/>
								</Box>
							</Grid>
						</div>
					</div>

					<button className={styles.searchButton} onClick={handleSearch}>
						<span>Analyze</span>
					</button>
				</div>

			</div>
		</div>
	)
}

export default Home