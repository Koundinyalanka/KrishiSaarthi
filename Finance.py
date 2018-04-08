import pandas as pd
import numpy as np
import xlrd

dataframe = pd.read_excel("ABC.xlsx")

print (dataframe)

df = dataframe.drop_duplicates('Price Date')

print (df)

df.to_csv("ABC.csv")
