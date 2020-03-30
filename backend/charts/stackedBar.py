# library
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import sys

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

# set width of bar
barWidth = 0.35

# set height of bar
bars1 = [
    region1_terapia_intensiva,
    region1_ricoverati_con_sintomi,
    region1_totale_ospedalizzati,
    region1_isolamento_domiciliare,
    region1_totale_attualmente_positivi,
    region1_nuovi_attualmente_positivi,
    region1_dimessi_guariti,
    region1_deceduti,
    region1_totale_casi
]
bars2 = [
    region2_terapia_intensiva,
    region2_ricoverati_con_sintomi,
    region2_totale_ospedalizzati,
    region2_isolamento_domiciliare,
    region2_totale_attualmente_positivi,
    region2_nuovi_attualmente_positivi,
    region2_dimessi_guariti,
    region2_deceduti,
    region2_totale_casi
]

# Set position of bar on X axis
fig, ax = plt.subplots()
r1 = np.arange(len((bars1)))
r2 = [x + barWidth for x in r1]

# Make the plot
rect1 = plt.bar(r1, bars1, color='#29b6f6', width=barWidth, edgecolor='white',
                label=region1_denominazione_regione + " " + region1_data[:10])
rect2 = plt.bar(r2, bars2, color='#ec407a', width=barWidth, edgecolor='white',
                label=region2_denominazione_regione + " " + region2_data[:10])


def autolabel(rects):
    for rect in rects:
        height = rect.get_height()
        ax.text(rect.get_x() + rect.get_width()/2., 1.05*height,
                '%d' % int(height),
                ha='center', va='bottom')


autolabel(rect1)
autolabel(rect2)

# Add xticks on the middle of the group bars
plt.xlabel('SickBot by Danilo Mongelli', fontweight='bold')
plt.xticks([r + barWidth for r in range(len(bars1))], ['Intensive Care', 'Hospitalized today', 'New Hospitalized',
                                                       'Isolation', 'All infected', 'New infected', 'Recovered today', 'deaths', 'All cases', 'Covid Tests'])

# Create legend & Show graphic
plt.legend()
fig.set_size_inches(18.5, 10.5)
plt.savefig("./charts/generatedImages/stackedBar.png")
