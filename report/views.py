from django.shortcuts import render
from . updater import *
from django.http import HttpResponse

# Create your views here.

def Report(self):
    start()
    return HttpResponse("Welcome to Report")

