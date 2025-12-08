from django.shortcuts import render
from django.http import JsonResponse


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

def home(request):
    return JsonResponse({"status": "Backend funfando"})

def health_check(request):
    return JsonResponse({"status": "ok"})