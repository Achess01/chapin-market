import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import { ADMIN, CASHIER, INVENTORY, STORE } from "src/utils/constants";
// Components
import PrivateRoutes from "./PrivateRoutes";
import { Login, Home } from "src/users";
import { Customers, CreateEdit as CreateEditCustomers } from "src/customers";
import { Products, CreateEdit as CreateEditProducts } from "src/products";
import { Branches, CreateEdit as CreateEditBranches, BranchMenu } from "src/branches";

const NoRoleUser = () => {
  return (
    <>
      <h1>Usted no puede ingresar al sistema, consulte con el administrador</h1>
      <Link to="/login">Regresar al login</Link>
    </>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes allow={[ADMIN]} />}>
        <Route element={<Products />} path="/products" exact />
        <Route element={<CreateEditProducts />} path="/products/new" exact />
        <Route element={<CreateEditProducts />} path="/products/:id" exact />
      </Route>
      <Route element={<PrivateRoutes allow={[ADMIN, CASHIER, INVENTORY, STORE]} />}>
        <Route element={<Home />} path="/" exact />
        <Route element={<Branches />} path="/branches" exact />
        <Route element={<BranchMenu />} path="/branches/:id" exact />
        <Route element={<CreateEditBranches />} path="/branches/:id/edit" exact />
      </Route>
      <Route element={<NoRoleUser />} path="/norole" exact />
      <Route element={<PrivateRoutes allow={[ADMIN, CASHIER]} />}>
        <Route element={<Customers />} path="/customers" exact />
        <Route element={<CreateEditCustomers />} path="/customers/new" exact />
        <Route element={<CreateEditCustomers />} path="/customers/:id" exact />
      </Route>
      <Route element={<Login />} path="/login" exact />
    </Routes>
  )
}