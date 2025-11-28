from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Customer, Product, Order

# Register your models here.
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    # Campos que aparecem na LISTAGEM
    list_display = ("email", "phone", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active")

    # Campo usado como busca
    search_fields = ("email", "phone", "id")

    ordering = ("email",)

    # Campos ao editar um usuário
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Informações pessoais", {"fields": ("phone",)}),
        ("Permissões", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Datas importantes", {"fields": ("last_login", "date_joined")}),
    )

    # Campos ao CRIAR um usuário
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "phone", "password1", "password2", "is_staff", "is_active"),
        }),
    )

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("email", "first_name", "last_name", "phone", "city", "created_at")
    search_fields = ("email", "phone")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "id")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "product", "status", "total_amount", "created_at")
    list_filter = ("status", "id")
