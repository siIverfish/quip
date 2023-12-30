from django.shortcuts import render, redirect

from django.templatetags.static import static

def index(request):
    return render(
        request,
        "quip/index.html",
    )