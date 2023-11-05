import Navbar from '../components/Navbar'
import CoolAccordion from '../components/CoolAccordion'
import { Card, List, ListItem, LineChart, Title } from "@tremor/react";
import { useCallback, useEffect, useState } from 'react'
import styles from './Visuals.module.css'
import StockData from '../components/StockData'
import OptionTab from '../components/OptionTab'
import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useContext } from 'react'
import { MyContext } from '../App'
// import TradingViewWidget from '../components/TradingViewWidget';
import { motion } from 'framer-motion'
import daddy from 'papaparse';
import TradingViewWidget from 'react-tradingview-widget';

const Visuals = () => {
    const [currStock, setStock] = useState('')
    // const [value, setValue] = React.useState(null);

    const { investment, setInvestment } = useContext(MyContext)
    const { time, setTime } = useContext(MyContext)
    const { recurrence, setRecurrence } = useContext(MyContext)
    const { strat, setStrat } = useContext(MyContext)

    const [csvContent, setCsvContent] = useState([])

    const handleStock = (name) => {
        console.log(currStock)
        const regExp = /\(([^)]+)\)/;
        const named = regExp.exec(name)[1];
        setStock(named)
    }

    const changeInvest = (event, newValue) => {
        setInvestment(newValue);
    };
    const changeTime = (event, newValue) => {
        setTime(newValue);
    };
    const changeRec = (event, newValue) => {
        setRecurrence(newValue);
    };
    const changeStrat = (event, newValue) => {
        setStrat(newValue);
    };

    function test() {
        console.log(investment)
        console.log(time)
        console.log(recurrence)
        console.log(strat)

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

    const investmentData = [
        {
            date: '2023',
            "Amount": 1010
        },
        {
            date: '2024',
            "Amount": 1217
        },
        {
            date: '2025',
            "Amount": 1358
        },
        {
            date: '2026',
            "Amount": 1623
        },
        {
            date: '2027',
            "Amount": 1890
        },
        {
            date: '2028',
            "Amount": 1970
        },
    ]

    const REITs = [
        {
            name: "Roots",
            rating: "95%",
        },
        {
            name: "Simon Property Group",
            rating: "89%",
        },
        {
            name: "Vanguard",
            rating: "98%",
        },
    ];

    useEffect(() => {
        const filePath = '/investment_data_full.csv'

        // var stratTemp = 'Passive'
        // if (strat === 40) {
        //     stratTemp = 'Passive'
        // } else if (strat === 100) {
        //     stratTemp = 'Moderate'
        // } else {
        //     stratTemp = 'Aggressive'
        // }

        // test()

        daddy.parse(filePath, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                // Find the row that matches A, B, C, and D values
                const matchingRows = result.data.filter((row) => {
                    return (
                        row["Initial Investment"] == investment &&
                        row["Time Horizon"] == time &&
                        row['Monthly Recurring'] == recurrence
                        // row['Investment Strategy'] == stratTemp
                    );
                });

                let newContent = [];
                if (matchingRows) {
                    // Create the stockContent object based on the matching row
                    newContent = matchingRows.map((row) => {
                        return {
                            name: row["Stock Recommendation"],
                            revenue: row.Revenue, // Replace with the actual CSV column name
                            growth: row["YoY Growth"], // Replace with the actual CSV column name
                            profit: row["Gross Profits"], // Replace with the actual CSV column name
                            recommendation: 'Buy', // Set your recommendation here
                        };
                    });

                    const regExpp = /\(([^)]+)\)/;
                    setCsvContent(newContent);
                    setStock(regExpp.exec(newContent[1].name)[1])
                } else {
                    // Handle the case where no matching row is found
                    console.log('No matching row found');
                }
            },
        });

        // setCsvContent(newContent);
    }, []);

    return (
        <div>
            <Navbar />
            <div className={styles.largeContainer}>
                <div className={styles.topOnes}>
                    {/* header */}
                    <div className={styles.header} >
                        Your Top Investments
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.stockInfo}>
                            <div className={styles.optionTabs}>
                                {csvContent.map((stock, index) => (
                                    <OptionTab key={index} name={stock.name} onClick={() => handleStock(stock.name)} />
                                ))}
                            </div>

                            <div className={styles.stockDetails}>
                                {csvContent.map((stock, i) => {
                                    const regExp = /\(([^)]+)\)/;
                                    const named = regExp.exec(stock.name)[1];

                                    if (named === currStock) {
                                        return <StockData key={i} name={stock.name} revenue={stock.revenue} growth={stock.growth}
                                            profit={stock.profit} recommendation={stock.recommendation} />
                                    }
                                })}
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* projection-related info */}
                <div className={styles.projection}>
                    <div className={styles.header}>
                        Your Projection
                    </div>
                    <div className={styles.roots}>
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
                            <button className={styles.searchButton}>
                                <span>Analyze</span>
                            </button>

                        </div>

                        <div className={styles.graph}>
                            <Card>
                                <Title>Performance</Title>
                                <LineChart
                                    className="h-72 mt-4"
                                    data={investmentData}
                                    index="date"
                                    categories={["Amount"]}
                                    colors={["orange"]}
                                    yAxisWidth={30}
                                    // onValueChange={(v) => setValue(v)}
                                    connectNulls={true}
                                // width={700}
                                />
                            </Card>
                            {/* <pre>{JSON.stringify(value)}</pre> */}
                        </div>
                    </div>

                </div>



                {/* metric definitions */}
                <div className={styles.metricContainer}>
                    <div className={styles.header}>About the Metrics</div>
                    <div className={styles.metrics}>
                        <div><CoolAccordion title="MFI" content='Volume-weighted, relative strength indicator. Indicates whether it is overbought/oversold and gives insight into stock&apos; true "strength".' /></div>
                        <div><CoolAccordion title='MACD' content='Indicator of momentum. Compares two exponential weightages of the price and determines the overall rate of change.' /></div>
                        <div><CoolAccordion title='Bollinger Bands' content='Compares current price to "normal" price using standard deviations. Consists of a middle band, typically a simple moving average, and two outer bands that are standard deviations away from the middle band.' /></div>
                    </div>
                </div>

                {/* real estate */}
                <div>
                    <div className={styles.header}>
                        Your Real Estate Recommendations
                    </div>
                    <div className={styles.subHeader}>
                    Investing in real estate, even as a beginner, can provide a reliable path to both rental income and potential appreciation in property value.
                    </div>
                    <div>
                        <div className={styles.reitTable}>
                            <Card className="max-w-xs">
                                <Title>Recommended REIT's</Title>
                                <List>
                                    {REITs.map((item) => (
                                        <ListItem key={item.name}>
                                            <span>{item.name}</span>
                                            <span>{item.rating}</span>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Visuals