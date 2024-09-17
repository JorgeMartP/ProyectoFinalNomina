import { useEffect, useState, React, useMemo, useCallback } from "react";
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
  Breadcrumbs,
  BreadcrumbItem,
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
  "Horas Extra",
  "Novedades",
  "actions",
];

const NominaEmpleados = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/empleado/empleado/");
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
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "documento",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((columns) =>
      Array.from(visibleColumns).includes(columns.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
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
  const handleSubmit = async () => {
    const datos = {

    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/empleado', datos);

      // Maneja la respuesta del servidor aquí si es necesario
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      // Maneja el error aquí si es necesario
      console.error('Error al enviar los datos:', error);
    }
  }

  console.log(cambiar);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleClickNominaEmp = (item) => {
    setSelectedUser(item);
    console.log(item);
    onOpenModal2(); // Abre el modal
  };

  const renderCell = useCallback((user, columnKey) => {
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
      case "Novedades":
        return (
          <>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Agregar Novedad">
                <button
                  className="text-lg cursor-pointer text-cyan-600 active:opacity-50"
                  onClick={onOpenModal1}
                >
                  Agregar
                </button>
              </Tooltip>
            </div>
          </>
        );
      case "Horas Extra":
        return (
          <>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Agregar Novedad">
                <button
                  className="text-lg cursor-pointer text-cyan-600 active:opacity-50"
                  onClick={handleClickNominaEmp}
                >
                  Agregar
                </button>
              </Tooltip>
            </div>
          </>
        )
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);


  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
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
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            Total {users.length} Nominas Realizadas
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

  const bottomContent = useMemo(() => {
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
      <div className="p-8 pt-24 pr-24">
        <div className="p-8">
          <Breadcrumbs>
            <BreadcrumbItem href="/nomina">Historico Nomina</BreadcrumbItem>
            <BreadcrumbItem>Nomina</BreadcrumbItem>
          </Breadcrumbs>
        </div>
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
      </div>
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
                Horas Extra
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full">
                  <Input
                    type="number"
                    label="Hora Extra Diurna"
                    value={horaED}
                    onValueChange={setHoraED}
                    labelPlacement="outside"
                  />
                  <Input
                    type="number"
                    label="Hora Extra Diurna"
                    value={horaED}
                    onValueChange={setHoraED}
                    labelPlacement="outside"
                  />
                  <Input
                    type="number"
                    label="Hora Extra Diurna"
                    value={horaED}
                    onValueChange={setHoraED}
                    labelPlacement="outside"
                  />
                  <Input
                    type="number"
                    label="Hora Extra Diurna"
                    value={horaED}
                    onValueChange={setHoraED}
                    labelPlacement="outside"
                  />
                  <Button
                    color="primary"
                    onClick={() => handleSubmit("info")}
                  >
                    Agregar
                  </Button>
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
                      Novedades
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex flex-col w-full">
                        <Select
                          isRequired
                          label="Tipo de Cuenta"
                          labelPlacement="outside"
                          value={tipoNovedad}
                          onSelectionChange={setTipoNovedad}
                          placeholder="Seleccione una novedad"
                          className="max-w-xl"
                        >
                          <SelectItem>Devengado</SelectItem>
                          <SelectItem>Deducción</SelectItem>
                        </Select>
                      </div>
                    </ModalBody>

                  </>
                )}
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NominaEmpleados;
