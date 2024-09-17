import {  useState, useEffect } from "react";
import "../assets/CSS/InicioSesion.css";
import EmpleadoImg from "../assets/img/empleado.svg";
import ContableImg from "../assets/img/contable.svg";
import { Input, Link, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import axios from "axios";

function InicioSesion() {
  const [currentComp, setCurrentComp] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [correoConta, setCorreoConta] = useState("");
  const [passwordConta, setPasswordConta] = useState("");
  const [valid, setValid] = useState({ correo: true, password: true });
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleCorreoChange = (value) => {
    setCorreo(value);
    const isValidCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setValid((prev) => ({ ...prev, correo: isValidCorreo }));
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
    const isValidPassword = value.length >= 6; 
    setValid((prev) => ({ ...prev, password: isValidPassword }));
  };
  const handleSubmit = async ()=>{
    
    if (correo != "" && password != ""){
      const datos={
        correo,
        password,
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', datos);
        console.log('Respuesta del servidor:', response.data);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }else{
      setValid((prev) => ({ ...prev, password: false, correo: false  }));
    }
  }
  const handleCorreoContChange = (value) => {
    setCorreoConta(value);
    const isValidCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setValid((prev) => ({ ...prev, correo: isValidCorreo }));
  };
  
  const handlePasswordContChange = (value) => {
    setPasswordConta(value);
    const isValidPassword = value.length >= 6; 
    setValid((prev) => ({ ...prev, password: isValidPassword }));
  };
  
  const handleSubmitConta = async ()=>{
    
    if (correo != "" && password != ""){
      const datos={
        correoConta,
        passwordConta,
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', datos);
        console.log('Respuesta del servidor:', response.data);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }else{
      setValid(false)
    }
  }
  useEffect(() => {
    const componen = () => {
      switch (location.pathname) {
        case "/login/empleado":
          return (
            <>
              <div className="flex max-w-full max-h-screen flex-nowrap">
                <div className="flex flex-col items-center w-2/4 h-screen pt-24 ">
                  <h1 className="font-sans text-3xl font-bold text-blue-medium">
                    Bienvenido al Portal de Empleados
                  </h1>
                  <img
                    src={EmpleadoImg}
                    alt="logo"
                    height={"350px"}
                    width={"350px"}
                  />
                  <p className="pl-24">
                    Por favor, ingresa tus credenciales para acceder a tu cuenta
                    y gestionar tus solicitudes y desprendibles de pago.
                  </p>
                </div>
                <div className="flex items-center justify-center w-2/4 h-screen bg-blue-medium">
                  <form className="flex flex-col w-4/6 gap-4 p-10 bg-white shadow-xl h-96 rounded-xl">
                    <h2 className="pb-5 font-sans text-2xl font-bold text-center text-blue-medium">
                      Inicio Sesión
                    </h2>
                    <div>
                      <Input
                        isRequired
                        type="email"
                        label="Correo"
                        variant="bordered"
                        placeholder="Ingrese su Correo"
                        isInvalid={!valid.correo}
                        errorMessage={"Ingrese un correo valido"}
                        value={correo}
                        onValueChange={handleCorreoChange}
                        className="max-w-xl"
                      />
                    </div>
                    <div>
                      <Input
                        isRequired
                        label="Contraseña"
                        variant="bordered"
                        value={password}
                        onValueChange={handlePasswordChange}
                        isInvalid={!valid.password}
                        errorMessage={"Ingrese una contraseña valida"}
                        placeholder="Ingrese su Contraseña"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label="toggle password visibility"
                          >
                            {isVisible ? (
                              <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
                            ) : (
                              <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="max-w-xl "
                      />
                    </div>
                    <Link href="#" underline="active">
                      ¿Olvido la contraseña?
                    </Link>
                    <div className="flex items-center justify-center">
                      <Button color="primary" onClick={handleSubmit}>Iniciar Sesión</Button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          );
        case "/login/empresa":
          return (
            <>
              <div className="flex max-w-full max-h-screen flex-nowrap">
                <div className="flex flex-col items-center w-2/4 h-screen pt-24">
                  <h1 className="font-sans text-3xl font-bold text-blue-medium">
                    Bienvenido al Portal de Nómina
                  </h1>
                  <img
                    src={ContableImg}
                    alt="logo"
                    height={"350px"}
                    width={"350px"}
                  />
                  <p className="pl-24">
                    Por favor, ingresa tus credenciales para acceder a tu cuenta
                    y gestionar la información de nómina, incluyendo los
                    reportes de pagos, deducciones y más.
                  </p>
                </div>
                <div className="flex items-center justify-center w-2/4 h-screen bg-blue-medium">
                  <form className="flex flex-col w-4/6 gap-4 p-10 bg-white shadow-xl h-96 rounded-xl">
                    <h2 className="pb-5 font-sans text-2xl font-bold text-center text-blue-medium">
                      Inicio Sesión
                    </h2>
                    <div>
                      <Input
                        isRequired
                        type="email"
                        label="Correo"
                        value={correoConta}
                        onValueChange={ handleCorreoContChange}
                        isInvalid={!valid.correo}
                        variant="bordered"
                        placeholder="Ingrese su Correo"
                        className="max-w-xl"
                      />
                    </div>
                    <div>
                      <Input
                        isRequired
                        label="Contraseña"
                        variant="bordered"
                        value={passwordConta}
                        onValueChange={handlePasswordContChange}
                        isInvalid={!valid.password}
                        placeholder="Ingrese su Contraseña"
                        
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label="toggle password visibility"
                          >
                            {isVisible ? (
                              <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
                            ) : (
                              <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="max-w-xl "
                      />
                    </div>
                    <Link href="#" underline="active">
                      ¿Olvido la contraseña?
                    </Link>
                    <div className="flex items-center justify-center">
                      <Button color="primary" onClick={handleSubmitConta}>Iniciar Sesión</Button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          );
        default:
          return null;
      }
    };

    setCurrentComp(componen);
  }, [location.pathname, isVisible]);
  return <div>{currentComp}</div>;
}
export default InicioSesion;
