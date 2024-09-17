import { React, useState } from "react";
import { EyeFilledIcon } from "../EyeFilledIcon";
import { EyeSlashFilledIcon } from "../EyeSlashFilledIcon";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
} from "@nextui-org/react";

const PerfilUsuario = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <div className="pt-10 pb-10">
        <Card className=" mx-auto w-3/6 mt-10 px-4 pb-10">
          <h1 className="text-3xl pt-10 pl-10 font-bold text-[#144c78]">
            Actualizar Perfil
          </h1>
          <form className="h-full p-10 flex flex-col gap-4">
            <div>
              <Input
                isRequired
                type="text"
                label="Nombre"
                variant="bordered"
                placeholder="Ingrese su Nombre"
                className="max-w-xl"
              />
            </div>
            <div>
              <Input
                isRequired
                type="email"
                label="Correo"
                variant="bordered"
                placeholder="Ingrese su Correo"
                className="max-w-xl"
              />
            </div>
            <div className="mt-8 mb-6 flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-[#144c78] mb-4">
                Cambiar Contraseña
              </h2>
              <div>
                <Input
                  label="Contraseña Actual"
                  variant="bordered"
                  placeholder="Ingrese su Contraseña"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xl "
                />
              </div>
              <div>
                <Input
                  label="Contraseña Nueva"
                  variant="bordered"
                  placeholder="Ingrese su Contraseña"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xl "
                />
              </div>
              <div>
                <Input
                  label="Confirmar Contraseña"
                  variant="bordered"
                  placeholder="Ingrese su Contraseña"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xl "
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#176fb2] hover:bg-[#144c78] text-white font-bold py-2 px-4 rounded-md transition-colors mt-4"
            >
              Actualizar Perfil
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default PerfilUsuario;
