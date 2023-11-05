import Navbar from '../components/Navbar'
import CoolAccordion from '../components/CoolAccordion'
import { Card, LineChart, Title } from "@tremor/react";
import { useState } from 'react'
import styles from './Visuals.module.css'
import StockData from '../components/StockData'
import OptionTab from '../components/OptionTab'
import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Visuals = () => {
    const [currStock, setStock] = useState('AAPL')
    const [value, setValue] = React.useState(null);

    const handleStock = (stock) => {

        setStock(stock)
    }

    const stockContent = [
        {
            name: 'AAPL',
            ticker: 'STK1',
            symbol: 'S1',
            price: 100,
            description: 'Description for Stock 1',
            recommendation: 'Buy',
            index: 90,
        },
        {
            name: 'Stock 2',
            ticker: 'STK2',
            symbol: 'S2',
            price: 120,
            description: 'Description for Stock 2',
            recommendation: 'Hold',
            index: 80,
        },
        {
            name: 'Stock 3',
            ticker: 'STK3',
            symbol: 'S3',
            price: 80,
            description: 'Description for Stock 3',
            recommendation: 'Sell',
            index: 70,
        },
    ];

    const marks = [
        {
            value: 1,
            label: '1%',
        },
        {
            value: 25,
            label: '25',
        },
        {
            value: 50,
            label: '50',
        },
        {
            value: 75,
            label: '75',
        },
        {
            value: 100,
            label: '100%',
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
          name: "REIT 2",
          rating: "89%",
        },
        {
          name: "Etc",
          rating: "98%",
        },
      ];

    return (
        <div>
            <Navbar />

            <div className={styles.largeContainer}>
                <div className={styles.topOnes}>
                    {/* header */}
                    <div className={styles.header}>
                        Your Top Investments
                    </div>

                    <div className={styles.stockInfo}>
                        <div className={styles.optionTabs}>
                            {stockContent.map((stock, index) => (
                                <OptionTab key={index} name={stock.name} />
                            ))}
                        </div>

                        <div className={styles.stockDetails}>
                            {stockContent.map((stock, i) => {
                                if (stock.name === currStock) {
                                    return <StockData key={i} name={stock.name} ticker={stock.ticker} symbol={stock.symbol}
                                        price={stock.price} description={stock.description} recommendation={stock.recommendation} index={stock.index} />
                                }
                            })}
                        </div>
                    </div>

                </div>

                {/* projection-related info */}
                <div>
                    <div className={styles.inputting}>
                        <div>
                            {/* <BiDollar className={styles.dollar}/> */}
                            <input type='text' className={styles.input}
                                placeholder="Current Risk/Capital ($)	" />
                        </div>
                        <input type='text' className={styles.input}
                            placeholder="Years to Grow (1-20)" />

                        <div>
                            Risk desired

                        </div>
                        <Box sx={{ width: 300 }}>
                            <Slider
                                aria-label="Custom marks"
                                defaultValue={20}
                                // getAriaValueText={valuetext}
                                step={10}
                                valueLabelDisplay="auto"
                                marks={marks}
                            />
                        </Box>

                    </div>

                    <div className={styles.header}>
                        Your Projection
                    </div>
                    <div className='graph'>
                        <Card>
                            <Title>Performance</Title>
                            <LineChart
                                className="h-72 mt-4"
                                data={investmentData}
                                index="date"
                                categories={["Amount"]}
                                colors={["orange"]}
                                yAxisWidth={30}
                                onValueChange={(v) => setValue(v)}
                                connectNulls={true}
                            />
                        </Card>
                        {/* <pre>{JSON.stringify(value)}</pre> */}
                    </div>
                </div>

                {/* metric definitions */}
                <div className={styles.metricContainer}>
                    <div className={styles.header}>Metrics</div>
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
                        blurb about real estate ; why following tese recommmendations might be good
                    </div>
                    <div>
                        <div>
                            {/* list of REITS */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Visuals