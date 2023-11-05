import { createContext, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css'

import Home from './pages/Home'
import Visuals from './pages/Visuals'

export const MyContext = createContext()
const App = () => {
 	const [ investment, setInvestment ] = useState(100)
	const [ time, setTime ] = useState(0.5)
 	const [ recurrence, setRecurrence] = useState(50)
 	const [ strat, setStrat ] = useState(40)

	return (
		<div>
			<MyContext.Provider value={{ investment, setInvestment, time, setTime, 
				recurrence, setRecurrence, strat, setStrat }}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Visuals' element={<Visuals />} />
				</Routes>
			</MyContext.Provider>
		</div>
	)
}

export default App