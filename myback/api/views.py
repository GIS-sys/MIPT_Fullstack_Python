from rest_framework import generics, permissions, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.serializer import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
#from rest_framework.authtoken.models import Token

# Create your views here.


class UserInfo(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def get(self, request):
        username = request.user
        return Response({"email": username, "fullname": "fullnametmp", "date_of_birth": "api_user_date_of_birthw"})


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
    def post(self, request):
        return Response([])


class SearchResults(APIView):
    permission_classes = []
    def post(self, request):
        data = eval(request.body.decode("UTF-8"))
        fileName = data["fileName"]
        author = data["author"]
        return Response([
            {"id": "1", "filename": "!просто_приставка_вначале_" + fileName, "author": author},
            {"id": "2", "filename": fileName, "author": "!просто_приставка_вначале_" + author}
        ])


class UploadFile(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = eval(request.body.decode("UTF-8"))
        return Response([data["fileName"]])


class GetFile(APIView):
    permission_classes = []
    def get(self, request):
        return Response({"content": "asd", "name": "thisisname", "extension": ".weird"})


class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        })

