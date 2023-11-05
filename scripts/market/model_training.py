from sklearn.preprocessing import MinMaxScaler
import numpy as np
import pandas as pd

combined_data = pd.read_csv("combined_data_market_final.csv", parse_dates=["Date"])
# Drop non-numeric columns
numeric_data = combined_data.drop(columns=["Date", "Ticker"])

# Check for infinities and replace them with NaN
numeric_data = numeric_data.replace([np.inf, -np.inf], np.nan)

# Now, check if there are any NaNs in the DataFrame
print(numeric_data.isna().sum())

# You can choose to fill NaNs with a value, such as the mean or median of the column
# For example, to fill with the mean:
numeric_data.fillna(numeric_data.mean(), inplace=True)

# Ensure there are no longer any infinities or NaNs
assert not numeric_data.isin([np.inf, -np.inf, np.nan]).any().any()

# Now you can proceed with scaling
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_features = scaler.fit_transform(numeric_data)


# Define the sequence length (the window of data the LSTM will see for making the next prediction)
sequence_length = 20  # For example, we might want to look at 20 days of stock data to predict the next day

# Prepare the input and output sequences
X, y = [], []
for i in range(len(scaled_features) - sequence_length):
    X.append(scaled_features[i : i + sequence_length])
    y.append(
        scaled_features[i + sequence_length, numeric_data.columns.get_loc("adjclose")]
    )  # Predicting the next day's adjusted close price

X = np.array(X)
y = np.array(y)

# Define the train data size
train_size = int(len(X) * 0.8)

# Split the data
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]

# The LSTM will expect input data in the form of (number of samples, number of time steps, number of features per step)
# Since we're predicting stock prices, our output will be one-dimensional (the predicted 'adjclose' price)

from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout

# Assuming 'n_features' is the number of features in the scaled feature data
n_features = X.shape[2]

model = Sequential()
model.add(
    LSTM(units=50, return_sequences=True, input_shape=(sequence_length, n_features))
)
model.add(Dropout(0.2))
model.add(LSTM(units=50, return_sequences=False))
model.add(Dropout(0.2))
model.add(
    Dense(units=1)
)  # The output layer that predicts the next day's 'adjclose' price

model.compile(optimizer="adam", loss="mean_squared_error")

# Let's see the model summary
model.summary()

# Define the number of epochs and batch size
epochs = 50  # The number of iterations over the entire dataset
batch_size = 32  # The number of samples per gradient update

# Train the model
history = model.fit(
    X_train,
    y_train,
    epochs=epochs,
    batch_size=batch_size,
    validation_data=(X_test, y_test),
    verbose=1,
)
# Evaluate the model
loss = model.evaluate(X_test, y_test, verbose=1)
print(f"Test loss: {loss}")
