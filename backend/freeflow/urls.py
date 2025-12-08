from django.contrib import admin
from django.urls import path, include
from core import views, health_check

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path("healthz/", health_check),
    # ✅ Todas as rotas da API
    path('api/', include('core.urls')),
]