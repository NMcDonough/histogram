import pandas as pd
from django.shortcuts import render, HttpResponse
from .excelParser import parseExcelFile
from urllib.parse import urlparse
import json, codecs
import os as os

def index(req):
    return render(req, 'main/index.html')

def histogram(req):
    binCount = 20
    xlfile = '/home/noahmcdonough/Documents/histogram/apps/main/histogram_data.xlsx'
    #output_file('output_file_test.html',title='Total Revenue Figure')
    revenueColumn = 'total_revenue'
    filterAmount = 10000000

    df = pd.read_excel(xlfile, 0)
    orgFinal = df.loc[df[revenueColumn] < filterAmount] # Data is now filtered to organizations whose revenue is less than filterAmount
    print(req.body)
    dfRevenue = orgFinal[revenueColumn].values

    return HttpResponse(json.dumps({'data': dfRevenue.tolist(), 'fulldata': orgFinal.to_json()}), content_type="application/json")