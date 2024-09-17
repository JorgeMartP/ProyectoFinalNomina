import { useState, useEffect } from "react";
import axios from "axios";

const TableNomina = ({ isOpen, onClose })=>{
    const [empleados, setEmpleados] = useState([]);
    const [documento, setDocumento] = useState('');
    const url = 'http://127.0.0.1:8000/empleado/empleado/';
    const [resultados, setResultados] = useState();
  const getData = async () => {
    await axios.get(url).then((response) => {
      const data = response.data;
      console.log(data);
      setEmpleados(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  
    return(
        <>
        <div id="modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-content">
              <span id="close-modal-btn" onClick={onClose}>&times;</span>
              <h1>Lista Empleados</h1>
              <div className="container-table-modal">
              </div>
              
            </div>
        </div>
        </>
    )
}

export default TableNomina