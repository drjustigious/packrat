from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    welcomePhrase = "Hello, world."

    context = {
        'welcomePhrase': welcomePhrase
    }

    return render(request, 'packrat/index.html', context)
