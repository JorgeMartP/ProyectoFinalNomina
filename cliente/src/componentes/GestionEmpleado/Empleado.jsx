import { useState } from "react";
import TableEmpleado from "./TablesEmpleado";
import { Link, useLocation } from "react-router-dom";

function Empleado() {
  return (
    <>
      <div className="pt-24">
        <h1 className="text-3xl text-center pt-10">Empleados</h1>
        <div className="container pt-10 px-20">
          <TableEmpleado></TableEmpleado>
        </div>
      </div>
    </>
  );
}

export default Empleado;
