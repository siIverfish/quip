from django.db import models

# Create your models here.
class Challenge(models.Model):
    description = models.CharField(max_length=1000)
    function_name = models.CharField(max_length=40)
    function_args = models.JSONField()
    cases = models.JSONField()
    
    def __str__(self):
        return f"challenge #{self.id:0>4} | {self.function_name}"