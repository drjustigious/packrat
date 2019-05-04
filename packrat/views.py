from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db.models import Q
import packrat.models as models



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
    listPackables = models.Packable.objects.all()

    context = {
        "listPackables": listPackables,
        "numPackablesFound": len(listPackables)
    }

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

    # Get a list of separate search words
    listSearchTerms = request.GET["filter_searchstring"].split(" ")
    listSearchTerms = [s for s in listSearchTerms if s != ""]

    # Refine the list of items returned from the database
    listPackables = models.Packable.objects.all()

    for searchTerm in listSearchTerms:
        listPackables = listPackables.filter(
            Q(name__icontains=searchTerm) | Q(description__icontains=searchTerm) | Q(vendor__icontains=searchTerm)
        )

    # Return the list of items via the rendering context
    context = {
        "listPackables": listPackables,
        "numPackablesFound": len(listPackables)
    }

    return render(request, 'packrat/packables.html', context)



def new_packable(request):
    """
    Creates a new packable in the database based on data delivered via a POST request.
    """

    if request.method != "POST":
        return

    newPackable = models.Packable(
        name = request.POST["new_packable_name"],
        description = request.POST["new_packable_description"],
        mass = request.POST["new_packable_mass"],
        cost = request.POST["new_packable_cost"],
        vendor = request.POST["new_packable_vendor"],
        is_consumable = ("new_packable_consumable" in request.POST)
    )

    newPackable.save()

    """
    respDict = {
        "name": newPackable.name,
        "description": newPackable.description,
        "mass": newPackable.mass,
        "cost": newPackable.cost,
        "vendor": newPackable.vendor,
        "is_consumable": newPackable.is_consumable
    }
    """

    listPackables = models.Packable.objects.all()

    context = {
        "newPackable": newPackable.name,
        "listPackables": listPackables,
        "numPackablesFound": len(listPackables)
    }

    return render(request, 'packrat/packables.html', context)


def edit_packable(request):
    """
    Edits an existing packable.
    """
    listPackables = models.Packable.objects.all()

    context = {
        "listPackables": listPackables,
        "numPackablesFound": len(listPackables)
    }