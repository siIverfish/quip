import json

from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse

from .models import Challenge

# Create your views here.
def index(request):
    # there is probably an efficient way to simultaneously extract this data.
    data = (
        dict(
            color='success', 
            difficulty='Easy',   
            challenges=Challenge.objects.filter(difficulty="Easy"  )
        ),
        dict(
            color='warning', 
            difficulty='Medium', 
            challenges=Challenge.objects.filter(difficulty="Medium")
        ),
        dict(
            color='danger',  
            difficulty='Hard',   
            challenges=Challenge.objects.filter(difficulty="Hard"  )
        ),
    )
    return render(request, "challenges/index.html", dict(data=data))

def detail(request, challenge_id):
    challenge = get_object_or_404(Challenge, pk=challenge_id)
    return render(
        request,
        "challenges/app.html",
        dict(
            # todo: dont "send" this data twice
            challenge=challenge,
            challenge_data=challenge.json(),
            max_id=Challenge.objects.latest('id').id, # this might be slow?
        )
    )

def random_json(_request):
    # This may be dangerously slow. 
    return HttpResponse(Challenge.objects.order_by('?').first().json())

def random_redirect(_request):
    try:
        return redirect(Challenge.objects.order_by('?').first().get_absolute_url())
    except AttributeError:
        abort(404)
