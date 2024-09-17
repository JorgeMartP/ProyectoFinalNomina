import { useEffect, useState, React, useMemo, useCallback } from "react";
import axios from "axios";
import TableNomina from "../TableNomina";
import {
  Card,
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
  useDisclosure,
  Chip,
  User,
  Pagination,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Breadcrumbs,
  BreadcrumbItem,
  Tooltip
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
  { name: "PERIODO", uid: "documento", sortable: true },
  { name: "TOTAL DEVENGADO", uid: "nombre", sortable: true },
  { name: "TOTAL DEDUCCIONES", uid: "salarioBasico", sortable: true },
  { name: "TOTAL NOMINA", uid: "correo", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = [
  "Periodo",
  "Total devengado",
  "Total Deducciones",
  "Total Nomina"
];

const Nomina = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/nomina/");
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

  const handleEditClick = (item) => {
    setSelectedUser(item);
    console.log(item);
    onOpenModal2(); // Abre el modal
  };
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
        return(
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
        return(
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
        )
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
  const cambiarUsuario = (tab) => {
    setCambiar(tab);
  };

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
            <Button as={Link} color="primary" href="/nomina/empleados">
              Nueva Nomina
            </Button>
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
      <main className="flex-1 p-8 pt-24 overflow-auto">
        <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-t-4 border-t-[#4ca7e4]">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <p className="text-sm font-medium">Total Empleados</p>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold text-[#144c78]">18</div>
            </CardBody>
          </Card>
          <Card className="border-t-4 border-t-[#4ca7e4]">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <p className="text-sm font-medium">Nómina Total</p>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold text-[#144c78]">
                $150.000.000
              </div>
            </CardBody>
          </Card>
          <Card className="border-t-4 border-t-[#4ca7e4]">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <p className="text-sm font-medium">Próximo Pago</p>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold text-[#144c78]">
                15/06/2023
              </div>
            </CardBody>
          </Card>
          <Card className="border-t-4 border-t-[#4ca7e4]">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <p className="text-sm font-medium">Informes Pendientes</p>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold text-[#144c78]">3</div>
            </CardBody>
          </Card>
        </div>
        <Card className="mb-8">
          <div className="p-8 pr-24 ">
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
        </Card>
        <div className="">
          <Card>
            <CardHeader className="bg-[#176fb2] text-white">
              <p>Calendario de Pagos</p>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-2 bg-[#f0f7fd] rounded">
                  <div>
                    <p className="font-medium text-[#144c78]">Pago Quincenal</p>
                    <p className="text-sm text-[#176fb2]">15/06/2023</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#176fb2] text-[#176fb2] hover:bg-[#4ca7e4] hover:text-white"
                  >
                    Ver Detalles
                  </Button>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#f0f7fd] rounded">
                  <div>
                    <p className="font-medium text-[#144c78]">Pago Mensual</p>
                    <p className="text-sm text-[#176fb2]">30/06/2023</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#176fb2] text-[#176fb2] hover:bg-[#4ca7e4] hover:text-white"
                  >
                    Ver Detalles
                  </Button>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#f0f7fd] rounded">
                  <div>
                    <p className="font-medium text-[#144c78]">
                      Bono Trimestral
                    </p>
                    <p className="text-sm text-[#176fb2]">01/07/2023</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#176fb2] text-[#176fb2] hover:bg-[#4ca7e4] hover:text-white"
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Nomina;
