import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import { checkRoles } from "src/utils/constants";
import { ADMIN, CASHIER, INVENTORY, STORE, STAFF } from 'src/utils/constants';
import { useUser } from 'src/utils/useUser';
import { LogOutButton } from 'src/users/Logout';


const ItemList = ({ to, label, allow, user }) => {
  if (!checkRoles(allow, user)) return null;
  return (
    <NavItem className="mb-2">
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
        <div className="px-4">
          <span>{user ? `${user.username} (${user.first_name} ${user.last_name})` : ''}</span>
        </div>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <ItemList to="/customers" label="Clientes" allow={[ADMIN, STAFF, CASHIER]} user={user} />
            <ItemList to="/products" label="Productos" allow={[ADMIN, STAFF]} user={user} />
            <ItemList to="/branches" label="Sucursales" allow={[ADMIN, STAFF, STORE, INVENTORY]} user={user} />
            <ItemList to="/users" label="Usuarios" allow={[ADMIN, STAFF]} user={user} />
            <ItemList to="/cashiers" label="Cajas" allow={[ADMIN, STAFF]} user={user} />
            <ItemList to="/sales" label="Ventas" allow={[ADMIN, STAFF, CASHIER]} user={user} />
            <ItemList to="/reports" label="Reportes" allow={[ADMIN, STAFF]} user={user} />
            <NavItem>
              <LogOutButton />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

