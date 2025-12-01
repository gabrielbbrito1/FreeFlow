from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CustomerViewSet, ProductViewSet, OrderViewSet

# Router cria as rotas automaticamente
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = router.urls