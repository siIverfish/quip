import json

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse

from .models import Challenge

# Create your views here.
def index(request):
    return render(request, "challenges/index.html", dict(challenges=Challenge.objects.all()))

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