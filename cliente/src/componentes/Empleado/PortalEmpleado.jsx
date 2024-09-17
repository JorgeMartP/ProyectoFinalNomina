import React, { useState } from "react";
import {
  Avatar,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Select,
  SelectSection,
  SelectItem,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

const PortalEmpleado = () => {
  const customStyles = `
  .bg-primary { background-color: #176fb2; }
  .text-primary { color: #176fb2; }
  .border-primary { border-color: #176fb2; }
  .hover:bg-primary:hover { background-color: #4ca7e4; }
  .bg-secondary { background-color: #144c78; }
  .text-secondary { color: #144c78; }
  .hover:bg-secondary:hover { background-color: #176fb2; }
`;
  const [requestType, setRequestType] = useState("");
  const handleSubmit = (event) => {};
  return (
    <div className=" p-10 bg-gray-50">
      <style>{customStyles}</style>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-secondary">
          Portal de Empleados
        </h1>
        <div className="flex items-center space-x-4">
          <Avatar showFallback src="https://images.unsplash.com/broken" />
          <div>
            <p className="font-medium text-secondary">Juan Pérez</p>
            <p className="text-sm text-primary">Desarrollador</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="desprendibles" className="space-y-4">
        <Tab
          key="desprendibles"
          title="Desprendibles de Pago"
          className="bg-white border-b border-gray-200"
        >
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-secondary text-white">
              <p>Desprendibles de Pago</p>
            </CardHeader>
            <CardBody className="pt-6">
              <p className="text-black-300 pb-6">
                Descarga tus desprendibles de pago mensuales
              </p>
              <div className="space-y-4">
                {[
                  { month: "Junio 2023", date: "30/06/2023" },
                  { month: "Mayo 2023", date: "31/05/2023" },
                  { month: "Abril 2023", date: "30/04/2023" },
                  { month: "Marzo 2023", date: "31/03/2023" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium text-secondary">
                          {item.month}
                        </p>
                        <p className="text-sm text-primary">
                          Fecha de pago: {item.date}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-primary text-white hover:bg-blue-current"
                    >
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab value="desprendibles" key="solicitudes" title="Solicitudes a RRHH">
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-secondary text-white">
              <h1>Solicitudes a Recursos Humanos</h1>
              
            </CardHeader>
            <CardBody className="pt-6">
              <p className="text-black-300 pb-6">
                Envía tus solicitudes al departamento de RRHH
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Select
                  onValueChange={setRequestType}
                  placeholder="Tipo de solicitud"
                >
                  <SelectItem value="vacaciones">
                    Solicitud de vacaciones
                  </SelectItem>
                  <SelectItem value="certificado">
                    Certificado laboral
                  </SelectItem>
                  <SelectItem value="cambio-datos">
                    Cambio de datos personales
                  </SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </Select>
                {requestType === "vacaciones" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      placeholder="Fecha de inicio"
                      className="border-primary"
                    />
                    <Input
                      type="date"
                      placeholder="Fecha de fin"
                      className="border-primary"
                    />
                  </div>
                )}
                <Textarea
                  placeholder="Detalles de la solicitud"
                  rows={4}
                  className="border-primary"
                />
                <Input type="file" className="border-primary" />
              </form>
            </CardBody>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-blue-current"
              >
                Enviar Solicitud
              </Button>
            </CardFooter>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PortalEmpleado;
