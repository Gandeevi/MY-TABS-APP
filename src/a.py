import pandas as pd

# Load the Excel file
file_path = 'C:/Users/USER/Downloads/All Deals_Murex_20.01.2025.xlsx'  # replace with your file path
sheet_name = 'Data'  # replace with your sheet name

# Read the sheet into a DataFrame
df = pd.read_excel(file_path, sheet_name=sheet_name)

# Display the DataFrame
print(df)