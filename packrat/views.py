from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.db.models import Q

import packrat.models as models

import decimal



def index(request):
    """
    The Loadouts view page, doubles as the index.
    """
    context = {}
    return render(request, 'packrat/index.html', context)


def packables(request, operationMessage=""):
    """
    The Packables view page.
    """
    listPackables = models.Packable.objects.all()
    listPackables = listPackables.order_by('name', 'date') # override default sorting by invisible id

    context = {
        "listPackables": listPackables,
        "numPackablesFound": len(listPackables)
    }

    # Construct a message to be shown in a box when the page loads
    modalMessage = ""

    if (operationMessage != ""):
        # TODO: once this part works with intended input, silently ignore parsing errors (likely from hacker input)
        messageVerb, messageNoun = operationMessage.split(":")

        if (messageVerb == "created"):
            modalMessage = "New packable \""+messageNoun+"\" created."
        elif (messageVerb == "updated"):
            modalMessage = "Packable \""+messageNoun+"\" updated."
        elif (messageVerb == "deleted"):
            modalMessage = "Packable \""+messageNoun+"\" deleted."

    if modalMessage != "":
        context["modalMessage"] = modalMessage

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

    # Order the results based on the sorting option
    sortingOption = request.GET["filter_sorting_option"]
    sortingOptionIndex = 0 # this is for the JavaScript that re-selects the correct option

    if sortingOption == "sort_by_name":
        listPackables = listPackables.order_by('name', '-date')
        sortingOptionIndex = 0
    elif sortingOption == "sort_by_date":
        listPackables = listPackables.order_by('-date', 'name')
        sortingOptionIndex = 2
    elif sortingOption == "sort_by_vendor":
        listPackables = listPackables.order_by('vendor', '-date', 'name')
        sortingOptionIndex = 4

    elif sortingOption == "sort_by_name_desc":
        listPackables = listPackables.order_by('-name', '-date')
        sortingOptionIndex = 1
    elif sortingOption == "sort_by_date_desc":
        listPackables = listPackables.order_by('date', 'name')
        sortingOptionIndex = 3
    elif sortingOption == "sort_by_vendor_desc":
        listPackables = listPackables.order_by('-vendor', '-date', 'name')
        sortingOptionIndex = 5

    # Return the list of items via the rendering context
    context = {
        "listPackables": listPackables,
        "numPackablesFound": len(listPackables),
        "filterInputReturned": True,
        "filterSortingOptionIndex": sortingOptionIndex,
        "filterSearchString": " ".join(listSearchTerms)
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

    return redirect('packables', operationMessage="created:"+newPackable.name)


def edit_packable(request):
    """
    Edits an existing packable.
    """
    # HTML forms only support GET and POST, so we use POST to modify records
    if request.method != "POST":
        return

    # Find the target record via the private key
    # This will raise the error models.Packable.DoesNotExist if the given id doesn't exist in the DB
    updatedPackable = models.Packable.objects.get( id = int(request.POST["edit_packable_id"]) )

    # Make changes according to what the user entered in the form
    updatedPackable.name = request.POST["edit_packable_name"]
    updatedPackable.description = request.POST["edit_packable_description"]
    updatedPackable.mass = float(request.POST["edit_packable_mass"])
    updatedPackable.cost = decimal.Decimal(request.POST["edit_packable_mass"])
    updatedPackable.vendor = request.POST["edit_packable_vendor"]
    updatedPackable.is_consumable = ("edit_packable_consumable" in request.POST)

    updatedPackable.save()

    return redirect('packables', operationMessage="updated:"+updatedPackable.name)


def delete_packable(request):
    """
    Deletes an existing packable.
    """

    # HTML forms only support GET and POST, so we use POST to modify records
    if request.method != "POST":
        return

    # Find the target record via the private key
    # This will raise the error Packable.DoesNotExist if the given id doesn't exist in the DB
    deletedPackable = models.Packable.objects.get( id = int(request.POST["delete_packable_id"]) )
    deletedName = deletedPackable.name
    deletedPackable.delete()

    return redirect('packables', operationMessage="deleted:"+deletedName)