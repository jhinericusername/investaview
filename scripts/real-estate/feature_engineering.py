# Feature Engineering for the stock dataset
import pandas as pd

stock_data_path = "combined_stock_data.csv"

# Re-load the stock data in case we need a fresh start
stock_data = pd.read_csv(stock_data_path, parse_dates=["Date"])

# Make sure 'Date' is the index for easier manipulation
stock_data.set_index("Date", inplace=True)

# Calculate daily percentage change in closing price
stock_data["daily_pct_change"] = stock_data["adjclose"].pct_change()

# Calculate moving averages for closing prices
stock_data["close_5_day_ma"] = stock_data["adjclose"].rolling(window=5).mean()
stock_data["close_20_day_ma"] = stock_data["adjclose"].rolling(window=20).mean()

# Calculate volatility (standard deviation of daily pct change over last 20 days)
stock_data["volatility_20_day"] = (
    stock_data["daily_pct_change"].rolling(window=20).std()
)

# Calculate daily percentage change in volume
stock_data["volume_pct_change"] = stock_data["volume"].pct_change()


# Calculate moving averages for volume
stock_data["volume_5_day_ma"] = stock_data["volume"].rolling(window=5).mean()
stock_data["volume_20_day_ma"] = stock_data["volume"].rolling(window=20).mean()

# Use existing technical indicators but make sure there are no missing values
# For the sake of this example, we will fill missing values with the median of the column
technical_indicators = [
    "MFI",
    "MACD_12_26_9",
    "MACDh_12_26_9",
    "MACDs_12_26_9",
    "%B",
    "BBL_5_2.0",
    "BBM_5_2.0",
    "BBU_5_2.0",
    "BBB_5_2.0",
    "BBP_5_2.0",
]
stock_data[technical_indicators] = stock_data[technical_indicators].fillna(
    stock_data[technical_indicators].median()
)
# Fill missing values in the entire DataFrame with the mean of each column
stock_data.fillna(stock_data.mean(), inplace=True)

# Reset index before exporting to make sure 'Date' is a column
stock_data.reset_index(inplace=True)

# Define the path for the stock features CSV file
stock_features_path = "stock_features.csv"

# Export the enhanced stock data to a CSV file
stock_data.to_csv(stock_features_path, index=False)

sentiment_data_path = "sentiment_REIT_articles.csv"
# Re-load the sentiment data to start fresh
sentiment_data = pd.read_csv(sentiment_data_path, parse_dates=["Date"])

# Daily Average Sentiment
# Group by Date and Ticker to calculate daily average sentiment scores
daily_sentiment = (
    sentiment_data.groupby(["Date", "Ticker"])
    .agg({"Full_Article_Sentiment": "mean", "Summary_Sentiment": "mean"})
    .reset_index()
)

# Sentiment Score Change
# Calculate the day-over-day change in sentiment for each ticker
daily_sentiment["change_in_full_sentiment"] = daily_sentiment.groupby("Ticker")[
    "Full_Article_Sentiment"
].diff()
daily_sentiment["change_in_summary_sentiment"] = daily_sentiment.groupby("Ticker")[
    "Summary_Sentiment"
].diff()

# Rolling Average Sentiment
# Compute rolling averages of sentiment scores to smooth out daily fluctuations
daily_sentiment["rolling_avg_full_sentiment"] = daily_sentiment.groupby("Ticker")[
    "Full_Article_Sentiment"
].transform(lambda x: x.rolling(window=5, min_periods=1).mean())
daily_sentiment["rolling_avg_summary_sentiment"] = daily_sentiment.groupby("Ticker")[
    "Summary_Sentiment"
].transform(lambda x: x.rolling(window=5, min_periods=1).mean())

# Sentiment Volatility
# Calculate the standard deviation of sentiment scores over a rolling window
daily_sentiment["volatility_full_sentiment"] = daily_sentiment.groupby("Ticker")[
    "Full_Article_Sentiment"
].transform(lambda x: x.rolling(window=5, min_periods=1).std())
daily_sentiment["volatility_summary_sentiment"] = daily_sentiment.groupby("Ticker")[
    "Summary_Sentiment"
].transform(lambda x: x.rolling(window=5, min_periods=1).std())


daily_sentiment.fillna(sentiment_data.mean(), inplace=True)
# Export the sentiment features to a CSV file
sentiment_features_path = "sentiment_features.csv"
daily_sentiment.to_csv(sentiment_features_path, index=False)
