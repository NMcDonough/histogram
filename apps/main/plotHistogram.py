from bokeh.plotting import output_file, figure, show
from bokeh.models import HoverTool, NumeralTickFormatter
# from bokeh.core import serialize_json
import numpy as np
from .excelParser import parseExcelFile
import random
from bokeh.models.widgets import Slider
from bokeh.layouts import widgetbox, layout
from bokeh.embed import json_item, file_html
from bokeh.resources import CDN
import json

#Disables scientific notation
np.set_printoptions(precision=2, suppress=True)

def setBinVals(arr, bins):
       increment = 0
       newarr = []
       arrRange = max(arr) - min(arr)
       if bins == 0:                             # This way, the user can send how many bins they'd like to use. If set to zero,
              increment = arrRange/len(arr)      # it automatically creates the bins based on the given arrays length
              for i in range(0, len(arr)):
                     newarr.append(min(arr) + (i * increment))
       else:
              increment = arrRange/bins
              for i in range(0, bins):
                     newarr.append(min(arr) + (i * increment))
       return newarr

def getData():
       rawData = parseExcelFile("histogram-data.xlsx", False)
       filteredData = []

       for key in rawData:
              if rawData[key]['total_revenue'] < 5000000 and random.randint(0,1) < 0.5:
                     filteredData.append(rawData[key]['total_revenue'])

       histData = np.histogram(filteredData, 45)
       histDataFinal = [histData[0], setBinVals(histData[1], 0), []]
       for x in range(0, len(histDataFinal[1])):
              try:
                     histDataFinal[2].append(histDataFinal[1][x + 1] - 0.01)
              except:
                     break
       return histDataFinal

# TODO: this method
def update(attr, old, new):
       print("called")

def createHistogram():
       data = getData()
       slider = Slider(start=10, end=150, step=5, value=10, title="No. of bins")

       p = figure(title="Total Revenue for Grantees", tools='', toolbar_location='right', background_fill_color='white') # Declares general graph options
       p.y_range.start = 0 # Tells y-axis to start at 0
       p.xaxis.axis_label = "Dollars ($)" # $ x-axis label
       p.yaxis.axis_label = "# of Organizations"# y-axis label
       p.xaxis.major_label_orientation = 0.5 # Makes x-axis labels appear at an angle - used for readability
       p.quad(top=data[0], bottom=0, left=data[1], right=data[2], fill_color='red', line_color='red', fill_alpha=0.8, line_alpha=0.8) # Generates histogram bins and aligns them
       h = HoverTool(tooltips = [('Total', '@top{0,0}'), ('Range', '$@left{0,0} to $@right{0,0}')]) # Creates and stylizes the tooltips above histogram bars
       p.add_tools(h) # Adds tooltips to the histogram
       p.xaxis[0].formatter = NumeralTickFormatter(format="0,0") # Formats ticks on the x axis
       p.yaxis[0].formatter = NumeralTickFormatter(format="0,0") # Formats ticks on the y axis

       l = layout(children=[ # Sets layout for the graph and whatever else Bokeh is generating, aligns them
              [p, slider]
              ], sizing_mode='fixed')
       jplot = json.dumps(json_item(l))
       return jplot