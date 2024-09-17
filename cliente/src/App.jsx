
import InicioSesion from "./componentes/InicioSesion";
import Navegacion from "./componentes/Navegacion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./componentes/Footer";
import Home from "./componentes/Home";
import "./App.css";
import Empleado from "./componentes/GestionEmpleado/Empleado";
import Nomina from "./componentes/GestionNomina/Nomina";
import NominaEmpleados from "./componentes/GestionNomina/NominaEmpleados";
import PortalEmpleado from "./componentes/Empleado/PortalEmpleado";
import PerfilUsuario from "./componentes/Empleado/PerfilUsuario";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";


function App() {

  return (
    <>
      <div className="app-container flex flex-col min-h-screen">
      <BrowserRouter>
        <Navegacion></Navegacion>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login/empleado" element={<InicioSesion></InicioSesion>} />
          <Route path="/login/empresa" element={<InicioSesion></InicioSesion>} />
          <Route path="/empleado" element={<Empleado></Empleado>}></Route>
          <Route path="/nomina" element={<Nomina></Nomina>}></Route>
          <Route path="/nomina/empleados" element={<NominaEmpleados></NominaEmpleados>}></Route>
          <Route path="/portal" element={<PortalEmpleado></PortalEmpleado>}></Route>
          <Route path="/perfil" element={<PerfilUsuario></PerfilUsuario>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
      </div>
    </>
  )
}

export default App
