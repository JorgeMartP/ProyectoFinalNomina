from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email debe ser proporcionado')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)



class CustomUser(AbstractUser):
    ROL_CHOICES = [
        ('admin', 'Administrador'),
        ('contable', 'Contable'),
        ('recursos_humanos', 'Recursos Humanos'),
    ]
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    rol = models.CharField(max_length=20, choices=ROL_CHOICES, default='contable')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email



class Empresa(models.Model):
    nit = models.CharField(max_length=255, primary_key=True)
    tipoContribuyente = models.CharField(max_length=255)
    digitoVerificacion = models.CharField(max_length=10)
    nombreEmpresa = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    email = models.EmailField()
    direccion = models.CharField(max_length=255)
    rut = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='logos/')

    def __str__(self):
        return self.nombreEmpresa
    
class Empleado(models.Model):
    identificacion = models.CharField(max_length=255, primary_key=True)
    primerNombre = models.CharField(max_length=255)
    segundoNombre = models.CharField(max_length=255, blank=True, null=True)
    primerApellido = models.CharField(max_length=255)
    segundoApellido = models.CharField(max_length=255, blank=True, null=True)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField()
    departamento = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    banco = models.CharField(max_length=255)
    numCuenta = models.CharField(max_length=255)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    estado = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.primerNombre} {self.primerApellido}'
    
    
class Cargo(models.Model):
    id = models.AutoField(primary_key=True)
    nombreCargo = models.CharField(max_length=255)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombreCargo
    
class Contrato(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    identificacion = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    tipoContrato = models.CharField(max_length=50)
    salario = models.FloatField()
    fechaInicio = models.DateField(blank=False)
    fechaFin = models.DateField(blank=False,  null=True)
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE)  
    nivelRiesgo = models.CharField(max_length=50)
    
    
class Nomina(models.Model):
    id = models.AutoField(primary_key=True)
    periodo = models.DateField()
    
    
class DetalleNomina(models.Model):
    nomina = models.ForeignKey('Nomina', on_delete=models.CASCADE, related_name='detalles')
    empleado = models.ForeignKey('Empleado', on_delete=models.CASCADE, related_name='detalles_nomina')
    total_ganado = models.FloatField()
    
    def __str__(self):
        return f"{self.empleado.nombre} - {self.nomina.periodo} - Total: {self.total_ganado}"



class Deducciones(models.Model):
    id = models.AutoField(primary_key=True)
    aporteSalud = models.IntegerField()
    aportePension = models.IntegerField()
    totalDeducciones = models.FloatField()
    nomina = models.ForeignKey(DetalleNomina, on_delete=models.CASCADE, related_name='deducciones')

    def __str__(self):
        return f"Deducciones {self.idDeducciones}"

class Novedades(models.Model):
    idNovedad = models.AutoField(primary_key=True)
    tipoNovedad = models.CharField(max_length=100)
    cantidadNovedad = models.IntegerField()
    totalNovedad = models.FloatField()
    nomina = models.ForeignKey(DetalleNomina, on_delete=models.CASCADE, related_name='novedades')

    def __str__(self):
        return f"Novedad {self.idNovedad} - Tipo {self.tipoNovedad}"
    
class Devengado(models.Model):
    id = models.AutoField(primary_key=True)  
    subsidio_transporte = models.IntegerField(null=True, blank=True) 
    total_devengado = models.FloatField()
    nomina = models.ForeignKey(DetalleNomina, on_delete=models.CASCADE)
    

class Parafiscales(models.Model):
    id = models.AutoField(primary_key=True)
    aporte_caja_compensacion = models.FloatField()
    aporte_icbf = models.FloatField()
    aporte_sena = models.FloatField()
    total_parafiscales = models.FloatField()
    nomina = models.ForeignKey(DetalleNomina, on_delete=models.CASCADE)
    


class HorasExtras(models.Model):
    id = models.AutoField(primary_key=True)
    cantidadHoras = models.IntegerField(default=0)
    total = models.FloatField(default=0)
    tipoHorasExtra = models.CharField(max_length=255)
    nomina = models.ForeignKey(DetalleNomina, on_delete=models.CASCADE)


