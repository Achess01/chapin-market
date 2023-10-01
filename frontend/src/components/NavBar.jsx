import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import { checkRoles } from 'src/routes/PrivateRoutes';
import { ADMIN, CASHIER, INVENTORY, STORE } from 'src/utils/constants';
import { useUser } from 'src/utils/useUser';


const ItemList = ({ to, label, allow, user }) => {
  if (!checkRoles(allow, user)) return null;
  return (
    <NavItem>
      <NavLink to={to} className="link-light mokoto-font">
        {label}
      </NavLink>
    </NavItem>
  )
}

export const NavBar = (props) => {
  const user = useUser();
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="dark" className="text-white" dark>
        <NavLink to="/" className="me-auto navbar-brand mokoto-font">
          Chapin Market
        </NavLink>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <ItemList to="/" label="Clientes" allow={[ADMIN, CASHIER]} user={user} />
            <ItemList to="/products" label="Productos" allow={[ADMIN]} user={user} />
            <ItemList to="/branches" label="Sucursales" allow={[ADMIN, CASHIER, STORE, INVENTORY]} user={user} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

