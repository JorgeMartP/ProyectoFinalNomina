from django.urls import path, include
from . import views
from rest_framework import routers
from .views import CrearNominaView, RegisterView, CustomTokenObtainPairView, RegistrarEmpleadoContrato
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

router = routers.DefaultRouter()
router.register(r'empleado', views.EmpleadoViewSet)
router.register(r'empresa', views.EmpresaViewSet)
router.register(r'nomina', views.NominaViewSet)
router.register(r'detalleNomina', views.DetalleNominaViewSet)
router.register(r'contrato', views.ContratoViewSet)
router.register(r'cargo', views.CargoViewSet)
router.register(r'devengado', views.DevengadoViewSet)
router.register(r'deducciones', views.DeduccionesViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('crear_nomina',  CrearNominaView.as_view(), name='crear_nomina'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refesh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/register/empleado', RegistrarEmpleadoContrato.as_view(), name='register_empleado' )
]

