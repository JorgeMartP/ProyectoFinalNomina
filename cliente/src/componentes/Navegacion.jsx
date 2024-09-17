import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import homeIcon from "../assets/img/home.svg";
import logoEmp from "../assets/img/Payroll.png";
import iconHamburger from "../assets/img/icon-hamburger.svg";
import search from "../assets/img/search.svg";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

function Navegacion() {
  const location = useLocation();
  const [currentComp, setCurrentComp] = useState();
  const [menuActive, setMenuActive] = useState(false);

  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };
  const [activeLink, setActiveLink] = useState("Seguridad Social");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  useEffect(() => {
    const componen = () => {
      switch (location.pathname) {
        case "/":
          return (
            <>
              <Navbar
                isBordered
                isBlurred={false}
                className="bg-bluecurrent fixed"
              >
                <NavbarBrand>
                  <div className="imagen">
                    <div className="logo">
                      <a href="#">
                        <img
                          src={logoEmp}
                          alt="logo"
                          width={"90px"}
                          height={"80px"}
                        />
                      </a>
                    </div>
                  </div>
                </NavbarBrand>
                <NavbarItem className="hidden lg:flex">
                  <Button as={Link} className="bg-white " href="/login/empresa">
                    Empresa
                  </Button>
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                  <Button
                    as={Link}
                    className="bg-white "
                    href="/login/empleado"
                  >
                    Empleado
                  </Button>
                </NavbarItem>
              </Navbar>
            </>
          );
        case "/empleado":
          return (
            <>
              <Navbar isBordered className="bg-bluecurrent fixed">
                <NavbarBrand className="mr-4 ">
                  <div className="imagen">
                    <div className="logo">
                      <a href="#">
                        <img
                          src={logoEmp}
                          alt="logo"
                          width={"90px"}
                          height={"80px"}
                        />
                      </a>
                    </div>
                  </div>
                </NavbarBrand>
                <NavbarContent
                  className="hidden sm:flex gap-4"
                  justify="center"
                >
                  <NavbarItem>
                    <Link className="text-white" href="#">
                      Gestión Empleado
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="#" className="text-white">
                      Seguridad Social
                    </Link>
                  </NavbarItem>
                  
                </NavbarContent>
                <NavbarContent as="div" className="items-center" justify="end">
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="secondary"
                        name="Jason Hughes"
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Iniciaste Como:</p>
                        <p className="font-semibold">zoey@example.com</p>
                      </DropdownItem>
                      <DropdownItem key="settings">
                        <Link href="/perfil" className="text-[#000000]">
                          Perfil
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="logout" color="danger">
                        <Link href="/" className="text-[#E11114]">
                          Cerrar Sesión
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarContent>
              </Navbar>
            </>
          );
        case "/nomina":
          return (
            <>
              <Navbar isBordered className="bg-bluecurrent  fixed">
                <NavbarBrand className="mr-4 ">
                  <div className="imagen">
                    <div className="logo">
                      <a href="#">
                        <img
                          src={logoEmp}
                          alt="logo"
                          width={"90px"}
                          height={"80px"}
                        />
                      </a>
                    </div>
                  </div>
                </NavbarBrand>
                <NavbarContent
                  className="hidden sm:flex gap-4 "
                  justify="center"
                >
                  <NavbarItem>
                    <Link className="text-white" href="#">
                      Gestión Empleado
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="#" className="text-white">
                      Seguridad Social
                    </Link>
                  </NavbarItem>
                </NavbarContent>
                <NavbarContent as="div" className="items-center " justify="end">
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="secondary"
                        name="Jason Hughes"
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Iniciaste Como:</p>
                        <p className="font-semibold">zoey@example.com</p>
                      </DropdownItem>
                      <DropdownItem key="settings">
                        <Link href="/perfil" className="text-[#000000]">
                          Perfil
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="logout" color="danger">
                        <Link href="/" className="text-[#E11114]">
                          Cerrar Sesión
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarContent>
              </Navbar>
            </>
          );
        case "/nomina/empleados":
          return (
            <>
              <Navbar isBordered className="bg-bluecurrent fixed">
                <NavbarBrand className="mr-4 ">
                  <div className="imagen">
                    <div className="logo">
                      <a href="#">
                        <img
                          src={logoEmp}
                          alt="logo"
                          width={"90px"}
                          height={"80px"}
                        />
                      </a>
                    </div>
                  </div>
                </NavbarBrand>
                <NavbarContent
                  className="hidden sm:flex gap-4 "
                  justify="center"
                >
                  <NavbarItem>
                    <Link className="text-white" href="#">
                      Gestión Empleado
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="#" className="text-white">
                      Seguridad Social
                    </Link>
                  </NavbarItem>
                </NavbarContent>
                <NavbarContent as="div" className="items-center " justify="end">
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="secondary"
                        name="Jason Hughes"
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Iniciaste Como:</p>
                        <p className="font-semibold">zoey@example.com</p>
                      </DropdownItem>
                      <DropdownItem key="settings">
                        <Link href="/perfil" className="text-[#000000]">
                          Perfil
                        </Link>
                      </DropdownItem>
                      <DropdownItem key="logout" color="danger">
                        <Link href="/" className="text-[#E11114]">
                          Cerrar Sesión
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarContent>
              </Navbar>
            </>
          );
        case "/crear-empleado":
          return (
            <>
              <div class="search">
                <input
                  type="search"
                  class="search__input"
                  placeholder="Buscar"
                />
                <button type="submit" class="search__button">
                  <svg
                    class="search__icon"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="imagen">
                <label>Nombre Usuario</label>
                <div className="logo-imagen">
                  <a href="#">
                    <img src="../img/deku.jpg" alt="perfil" />
                  </a>
                </div>
              </div>
            </>
          );
        default:
          return null;
      }
    };

    setCurrentComp(componen);
  }, [location.pathname]);

  return <header>{currentComp}</header>;
}

export default Navegacion;
