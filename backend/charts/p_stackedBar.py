# library
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import sys, os
import random, string

province1_data = sys.argv[1]                                  # province1 | data
province1_denominazione_provincia = sys.argv[2]               # province1 | denominazione_regione
province1_totale_casi = int(sys.argv[3])                      # province1 | totale_casi

province2_data = sys.argv[4]                                  # province2 | data
province2_denominazione_provincia = sys.argv[5]               # province2 | denominazione_regione
province2_totale_casi = int(sys.argv[6])                      # province2 | totale_casi

maxValue = int(sys.argv[7])                                   # maxValue

# set width of bar
barWidth = 0.35

# set height of bar
bars1 = [province1_totale_casi]
bars2 = [province2_totale_casi]

# Set position of bar on X axis
fig, ax = plt.subplots()
r1 = np.arange(len((bars1)))
r2 = [x + barWidth for x in r1]

# Make the plot
rect1 = plt.bar(r1, bars1, color='#29b6f6', width=barWidth, edgecolor='white',
                label=province1_denominazione_provincia + " " + province1_data[:10])
rect2 = plt.bar(r2, bars2, color='#ec407a', width=barWidth, edgecolor='white',
                label=province2_denominazione_provincia + " " + province2_data[:10])

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
plt.xticks([r + barWidth for r in range(len(bars1))], ['All cases'], color="#009688", size=10),

# Create legend & Show graphic
plt.legend(loc='upper right', bbox_to_anchor=(0.58, 1.1))
fig.set_size_inches(16, 12)

def randomword(length):
   letters = string.ascii_lowercase + string.ascii_uppercase
   return ''.join(random.choice(letters) for i in range(length))

rw = randomword(20)
imagePath = "./charts/images/pcStackedBar_"+rw+".png"
plt.savefig(imagePath, dpi=100)
sys.stdout.write(imagePath)