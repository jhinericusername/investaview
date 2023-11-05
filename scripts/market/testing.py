import pandas as pd


# Now you can use dataset_path to read your dataset
df = pd.read_csv("sentiment_tech_articles.csv")
# Assuming your DataFrame is named df

# Create a list of the desired first and second columns
desired_first_columns = ["Full_Article_Sentiment", "Summary_Sentiment"]

# Create a list of the remaining columns excluding the two you want first
remaining_columns = [col for col in df.columns if col not in desired_first_columns]

# Concatenate the two lists to get the new column order
new_column_order = desired_first_columns + remaining_columns

# Reindex the DataFrame with the new column order
df = df[new_column_order]

# df = df[
#     ["Summary_Sentiment", "Date_Of_Publication", "Ticker_Covered", "Title", "Author"]
# ]

# Now, if you want to print this to a CSV file
df.to_csv("sentiment_tech_articles.csv", index=False)
