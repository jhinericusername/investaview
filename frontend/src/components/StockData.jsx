import React from 'react'

import styles from './StockData.module.css'

const StockData = (props) => {
    const { name, ticker, symbol, price, description, recommendation, index} = props

    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h2>{name}</h2>
                <p>{ticker}</p>
                <p> {symbol}</p>
            </div>

            <p> {price}</p>
            <p> {description}</p>
            <p> {recommendation}</p>
            <p> {index}</p>
        </div>
    )
}

export default StockData