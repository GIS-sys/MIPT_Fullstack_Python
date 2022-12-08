from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class UserInfo(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({"email": str(request.headers), "fullname": "api_user_fullnamew", "date_of_birth": "api_user_date_of_birthw"})

class UserFiles(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response([
            {"id": "1", "filename": "первый файл", "is_deleted": False},
            {"id": "2", "filename": "второй файл", "is_deleted": True},
            {"id": "3", "filename": "третий файл", "is_deleted": False},
        ])

class DeleteFile(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print(request.body)
        return Response([])
