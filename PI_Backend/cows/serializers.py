from rest_framework import serializers
from .models import Cow

class CowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cow
        fields = '__all__'
        read_only_fields = ['farm']