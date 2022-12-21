from rest_framework import generics, permissions, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.serializer import RegisterSerializer, UserSerializer
from django.core import serializers
from django.contrib.auth.models import User
from django.http import JsonResponse
from api.serializer import UserSerializer
from api.models import StoreFile
import json
# Create your views here.


def parse_files(user_files):
    jsoned_files = json.loads(serializers.serialize('json', user_files))
    result = []
    for x in jsoned_files:
        result.append(x["fields"])
        result[-1]["id"] = x["pk"]
    return result


class UserInfo(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def get(self, request):
        username = str(request.user.username)
        email = str(request.user.email)
        first_name = str(request.user.first_name)
        last_name = str(request.user.last_name)
        return Response({"email": str(email), "fullname": str(first_name), "date_of_birth": str(last_name)})


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


class UploadFile(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = eval(request.body.decode("UTF-8"))
        new_file = StoreFile(author=data['username'],
                             filename=data['fileName'],
                             content=data['fileText'],
                             original_name=data['originalName'],
                             extension="")
        new_file.save()
        return Response([])


class UserFiles(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user_files = StoreFile.objects.filter(author=request.user.username)
        return Response(parse_files(user_files))


class DeleteFile(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = eval(request.body.decode("UTF-8"))
        StoreFile.objects.get(id=int(data["id"])).delete()
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

class GetFile(APIView):
    permission_classes = []
    def post(self, request):
        data = eval(request.body.decode("UTF-8"))
        my_files = parse_files(StoreFile.objects.filter(id=int(data["id"])))
        return Response(my_files[0])

