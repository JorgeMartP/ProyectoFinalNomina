import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectSection,
  SelectItem,
  DatePicker,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { capitalize } from "./utils";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";

const columns = [
  { name: "DOCUMENTO", uid: "documento", sortable: true },
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "SALARIO", uid: "salarioBasico", sortable: true },
  { name: "CORREO", uid: "correo", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "documento",
  "nombre",
  "salarioBasico",
  "actions",
];
function TableEmpleado() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/empleado/");
        setUsers(res.data);
      } catch (error) {
        console.error("Error al Cargar Empleados:", error);
      }
    };
    cargarUsuarios();
  }, []);
  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();
  const [cambiar, setCambiar] = useState("info");
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "documento",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((columns) =>
      Array.from(visibleColumns).includes(columns.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      const lowercaseFilter = filterValue.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.nombre.toLowerCase().includes(lowercaseFilter) ||
          user.correo.toLowerCase().includes(lowercaseFilter)
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const [documento, setDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [pNombre, setPNombre] = useState('');
  const [sNombre, setSNombre] = useState('');
  const [pApellido, setPApellido] = useState('');
  const [sApellido, setSApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [salario, setSalario] = useState('');
  const [cargo, setCargo] = useState('');
  const [tipoContrato, setTipoContrato] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null); // Usar `null` o `new Date()` según el componente DatePicker
  const [fechaFinal, setFechaFinal] = useState(null);
  const [nivelRiesgo, setNivelRiesgo] = useState('');
  const [banco, setBanco] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [numCuenta, setNumCuenta] = useState('');
  const handleEditClick = (item) => {
    setSelectedUser(item);
    console.log(item);
    onOpenModal2(); // Abre el modal
  };

  const handleEnvClick = async () => {
    // Convertir las fechas a formato ISO
    const fechaInicioISO = fechaInicio ? new Date(fechaInicio).toISOString().split('T')[0] : null;
    const fechaFinalISO = fechaFinal ? new Date(fechaFinal).toISOString().split('T')[0] : null;

    // Construir el objeto con el formato requerido
    const datos = {
      empleado: {
        identificacion: documento,
        primerNombre: pNombre,
        segundoNombre: sNombre,
        primerApellido: pApellido,
        segundoApellido: sApellido,
        telefono,
        correo,
        departamento,
        ciudad,
        direccion,
        banco,
        numCuenta,
        empresa: documento, // Suponiendo que 'empresa' es igual a 'documento'
        estado: 'Activo' // Puedes ajustar esto si es necesario
      },
      contrato: {
        id: documento, // Suponiendo que 'id' es igual a 'documento'
        tipoContrato,
        salario: parseFloat(salario), // Asegúrate de que 'salario' sea un número
        fechaInicio: fechaInicioISO,
        fechaFin: fechaFinalISO,
        cargo: 1, 
        nivelRiesgo,
        identificacion: 123456789
      }
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/empleado', datos);

      // Maneja la respuesta del servidor aquí si es necesario
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      // Maneja el error aquí si es necesario
      console.error('Error al enviar los datos:', error);
    }
  };
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "nombre":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.correo}
            name={cellValue}
          >
            {user.correo}
          </User>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <button
                className="text-lg cursor-pointer text-cyan-600 active:opacity-50"
                onClick={onOpenModal1}
              >
                <EyeIcon />
              </button>
            </Tooltip>
            <Tooltip content="Edit user">
              <button
                className="text-lg cursor-pointer text-cyan-600 active:opacity-50"
                onClick={() => handleEditClick(user)}
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg cursor-pointer text-danger active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);
  const cambiarUsuario = (tab) => {
    setCambiar(tab);
  };

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              ></DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              onPress={onOpenModal1}
              endContent={<PlusIcon />}
            >
              Nuevo Empleado
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            Total {users.length} Empleado
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-3 py-3">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(columns) => (
            <TableColumn
              key={columns.uid}
              align={columns.uid === "actions" ? "center" : "start"}
              allowsSorting={columns.sortable}
            >
              {columns.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.documento}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={isOpenModal1}
        size="4xl"
        onOpenChange={onCloseModal1}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Empleado
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full">
                  <Tabs selectedKey={cambiar} aria-label="Disabled Options">
                    <Tab key="info" title="Informacion Basica">
                      <Card>
                        <CardBody>
                          <h1>Información Basica</h1>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="number"
                              label="N° Documento"
                              value={documento}
                              onValueChange={setDocumento}
                              labelPlacement="outside"
                              isRequired
                            />
                            <Select
                              isRequired
                              label="Tipo Documento"
                              value={tipoDocumento}
                              onValueChange={setTipoDocumento}
                              placeholder="Seleccione el tipo de Documento"
                              labelPlacement="outside"
                              className="max-w-xl"
                            >
                              <SelectItem>CC</SelectItem>
                              <SelectItem>TI</SelectItem>
                              <SelectItem>CE</SelectItem>
                              <SelectItem>PT</SelectItem>
                            </Select>
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="text"
                              label="1° Nombre"
                              value={pNombre}
                              onValueChange={setPNombre}
                              labelPlacement="outside"
                              isInvalid={false}
                              errorMessage="Por favor Digite un Nombre Valido"
                              isRequired
                            />
                            <Input
                              type="text"
                              label="2° Nombre"
                              value={sNombre}
                              onValueChange={setSNombre}
                              labelPlacement="outside"
                              isInvalid={false}
                              errorMessage="Por favor Digite un Apellido Valido"
                            />
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="text"
                              label="1° Apellido"
                              onValueChange={setPApellido}
                              labelPlacement="outside"
                              value={pApellido}
                              isInvalid={false}
                              errorMessage="Por favor Digite un Nombre Valido"
                              isRequired
                            />
                            <Input
                              type="text"
                              label="2° Apellido"
                              value={sApellido}
                              onValueChange={setSApellido}
                              labelPlacement="outside"
                              isInvalid={false}
                              errorMessage="Por favor Digite un Apellido Valido"
                            />
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="email"
                              label="Correo"
                              labelPlacement="outside"
                              value={correo}
                              onValueChange={setCorreo}
                              isInvalid={false}
                              errorMessage="Por favor Digite un Correo Valido"
                              isRequired
                            />
                            <Input
                              type="number"
                              label="Telefono"
                              value={telefono}
                              onValueChange={setTelefono}
                              labelPlacement="outside"
                              isInvalid={false}
                              errorMessage="Por favor Digite un numero de Telefono Valido"
                              isRequired
                            />
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Select
                              isRequired
                              label="Departamento"
                              value={departamento}
                              onSelectionChange={setDepartamento}
                              labelPlacement="outside"
                              placeholder="Seleccione un departamento"
                              className="max-w-xl"
                            >
                              <SelectItem>Cundinamarca</SelectItem>
                              <SelectItem>Bogotá D.C</SelectItem>
                              <SelectItem>Antioquia</SelectItem>
                            </Select>
                            <Select
                              isRequired
                              label="Ciudad"
                              labelPlacement="outside"
                              value={ciudad}
                              onSelectionChange={setCiudad}
                              placeholder="Seleccione una ciudad"
                              className="max-w-xl"
                            >
                              <SelectItem>Bogotá</SelectItem>
                              <SelectItem>Medellin</SelectItem>
                              
                            </Select>
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="text"
                              label="Dirección"
                              value={direccion}
                              onValueChange={setDireccion}
                              labelPlacement="outside"
                              isInvalid={false}
                              errorMessage="Por favor Digite una Dirección Valida"
                              isRequired
                            />
                          </div>
                          <div>
                            <Button
                              color="primary"
                              onClick={() => cambiarUsuario("contra")}
                            >
                              Siguiente
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="contra" title="Información Contrato">
                      <Card>
                        <CardBody>
                          <h1>Información de Contrato</h1>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="number"
                              label="Salario"
                              value={salario}
                              onValueChange={setSalario}
                              placeholder="0.00"
                              labelPlacement="outside"
                              isRequired
                              startContent={
                                <div className="flex items-center pointer-events-none">
                                  <span className="text-default-400 text-small">
                                    $
                                  </span>
                                </div>
                              }
                            />
                            <Select
                              isRequired
                              label="Cargo"
                              value={cargo}
                              onSelectionChange={setCargo}
                              labelPlacement="outside"
                              placeholder="Seleccione un cargo"
                              className="max-w-xl"
                            >
                              <SelectItem>Programador</SelectItem>
                              <SelectItem>Contador</SelectItem>
                              
                            </Select>
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Select
                              isRequired
                              label="Tipo Contrato"
                              value={tipoContrato}
                              onSelectionChange={setTipoContrato}
                              labelPlacement="outside"
                              placeholder="Seleccione un Tipo de contrato"
                              className="max-w-xl"
                            >
                              <SelectItem>CC</SelectItem>
                              <SelectItem>TI</SelectItem>
                              <SelectItem>CE</SelectItem>
                              <SelectItem>PT</SelectItem>
                            </Select>
                            <DatePicker
                              label="Fecha de Ingreso"
                              labelPlacement="outside"
                              value={fechaInicio}
                              onChange={setFechaInicio}
                              isRequired
                              className="max-w-xl"
                            />
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <DatePicker
                              label="Fecha de Finalización"
                              labelPlacement="outside"
                              value={fechaFinal}
                              onChange={setFechaFinal}
                              className="max-w-xl"
                            />
                            <Select
                              isRequired
                              label="Nivel de Riesgo Laboral"
                              labelPlacement="outside"
                              value={nivelRiesgo}
                              onSelectionChange={setNivelRiesgo}
                              placeholder="Seleccione un Nivel de Riesgo"
                              className="max-w"
                            >
                              <SelectItem>Nivel I</SelectItem>
                              <SelectItem>Nivel II</SelectItem>
                              <SelectItem>Nivel III</SelectItem>
                              <SelectItem>Nivel IV</SelectItem>
                              <SelectItem>Nivel v</SelectItem>
                            </Select>
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            
                          </div>
                          <div>
                            <Button
                              color="primary"
                              onClick={() => cambiarUsuario("info")}
                            >
                              Volver
                            </Button>
                            <Button
                              color="primary"
                              onClick={() => cambiarUsuario("pago")}
                            >
                              Siguiente
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="pago" title="Información de Pago">
                      <Card>
                        <CardBody>
                          <h1>Información de Pago</h1>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Select
                              isRequired
                              label="Banco"
                              value={banco}
                              onSelectionChange={setBanco}
                              labelPlacement="outside"
                              placeholder="Seleccione un banco"
                              className="max-w-xl"
                            >
                              <SelectItem>Bancolombia</SelectItem>
                              <SelectItem>Davivienda</SelectItem>
                              <SelectItem>BBVA</SelectItem>
                              <SelectItem>Banco de Occidente</SelectItem>
                              <SelectItem>Banco de Bogotá</SelectItem>
                            </Select>
                            <Select
                              isRequired
                              label="Tipo de Cuenta"
                              labelPlacement="outside"
                              value={tipoCuenta}
                              onSelectionChange={setTipoCuenta}
                              placeholder="Seleccione un tipo de cuenta"
                              className="max-w-xl"
                            >
                              <SelectItem>Ahorro</SelectItem>
                              <SelectItem>Corriente</SelectItem>
                            </Select>
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="number"
                              label="Numero de Cuenta"
                              labelPlacement="outside"
                              value={numCuenta}
                              onValueChange={setNumCuenta}
                              isInvalid={false}
                              errorMessage="Por favor Digite un numero de cuenta Valida"
                              isRequired
                            />
                          </div>
                          <div>
                            <Button
                              color="primary"
                              onClick={() => cambiarUsuario("contra")}
                            >
                              Volver
                            </Button>
                            <Button
                              color="primary"
                              onClick={() => handleEnvClick()}
                            >
                              continuar
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenModal2}
        onOpenChange={onCloseModal2}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                {selectedUser && (
                  <>
                  <div>
                    <p>Documento: {selectedUser.documento}</p>
                    <p>Nombre: {selectedUser.nombre}</p>
                    <p>Correo: {selectedUser.correo}</p>
                    <p>Departamento: {selectedUser.departamento}</p>
                  </div>
              <ModalHeader className="flex flex-col gap-1">
                Actualizar Empleado
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full">
                  <Tabs selectedKey={cambiar} aria-label="Disabled Options">
                    <Tab key="info" title="Informacion Basica">
                      <Card>
                        <CardBody>
                          <h1>Información Basica</h1>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="number"
                              label="N° Documento"
                              value={documento}
                              onValueChange={setDocumento}
                              labelPlacement="outside"
                              isRequired
                            />
                            <Select
                              isRequired
                              label="Tipo Documento"
                              value={tipoDocumento}
                              onValueChange={setTipoDocumento}
                              placeholder="Seleccione el tipo de Documento"
                              labelPlacement="outside"
                              className="max-w-xl"
                            >
                              <SelectItem>CC</SelectItem>
                              <SelectItem>TI</SelectItem>
                              <SelectItem>CE</SelectItem>
                              <SelectItem>PT</SelectItem>
                            </Select>
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="text"
                              label="1° Nombre"
                              value={pNombre}
                              onValueChange={setPNombre}
                              labelPlacement="outside"
                              isInvalid={false}
                              errorMessage="Por favor Digite un Nombre Valido"
                              isRequired
                            />
                            <Input
                              type="text"
                              label="2° Nombre"
                              value={sNombre}
                              onValueChange={setSNombre}
                              labelPlacement="outside"
                              isInvalid={false}
                              errorMessage="Por favor Digite un Apellido Valido"
                            />
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="text"
                              label="1° Apellido"
                              onValueChange={setPApellido}
                              labelPlacement="outside"
                              value={pApellido}
                              isInvalid={false}
                              errorMessage="Por favor Digite un Nombre Valido"
                              isRequired
                            />
                            <Input
                              type="text"
                              label="2° Apellido"
                              value={sApellido}
                              onValueChange={setSApellido}
                              labelPlacement="outside"
                              isInvalid={false}
                              errorMessage="Por favor Digite un Apellido Valido"
                            />
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="email"
                              label="Correo"
                              labelPlacement="outside"
                              value={correo}
                              onValueChange={setCorreo}
                              isInvalid={false}
                              errorMessage="Por favor Digite un Correo Valido"
                              isRequired
                            />
                            <Input
                              type="number"
                              label="Telefono"
                              value={telefono}
                              onValueChange={setTelefono}
                              labelPlacement="outside"
                              isInvalid={false}
                              errorMessage="Por favor Digite un numero de Telefono Valido"
                              isRequired
                            />
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Select
                              isRequired
                              label="Departamento"
                              value={departamento}
                              onSelectionChange={setDepartamento}
                              labelPlacement="outside"
                              placeholder="Seleccione un departamento"
                              className="max-w-xl"
                            >
                              <SelectItem>Cundinamarca</SelectItem>
                              <SelectItem>Bogotá D.C</SelectItem>
                              <SelectItem>Antioquia</SelectItem>
                            </Select>
                            <Select
                              isRequired
                              label="Ciudad"
                              labelPlacement="outside"
                              value={ciudad}
                              onSelectionChange={setCiudad}
                              placeholder="Seleccione una ciudad"
                              className="max-w-xl"
                            >
                              <SelectItem>Bogotá</SelectItem>
                              <SelectItem>Medellin</SelectItem>
                              
                            </Select>
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="text"
                              label="Dirección"
                              value={direccion}
                              onValueChange={setDireccion}
                              labelPlacement="outside"
                              isInvalid={false}
                              errorMessage="Por favor Digite una Dirección Valida"
                              isRequired
                            />
                          </div>
                          <div>
                            <Button
                              color="primary"
                              onClick={() => cambiarUsuario("contra")}
                            >
                              Siguiente
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="contra" title="Información Contrato">
                      <Card>
                        <CardBody>
                          <h1>Información de Contrato</h1>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="number"
                              label="Salario"
                              value={salario}
                              onValueChange={setSalario}
                              placeholder="0.00"
                              labelPlacement="outside"
                              isRequired
                              startContent={
                                <div className="flex items-center pointer-events-none">
                                  <span className="text-default-400 text-small">
                                    $
                                  </span>
                                </div>
                              }
                            />
                            <Select
                              isRequired
                              label="Cargo"
                              value={cargo}
                              onSelectionChange={setCargo}
                              labelPlacement="outside"
                              placeholder="Seleccione un cargo"
                              className="max-w-xl"
                            >
                              <SelectItem>Programador</SelectItem>
                              <SelectItem>Contador</SelectItem>
                              
                            </Select>
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Select
                              isRequired
                              label="Tipo Contrato"
                              value={tipoContrato}
                              onSelectionChange={setTipoContrato}
                              labelPlacement="outside"
                              placeholder="Seleccione un Tipo de contrato"
                              className="max-w-xl"
                            >
                              <SelectItem>CC</SelectItem>
                              <SelectItem>TI</SelectItem>
                              <SelectItem>CE</SelectItem>
                              <SelectItem>PT</SelectItem>
                            </Select>
                            <DatePicker
                              label="Fecha de Ingreso"
                              labelPlacement="outside"
                              value={fechaInicio}
                              onChange={setFechaInicio}
                              isRequired
                              className="max-w-xl"
                            />
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <DatePicker
                              label="Fecha de Finalización"
                              labelPlacement="outside"
                              value={fechaFinal}
                              onChange={setFechaFinal}
                              className="max-w-xl"
                            />
                            <Select
                              isRequired
                              label="Nivel de Riesgo Laboral"
                              labelPlacement="outside"
                              value={nivelRiesgo}
                              onSelectionChange={setNivelRiesgo}
                              placeholder="Seleccione un Nivel de Riesgo"
                              className="max-w"
                            >
                              <SelectItem>Nivel I</SelectItem>
                              <SelectItem>Nivel II</SelectItem>
                              <SelectItem>Nivel III</SelectItem>
                              <SelectItem>Nivel IV</SelectItem>
                              <SelectItem>Nivel v</SelectItem>
                            </Select>
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            
                          </div>
                          <div>
                            <Button
                              color="primary"
                              onClick={() => cambiarUsuario("info")}
                            >
                              Volver
                            </Button>
                            <Button
                              color="primary"
                              onClick={() => cambiarUsuario("pago")}
                            >
                              Siguiente
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="pago" title="Información de Pago">
                      <Card>
                        <CardBody>
                          <h1>Información de Pago</h1>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Select
                              isRequired
                              label="Banco"
                              value={banco}
                              onSelectionChange={setBanco}
                              labelPlacement="outside"
                              placeholder="Seleccione un banco"
                              className="max-w-xl"
                            >
                              <SelectItem>Bancolombia</SelectItem>
                              <SelectItem>Davivienda</SelectItem>
                              <SelectItem>BBVA</SelectItem>
                              <SelectItem>Banco de Occidente</SelectItem>
                              <SelectItem>Banco de Bogotá</SelectItem>
                            </Select>
                            <Select
                              isRequired
                              label="Tipo de Cuenta"
                              labelPlacement="outside"
                              value={tipoCuenta}
                              onSelectionChange={setTipoCuenta}
                              placeholder="Seleccione un tipo de cuenta"
                              className="max-w-xl"
                            >
                              <SelectItem>Ahorro</SelectItem>
                              <SelectItem>Corriente</SelectItem>
                            </Select>
                          </div>
                          <div className="flex flex-wrap w-full gap-4 mb-4 md:flex-nowrap">
                            <Input
                              type="number"
                              label="Numero de Cuenta"
                              labelPlacement="outside"
                              value={numCuenta}
                              onValueChange={setNumCuenta}
                              isInvalid={false}
                              errorMessage="Por favor Digite un numero de cuenta Valida"
                              isRequired
                            />
                          </div>
                          <div>
                            <Button
                              color="primary"
                              onClick={() => cambiarUsuario("contra")}
                            >
                              Volver
                            </Button>
                            <Button
                              color="primary"
                              onClick={() => handleEnvClick()}
                            >
                              continuar
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              
            </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default TableEmpleado;
