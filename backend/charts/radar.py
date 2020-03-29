import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from math import pi
import sys

print(sys.argv)
region1_data = sys.argv[1]  # region1 | data
region1_denominazione_regione = sys.argv[2]  # region1 | denominazione_regione
# region1 | ricoverati_con_sintomi
region1_ricoverati_con_sintomi = int(sys.argv[3])
region1_terapia_intensiva = int(sys.argv[4])  # region1 | terapia_intensiva
# region1 | totale_ospedalizzati
region1_totale_ospedalizzati = int(sys.argv[5])
# region1 | isolamento_domiciliare
region1_isolamento_domiciliare = int(sys.argv[6])
# region1 | totale_attualmente_positivi
region1_totale_attualmente_positivi = int(sys.argv[7])
# region1 | nuovi_attualmente_positivi
region1_nuovi_attualmente_positivi = int(sys.argv[8])
region1_dimessi_guariti = int(sys.argv[9])  # region1 | dimessi_guariti
region1_deceduti = int(sys.argv[10])  # region1 | deceduti
region1_totale_casi = int(sys.argv[11])  # region1 | totale_casi
region1_tamponi = int(sys.argv[12])  # region1 | tamponi

region2_data = sys.argv[13]  # region2 | data
region2_denominazione_regione = sys.argv[14]  # region2 | denominazione_regione
# region2 | ricoverati_con_sintomi
region2_ricoverati_con_sintomi = int(sys.argv[15])
region2_terapia_intensiva = int(sys.argv[16])  # region2 | terapia_intensiva
# region2 | totale_ospedalizzati
region2_totale_ospedalizzati = int(sys.argv[17])
# region2 | isolamento_domiciliare
region2_isolamento_domiciliare = int(sys.argv[18])
# region2 | totale_attualmente_positivi
region2_totale_attualmente_positivi = int(sys.argv[19])
# region2 | nuovi_attualmente_positivi
region2_nuovi_attualmente_positivi = int(sys.argv[20])
region2_dimessi_guariti = int(sys.argv[21])  # region2 | dimessi_guariti
region2_deceduti = int(sys.argv[22])  # region2 | deceduti
region2_totale_casi = int(sys.argv[23])  # region2 | totale_casi
region2_tamponi = int(sys.argv[24])  # region2 | tamponi

maxValue = int(sys.argv[25])  # maxValue

# Set data
df = pd.DataFrame({
    'group': ['A', 'B'],
    'New hospitalized': [(region1_ricoverati_con_sintomi), region2_ricoverati_con_sintomi],
    'Intensive care': [region1_terapia_intensiva, region2_terapia_intensiva],
    'All hospitalized': [region1_totale_ospedalizzati, region2_totale_ospedalizzati],
    'In isolation': [region1_isolamento_domiciliare, region2_isolamento_domiciliare],
    'Infected': [region1_totale_attualmente_positivi, region2_totale_attualmente_positivi],
    'New infected': [region1_nuovi_attualmente_positivi, region2_nuovi_attualmente_positivi],
    'Discharged healed': [region1_dimessi_guariti, region2_dimessi_guariti],
    'Deaths': [region1_deceduti, region2_deceduti],
    'Total cases': [region1_totale_casi, region2_totale_casi],
})

# ------- PART 1: Create background

# number of variable
categories = list(df)[1:]
N = len(categories)

# What will be the angle of each axis in the plot? (we divide the plot / number of variable)
angles = [n / float(N) * 2 * pi for n in range(N)]
angles += angles[:1]

# Initialise the spider plot
fig = plt.figure(figsize=(15, 10))
ax = plt.subplot(111, polar=True)

# If you want the first axis to be on top:
ax.set_theta_offset(pi / 2)
ax.set_theta_direction(-1)

# Draw one axe per variable + add labels labels yet
plt.xticks(angles, categories)

# Draw ylabels
for label, i in zip(ax.get_xticklabels(), range(0, len(angles))):
    angle_rad = angles[i]
    if angle_rad <= pi/2:
        ha = 'left'
        va = "bottom"
        angle_text = angle_rad*(-180/pi)+90
    elif pi/2 < angle_rad <= pi:
        ha = 'left'
        va = "top"
        angle_text = angle_rad*(-180/pi)+90
    elif pi < angle_rad <= (3*pi/2):
        ha = 'right'
        va = "top"
        angle_text = angle_rad*(-180/pi)-90
    else:
        ha = 'right'
        va = "bottom"
        angle_text = angle_rad*(-180/pi)-90
    label.set_rotation(angle_text)
    label.set_verticalalignment(va)
    label.set_horizontalalignment(ha)

ax.set_rlabel_position(0)

ticks = np.linspace(0, 2*np.pi, 20, endpoint=False)

plt.xticks(color="#0288d1", size=10)
plt.yticks(color="#009688", size=8)

# ------- PART 2: Add plots

# Plot each individual = each line of the data
# I don't do a loop, because plotting more than 3 groups makes the chart unreadable

# Ind1
values = df.loc[0].drop('group').values.flatten().tolist()
values += values[:1]
ax.plot(angles, values, linewidth=0.8, linestyle='solid',
        label=region1_denominazione_regione + "\n" + region1_data[:-9])
ax.fill(angles, values, 'b', alpha=0.1)

# Ind2
values = df.loc[1].drop('group').values.flatten().tolist()
values += values[:1]
ax.plot(angles, values, linewidth=0.8, linestyle='solid',
        label=region2_denominazione_regione + "\n" + region2_data[:-9])
ax.fill(angles, values, 'r', alpha=0.1)

# Add legend
plt.legend(loc='upper right', bbox_to_anchor=(0.07, 1.15))
plt.xlabel('SickBot by Danilo Mongelli', fontweight='bold')

plt.savefig("./charts/generatedImages/radar.png", dpi=(150))
sys.stdout.flush()
