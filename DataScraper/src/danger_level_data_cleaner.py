import json

# Specify the path to your JSON file
json_file_path = '..\\data\\misc\\DisasterDeclarationsSummaries.json'

# Open the JSON file for reading
with open(json_file_path, 'r') as file:
    # Load the JSON data from the file
    data = json.load(file)

# Now, 'data' contains the contents of the JSON file
# You can access the data like a Python dictionary

disaster_lookup = {}

for disaster in data['DisasterDeclarationsSummaries']:
    if disaster['state'] and disaster['designatedArea']:
        county = disaster['designatedArea'].split(" (")[0]
        key = county + ", " + disaster['state']
        if key in disaster_lookup:
            disaster_lookup[key] += 1
        else:
            disaster_lookup[key] = 1
        print(key)

disaster_lookup_color = {}

for key in disaster_lookup.keys():
    disaster_lookup[key] = float(disaster_lookup[key]) / 80.0
    if disaster_lookup[key] < 0.25:
        disaster_lookup_color[key] = "Green"
    elif disaster_lookup[key] < 0.5:
        disaster_lookup_color[key] = "Yellow"
    else:
        disaster_lookup_color[key] = "Red"

sorted_items = sorted(disaster_lookup.items(), key=lambda x: x[1])

# Specify the path where you want to save the JSON file
json_file_path = '..\\data\\openFEMA_Disaster_Data.json'

# Open the JSON file for writing
with open(json_file_path, 'w') as file:
    # Write the data to the file
    json.dump(disaster_lookup, file, indent=2)

print(sorted_items)
print(disaster_lookup_color)