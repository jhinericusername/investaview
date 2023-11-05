import React from 'react'

import styles from './StockData.module.css'

const StockData = (props) => {
    const { name, ticker, symbol, price, description, recommendation, index} = props

    return (
        <div className={styles.body}>
            <div>
                
            </div>
            <h2>{name}</h2>
            <p>Ticker: {ticker}</p>
            <p>Symbol: {symbol}</p>
            <p>Current Price: {price}</p>
            <p>Description: {description}</p>
            <p>Recommendation: {recommendation}</p>
            <p>Comprehensive Stock Index: {index}</p>
        </div>
    )
}

export default StockData