import pandas as pd
import json
from copy import deepcopy

df = pd.read_csv('https://raw.githubusercontent.com/opendatasicilia/ordinanze-covid/main/data.csv')
df = df[['pro_com','zona','data_inizio','data_fine']]

start = df['data_inizio'].min()
end = df['data_fine'].max()

dates = pd.date_range(start=start, end=end, freq='D')
date_list = []

for date in dates:
    date_list.append(date.strftime('%Y-%m-%d'))
    
total = []
output = []

for i, date in enumerate(date_list):
    entry = dict({"data": date, "rossa": (total[i-1]['rossa'] if len(total) > 0 else []), "arancione": (total[i-1]['arancione'] if len(total) > 0 else [])})

    for index, row in df.iterrows():

        if row['data_inizio'] == date:
            if row['zona'] == 'rossa':
                entry['rossa'].append(row['pro_com'])
            elif row['zona'] == 'arancione':
                entry['arancione'].append(row['pro_com'])

        elif row['data_fine'] == date:
            if row['zona'] == 'rossa':
                entry['rossa'].remove(row['pro_com'])
            elif row['zona'] == 'arancione':
                entry['arancione'].remove(row['pro_com'])

        if row['data_inizio'] == row['data_fine'] == date:
            if row['zona'] == 'rossa':
                entry['rossa'].remove(row['pro_com'])
            elif row['zona'] == 'arancione':
                entry['arancione'].remove(row['pro_com'])

    total.append(entry)
    output.append(deepcopy(entry))
    
with open('../src/data/zones.json', 'w') as f:
    json.dump(output , f)
