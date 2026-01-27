from django.utils import timezone
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
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
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Customer.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# 🔹 CRUD completo de Products
class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# 🔹 CRUD completo de Orders
class OrderViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


def health_check(request):
    return JsonResponse({"status": "ok"})

@permission_classes([AllowAny])
@api_view(['POST'])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email e senha são obrigatórios"}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(request, email=email, password=password)
    if user is None:
        print("Email ou senha inválidos")
        return Response({"error": "Email ou senha inválidos"}, status=status.HTTP_401_UNAUTHORIZED)

    user.last_login = timezone.now()
    user.save(update_fields=["last_login"])


    refresh = RefreshToken.for_user(user)
    print(user.id, user.email, user.first_name, user.last_name, user.phone, str(refresh), str(refresh.access_token))
    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "user": {
            "id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": str(user.phone),
            'access': str(refresh.access_token)
        }
    })


@permission_classes([AllowAny])
@api_view(['POST'])
def register(request):
    first_name = request.data.get("firstName")
    last_name = request.data.get("lastName")
    email = request.data.get("email")
    password = request.data.get("password")
    phone = request.data.get("phone")

    if not email or not password or not phone or not first_name or not last_name:
        return Response({"error": "Todos os campos são obrigatórios"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email já cadastrado"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(phone=phone).exists():
        return Response({"error": "Telefone já cadastrado"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(email=email, password=password, phone=phone, first_name=first_name, last_name=last_name)
    return Response({
        "message": "Usuário criado com sucesso",
        "user": {
            "id": str(user.id),
            "email": user.email,
            "phone": str(user.phone),
            "first_name" : str(user.first_name),
            "last_name" : str(user.last_name),
        }
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    return JsonResponse({"message": "Dashboard endpoint"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    
    return Response(serializer.data)