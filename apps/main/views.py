import pandas as pd
from django.shortcuts import render, HttpResponse
from .excelParser import parseExcelFile
import json, codecs
import os as os

def index(req):
    return render(req, 'main/index.html')

def histogram(req):
    binCount = 20
    xlfile = '/Users/noah/Documents/Projects/Python/histogram/apps/main/histogram_data.xlsx'
    #output_file('output_file_test.html',title='Total Revenue Figure')
    revenueColumn = 'total_revenue'

    df = pd.read_excel(xlfile, 0)
    dfRevenue = df[revenueColumn].values
    final = []
    for x in dfRevenue.tolist():
        if x < 10000000:
            final.append(x)

    return HttpResponse(json.dumps({'data': final}), content_type="application/json")