from django.shortcuts import render, HttpResponse
from .excelParser import parseExcelFile
import json

def index(req):
    return render(req, 'main/index.html')

def histogram(req):
    data = parseExcelFile("histogram-data.xlsx", False)
    print(data)
    return HttpResponse(json.dumps({'data': data}), content_type="application/json")