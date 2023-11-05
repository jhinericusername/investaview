# Sentiment Analysis

import os
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

# Download the VADER lexicon
nltk.download("vader_lexicon")


# Now you can use dataset_path to read your dataset
df = pd.read_csv("updated_dataset.csv")

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

# Now, df includes two new columns with the sentiment scores
# Assuming your DataFrame is named df
df.to_csv("sentiment_tech_articles.csv", index=False)
