from django.contrib import admin
from django.urls import path, include
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login),
    path("healthz/", views.health_check),
    path('auth/logar/', views.login, name='logar'),
    path('auth/register/', views.register, name='register'),
    
    # ✅ Todas as rotas da API
    path('api/', include('core.urls')),
]