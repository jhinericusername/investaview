import Navbar from '../components/Navbar'

import { useState } from 'react'
import styles from './Visuals.module.css'
import StockData from '../components/StockData'

const Visuals = () => {
    const [stock, setStock] = useState('AAPL')

    const handleStock = (stock) => {

        setStock(stock)
    }

    const stockContent = [
        {
            name: 'Stock 1',
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


    return (
        <div>
            <Navbar />

            <div className={styles.topOnes}>
                {/* header */}
                <div className={styles.header}>
                    Your Top Investments
                </div>

                <div className="stock-info-container">
                    <div className="tab-buttons">
                        {stockContent.map((stock, index) => (
                            <div
                                key={index}
                                className={`tab-button ${stock === index ? 'active' : ''}`}
                                onClick={() => this.handleTabClick(index)}
                            >
                                {stock.name}
                            </div>
                        ))}
                    </div>

                    <div className="stock-details">
                        {stockContent.map((stock, i) => (
                            <StockData key={i} name={stock.name} ticker={stock.ticker} symbol={stock.symbol}
                                price={stock.price} description={stock.description} recommendation={stock.recommendation} index={stock.index} />
                        ))}
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

                </div>
            </div>
        </div>
    )
}

export default Visuals