import pandas as pd

# Assuming 'stock_data' and 'sentiment_data' are already loaded and preprocessed Pandas DataFrames
stock_data = pd.read_csv("stock_features.csv", parse_dates=["Date"])
sentiment_data = pd.read_csv("sentiment_features.csv", parse_dates=["Date"])

# Merge the datasets on 'Date' and 'Ticker'
combined_data = pd.merge(stock_data, sentiment_data, on=["Date", "Ticker"], how="outer")

# Handle missing values, for example, by filling with the mean
combined_data.fillna(combined_data.mean(), inplace=True)

# Ensure the final DataFrame is sorted by date for time-series analysis
combined_data.sort_values(by="Date", inplace=True)


# Now 'combined_data' is ready to be used for model training

combined_data.to_csv("combined_data_market_final.csv", index=False)
