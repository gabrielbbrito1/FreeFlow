from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ Todas as rotas da API
    path('api/', include('core.urls')),
]