from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Cow
from .serializers import CowSerializer
from accounts.models import Farm


class CowListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    # GET all cows of logged user's farm
    def get(self, request):
        cows = Cow.objects.filter(farm__user=request.user)
        serializer = CowSerializer(cows, many=True)
        return Response({"data": serializer.data})

    # CREATE cow
    def post(self, request):
        try:
            farm = Farm.objects.get(user=request.user)
        except Farm.DoesNotExist:
            return Response({"error": "Farm not found"}, status=404)

        serializer = CowSerializer(data=request.data)
        print(request.FILES)

        if serializer.is_valid():
            cow = serializer.save(farm=farm)  
            return Response({"data": CowSerializer(cow).data}, status=201)

        return Response(serializer.errors, status=400)
    
    def get_object(self, request, pk):
        try:
            return Cow.objects.get(pk=pk, farm__user=request.user)
        except Cow.DoesNotExist:
            return None

    def put(self, request, pk):
        cow = self.get_object(request, pk)
        if not cow:
            return Response({"error": "Vache introuvable"}, status=404)
        serializer = CowSerializer(cow, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data})
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        cow = self.get_object(request, pk)
        if not cow:
            return Response({"error": "Vache introuvable"}, status=404)
        cow.delete()
        return Response({"message": "Vache supprimée"}, status=204)