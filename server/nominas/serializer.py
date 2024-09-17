from rest_framework import serializers
from .models import Empresa, Empleado, Cargo, Contrato, Nomina, HorasExtras, Deducciones, Novedades, Devengado, Parafiscales, DetalleNomina
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password



class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class DetalleNominaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleNomina
        fields = '__all__'

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'


class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo
        fields = '__all__'


class ContratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrato
        fields = '__all__'


class NominaSerializer(serializers.ModelSerializer):
    empleados = EmpleadoSerializer(many=True, read_only=True)  

    class Meta:
        model = Nomina
        fields = '__all__'


class HorasExtrasSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorasExtras
        fields = '__all__'


class DeduccionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deducciones
        fields = '__all__'


class NovedadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novedades
        fields = '__all__'


class DevengadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devengado
        fields = '__all__'


class ParafiscalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parafiscales
        fields = '__all__'
        
        14211795
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # El nombre de usuario y la contraseña enviados por el usuario
        email = attrs.get('email')
        password = attrs.get('password')

        # Verificamos que el usuario exista y las credenciales sean correctas
        user = authenticate(email=email, password=password)

        if user is None:
            # Si el usuario no es encontrado o la contraseña no es válida
            raise serializers.ValidationError('Credenciales inválidas')

        # Si las credenciales son válidas, generamos el token como de costumbre
        data = super().validate(attrs)

        # Opcional: Agregar información adicional al token
        data['rol'] = user.rol
        return data
    
class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'password2', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined', 'rol']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden"})
        return data

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            rol=validated_data.get('rol', '')
        )
        return user
    
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['rol'] = user.rol
        return token