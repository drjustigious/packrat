from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


def index(request):
    """
    The Loadouts view page, doubles as the index.
    """
    context = {}
    return render(request, 'packrat/index.html', context)

def packables(request):
    """
    The Packables view page.
    """
    context = {}
    return render(request, 'packrat/packables.html', context)

def info(request):
    """
    The Information page.
    """
    context = {}
    return render(request, 'packrat/info.html', context)



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


def filter_packables(request):
    
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
        "packablesFiltered" : "true"
    }

    return render(request, 'packrat/packables.html', context)



def new_packable(request):
    """
    Create a new packable.
    """

    if request.method != "POST":
        return

    context = {}
    return render(request, 'packrat/packables.html', context)