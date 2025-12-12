from django.shortcuts import render
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import User, Customer, Product, Order
from .serializers import (
    UserSerializer,
    CustomerSerializer,
    ProductSerializer,
    OrderSerializer
)

# 🔹 CRUD completo de Users
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# 🔹 CRUD completo de Customers
class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

# 🔹 CRUD completo de Products
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# 🔹 CRUD completo de Orders
class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


def health_check(request):
    return JsonResponse({"status": "ok"})

@api_view(['POST'])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email e senha são obrigatórios"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, email=email, password=password)
    if user is None:
        return Response({"error": "Email ou senha inválidos"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "user": {
            "id": str(user.id),
            "email": user.email,
            "phone": str(user.phone)
        }
    })


@api_view(['POST'])
def register(request):
    email = request.data.get("email")
    password = request.data.get("password")
    phone = request.data.get("phone")

    if not email or not password or not phone:
        return Response({"error": "Todos os campos são obrigatórios"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email já cadastrado"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(phone=phone).exists():
        return Response({"error": "Telefone já cadastrado"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(email=email, password=password, phone=phone)
    return Response({
        "message": "Usuário criado com sucesso",
        "user": {
            "id": str(user.id),
            "email": user.email,
            "phone": str(user.phone)
        }
    }, status=status.HTTP_201_CREATED)


def dashboard(request):
    return JsonResponse
