import {React, useState } from "react";
import axios from "axios";

const columns = [
  {name: "NAME", uid: "name"},
  {name: "ROLE", uid: "role"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
  {name: "Usuarios", uid: "usuario"}
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

const usuarios = () =>{
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/empleado/empleado/');
        setUsers(res.data);
      } catch (error) {
        console.error('Error al Cargar Empleados:', error);
      }
    };

    cargarUsuarios();
  }, []);
  return users
}

const users = usuarios


export {columns, users, statusOptions};
