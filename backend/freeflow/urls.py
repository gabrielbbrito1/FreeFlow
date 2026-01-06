from django.contrib import admin
from django.urls import path, include
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("healthz/", views.health_check),
    path('auth/login/', views.login, name='logar'),
    path('auth/register/', views.register, name='register'),
    path('user/get_user_data/', views.get_user_data, name='get_user_data'),

    # ✅ Todas as rotas da API
    path('api/', include('core.urls')),
]