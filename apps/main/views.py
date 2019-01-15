from django.shortcuts import render, HttpResponse
from .plotHistogram import createHistogram
import json

def index(req):
    hist = createHistogram()
    test = "Noah"
    context = {
        "hist": hist,
        'test': test
    }

    return render(req, 'main/index.html', context)

def histogram(req):
    return HttpResponse(json.dumps({"hist": createHistogram()}), content_type="application/json")