import json

from django.db import models

# Challenges should only be allowed to be submitted from trusted sources
# they can be used for XSS attacks w/ current setup

class Challenge(models.Model):
    
    # todo: validate correctness of this field @ database level
    class Difficulty(models.TextChoices):
        EASY = "Easy"
        MEDIUM = "Medium"
        HARD = "Hard"
    
    fields = [
        "description",
        "function_name",
        "function_args",
        "cases",
        "id",
    ]
    
    description = models.CharField(max_length=1000)
    function_name = models.CharField(max_length=40)
    function_args = models.JSONField()
    cases = models.JSONField()
    difficulty = models.TextField(
        choices=Difficulty.choices,
        default=Difficulty.EASY,
        verbose_name="Difficulty"
    )
    
    def __str__(self):
        return f"challenge #{self.id:0>4} | {self.function_name}"
    
    def json(self):
        return json.dumps({name:getattr(self, name) for name in self.fields})
    
    def get_absolute_url(self):
        from django.urls import reverse
        
        return reverse("detail", kwargs={"challenge_id": self.id}, current_app="challenges")