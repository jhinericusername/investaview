# List of tickers you want to get data for
import os
import pandas as pd
import yfinance as yf
from yahoo_fin.stock_info import get_data
import pandas_ta as ta
import re

df = pd.read_csv("sentiment_REIT_articles.csv")

# Filter out rows where 'Ticker_Covered' is empty or NaN
unique_tickers = df["Ticker"].unique().tolist()

# Print the list of unique tickers
print(len(unique_tickers))

tickers = unique_tickers

# The directory where you want to save the CSV file
output_directory = "REIT_stock_data_csv"
os.makedirs(output_directory, exist_ok=True)

# Define the date range and interval for the historical data
start_date = "2020-01-01"
end_date = "2023-01-01"
interval = "1d"  # 1 day

# Define the parameters for the MACD
macd_fast = 12
macd_slow = 26
macd_signal = 9

# Prepare an empty list to store the DataFrames
dataframes = []

# Loop through the list of tickers and retrieve/save the data
for ticker in tickers:
    try:
        print(f"Getting data for {ticker}")
        # Retrieve stock data
        data = get_data(
            ticker, start_date=start_date, end_date=end_date, interval=interval
        )

        # Reset the index to turn the date index into a column if it is not already
        data.reset_index(inplace=True)

        # Rename the date column if necessary to ensure clarity
        if "index" in data.columns:
            data.rename(columns={"index": "Date"}, inplace=True)

        # Ensure the date column is in datetime format (usually it should already be)
        data["Date"] = pd.to_datetime(data["Date"])

        # Add a new column for the ticker symbol
        data["Ticker"] = ticker

        # Calculate the Money Flow Index (MFI)
        data["MFI"] = ta.mfi(data["high"], data["low"], data["close"], data["volume"])

        # Calculate the Moving Average Convergence Divergence (MACD)
        macd = ta.macd(
            data["close"], fast=macd_fast, slow=macd_slow, signal=macd_signal
        )
        data = pd.concat([data, macd], axis=1)

        # Calculate the Bollinger Bands and %B
        bbands = ta.bbands(data["close"])
        data["%B"] = (data["close"] - bbands["BBL_5_2.0"]) / (
            bbands["BBU_5_2.0"] - bbands["BBL_5_2.0"]
        )
        data = pd.concat([data, bbands], axis=1)

        # Append the DataFrame to the list
        dataframes.append(data)

    except Exception as e:
        print(f"Failed to get data for {ticker}: {e}")

# Concatenate all the DataFrames in the list
combined_data = pd.concat(dataframes)

# Ensure 'Date' is a column and not an index
if "Date" not in combined_data.columns:
    combined_data.reset_index(inplace=True)
    combined_data.rename(columns={"index": "Date"}, inplace=True)

# Define the new order of the columns with 'Ticker' and 'Date' first
column_order = ["Ticker", "Date"] + [
    col for col in combined_data.columns if col not in ["Ticker", "Date"]
]

# Reindex the DataFrame with the new column order
combined_data = combined_data[column_order]
combined_data = combined_data.drop(columns=["ticker"])

# Ensure 'Date' is a datetime object
combined_data["Date"] = pd.to_datetime(combined_data["Date"])

# Convert 'Date' to the format 'MM/DD/YYYY'
combined_data["Date"] = combined_data["Date"].dt.strftime("%m/%d/%Y")

# Save the combined data to a single CSV file
csv_file_path = os.path.join(output_directory, "combined_stock_data.csv")
combined_data.to_csv(csv_file_path, index=False)
print(f"Combined data saved to {csv_file_path}")

print("Data retrieval and calculations complete.")
