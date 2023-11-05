# Sentiment Analysis

import os
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

# Download the VADER lexicon
nltk.download("vader_lexicon")


# Now you can use dataset_path to read your dataset
df = pd.read_csv("REIT_article_content.csv")

# Initialize VADER's SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()


# Define a function to get the compound sentiment score
def get_sentiment(text):
    # Convert to string in case the text is not a string (e.g., NaN, float)
    text = str(text)
    return sia.polarity_scores(text)["compound"]


# Apply the function to get sentiment scores for the 'Full_Article_Text' column
df["Full_Article_Sentiment"] = df["Full_Article_Text"].apply(get_sentiment)

# Apply the same for the 'Summary' column
df["Summary_Sentiment"] = df["Summary"].apply(get_sentiment)

df = df[
    [
        "Ticker_Covered",
        "Date_Of_Publication",
        "Summary_Sentiment",
        "Title",
        "Author",
        "Author_Link",
        "Summary",
        "Full_Article_Text",
        "Full_Article_Sentiment",
    ]
]


# Assuming 'df' is your original DataFrame
# Rename the columns
df.rename(
    columns={"Ticker_Covered": "Ticker", "Date_Of_Publication": "Date"}, inplace=True
)

# Reorder the columns
df = df[
    [
        "Ticker",
        "Date",
        "Summary_Sentiment",
        "Title",
        "Author",
        "Author_Link",
        "Summary",
        "Full_Article_Text",
        "Full_Article_Sentiment",
    ]
]

# Convert 'Date' to the desired format
df["Date"] = pd.to_datetime(df["Date"], format="%b. %d, %Y %I:%M %p ET").dt.strftime(
    "%m/%d/%y"
)

# Extract the ticker symbol from the parentheses
df["Ticker"] = df["Ticker"].str.extract(r"\((.*?)\)")

# Remove rows with empty Tickers
df.dropna(subset=["Ticker"], inplace=True)

# Now, df includes two new columns with the sentiment scores
# Assuming your DataFrame is named df
df.to_csv("sentiment_REIT_articles.csv", index=False)
