import React, { useEffect } from 'react';

const TradingViewWidget = () => {
    useEffect(() => {
        new TradingView.widget({
            "autosize": true,
            "symbol": "NASDAQ:AAPL", // Replace with your desired ticker symbol
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_49fd6"
        });
    }, []);

    return (
        <div className="tradingview-widget-container" style={{ height: '100%', width: '100%' }}>
            <div id="tradingview_49fd6" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
};

export default TradingViewWidget;