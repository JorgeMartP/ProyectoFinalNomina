from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Empleado, Empresa, Nomina, DetalleNomina, Contrato, Cargo, Deducciones, Devengado
from .serializer import EmpleadoSerializer, EmpresaSerializer, NominaSerializer, DetalleNominaSerializer, ContratoSerializer, CargoSerializer, DevengadoSerializer, DeduccionesSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializer import CustomUserSerializer
from django.db import transaction



# Create your views here.

class EmpleadoViewSet(viewsets.ModelViewSet):
    serializer_class = EmpleadoSerializer
    queryset = Empleado.objects.all()

    def get_queryset(self):
        empresa_id = self.request.query_params.get('empresa', None)
        if empresa_id:
            try:
                empresa_id = int(empresa_id)
                if not Empresa.objects.filter(nit=empresa_id).exists():
                    raise ValidationError("La empresa especificada no existe.")
                return Empleado.objects.filter(empresa=empresa_id)
            except ValueError:
                raise ValidationError("ID de empresa no válido.")
        return super().get_queryset()

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer
    

class NominaViewSet(viewsets.ModelViewSet):
    queryset = Nomina.objects.all()
    serializer_class = NominaSerializer

    def get_queryset(self):
        empresa_nit = self.request.query_params.get('empresa_nit', None)
        if empresa_nit:
            queryset = Nomina.objects.filter(
                detalles__empleado__empresa__nit=empresa_nit
            ).distinct()
            return queryset
        return super().get_queryset()
    

def calcularDeducciones(devengado, tipoContrato):
    if tipoContrato == 'Termino Fijo' or tipoContrato == 'Termino Indefinido':
        salud = devengado * 0.04
        pension = devengado * 0.04
        totalDevengado = salud + pension
    elif tipoContrato == 'Aprendizaje':
        salud = devengado * 0.04
        pension = 0
        totalDevengado = salud + pension
    else:
        salud = 0
        pension = 0
        totalDevengado = salud + pension
    return salud, pension, totalDevengado
    
    
class CrearNominaView(APIView):
    def post(self, request, *args, **kwargs):
        # Crear la nómina
        empresa_nit = request.data.get('empresa_nit')
        nomina_data = {
            'periodo': request.data.get('periodo')
        }
        nomina = Nomina.objects.create(**nomina_data)
        empleados = Empleado.objects.filter(empresa__nit=empresa_nit)
        print(empresa_nit)
        for empleado in empleados:
            # Crear devengados
            identificacion_empleado = empleado.identificacion
            print(f"Empleado: {empleado}, Identificación: {identificacion_empleado}")
            
            contrato = Contrato.objects.get(identificacion = identificacion_empleado)
            salario = contrato.salario
            tipoContrato = contrato.tipoContrato
            subsidio = 0
            devengado = 0
            
            if salario < 2600000 and tipoContrato == "Termino Fijo" or tipoContrato == "Termino Indefinido":
                subsidio = 162000
                devengado = subsidio + salario
            else:
                devengado = salario
                
            detalleNomina = DetalleNomina.objects.create(
                nomina = nomina,
                empleado = empleado,
                total_ganado = 0
            )
            Devengado.objects.create(
                subsidio_transporte = subsidio,
                total_devengado = devengado,
                nomina = detalleNomina,
            )
            
            salud, pension, totalDevengado = calcularDeducciones(devengado, tipoContrato)
            
            Deducciones.objects.create(
                aporteSalud = salud,
                aportePension = pension,
                totalDeducciones = totalDevengado,
                nomina=detalleNomina
            )
            
        return Response({'detail': 'Nómina creada con devengados y deducciones'}, status=status.HTTP_201_CREATED)


class DetalleNominaViewSet(viewsets.ModelViewSet):
    queryset = DetalleNomina.objects.all()
    serializer_class = DetalleNominaSerializer
    

class ContratoViewSet(viewsets.ModelViewSet):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer
    

class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer
    

class DevengadoViewSet(viewsets.ModelViewSet):
    queryset = Devengado.objects.all()
    serializer_class = DevengadoSerializer
    
class DeduccionesViewSet(viewsets.ModelViewSet):
    queryset = Deducciones.objects.all()
    serializer_class = DeduccionesSerializer
    
    
class CrearNovedades(APIView):
    def post(self, request, *args, **kwargs):
        
        pass
    

    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
class RegisterView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Usuario creado exitosamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RegistrarEmpleadoContrato(APIView):

    @transaction.atomic
    def post(self, request):
        # Extraer datos de la petición
        empleado_data = request.data.get('empleado')
        contrato_data = request.data.get('contrato')

        # Serializar los datos
        empleado_serializer = EmpleadoSerializer(data=empleado_data)

        # Validar los datos del empleado
        if empleado_serializer.is_valid():
            try:
                # Guardar empleado en una transacción atómica
                empleado = empleado_serializer.save()
                
                # Agregar el empleado al contrato
                contrato_data['identificacion'] = empleado.identificacion
                contrato_serializer = ContratoSerializer(data=contrato_data)
                
                # Validar los datos del contrato
                if contrato_serializer.is_valid():
                    contrato_serializer.save()
                    
                    return Response({
                        "empleado": empleado_serializer.data,
                        "contrato": contrato_serializer.data
                    }, status=status.HTTP_201_CREATED)
                else:
                    return Response({
                        "contrato_errors": contrato_serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)

            except Exception as e:
                transaction.set_rollback(True)
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        # Si la validación del empleado falla
        return Response({
            "empleado_errors": empleado_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)