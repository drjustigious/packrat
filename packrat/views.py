from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


def index(request):
    welcomePhrase = "Hello, world."

    context = {}

    return render(request, 'packrat/index.html', context)


def filter_loadouts(request):
    
    if request.method != "GET":
        return

    """
    # Trying out a plain JSON response...
    responseDict = {
        "Key1" : "Value1",
        "Key2" : "Badd valuezz"
    }

    return JsonRequest( responseDict )
    """

    context = {
        "loadoutsFiltered" : "true"
    }

    return render(request, 'packrat/index.html', context)