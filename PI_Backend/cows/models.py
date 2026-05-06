from django.db import models
from django.conf import settings

class Cow(models.Model):
    farm = models.ForeignKey('accounts.Farm', on_delete=models.CASCADE, related_name='cows')

    name = models.CharField(max_length=100)
    ear_tag = models.CharField(max_length=50, unique=True)

    breed = models.CharField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)

    health_status = models.CharField(max_length=50, default='healthy')

    # 🔥 nouveaux champs
    sex = models.CharField(max_length=10, blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    photo = models.ImageField(upload_to='cows/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name