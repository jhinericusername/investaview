import React from 'react'
import TradingViewWidget from 'react-tradingview-widget';

import styles from './StockData.module.css'

const StockData = (props) => {
    const { name, ticker, symbol, revenue, growth, profit, recommendation } = props
    const regExp = /\(([^)]+)\)/;
    const named = regExp.exec(name)[1];

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // Change to your desired currency code
      });

    return (
        <div className={styles.body}>
            <div className={styles.tradingView}>
                <TradingViewWidget symbol={named}  />
            </div>

            <div className={styles.data}>
                <div className={styles.header}>
                    <h2>{name}</h2>
                    <p>{ticker}</p>
                    <p> {symbol}</p>
                </div>

                <p> Revenue: {currencyFormatter.format(revenue)}</p>
                <p> Year-over-year growth: {(parseFloat(growth)*100).toFixed(2)}%</p>
                <p> Projected Profit: {currencyFormatter.format(profit)}</p>
                <div className={styles.reco}>
                    14/16 analysts recommend <span className={styles.green}>buying!</span>
                </div>
            </div>

        </div>
    )
}

export default StockData