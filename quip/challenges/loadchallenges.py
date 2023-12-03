
import data
import models

for challenge_data in data.Challenge.all_challenges:
    challenge = models.Challenge(**challenge_data)
    challenge.save()