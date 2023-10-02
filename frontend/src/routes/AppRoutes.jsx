import { Routes, Route } from "react-router";
import { Link, Navigate } from "react-router-dom";
import { ADMIN, STAFF, CASHIER, INVENTORY, STORE } from "src/utils/constants";
// Components
import PrivateRoutes from "./PrivateRoutes";
import { Login, Home, Users, CreateEditUser } from "src/users";
import { Customers, CreateEdit as CreateEditCustomers } from "src/customers";
import { Products, CreateEdit as CreateEditProducts } from "src/products";
import { Branches, CreateEdit as CreateEditBranches, BranchMenu, CreateEditProductsBranch, ProductsBranch, ProductShelves, CreateEditProductsShelves } from "src/branches";
import { Cashier, CreateEditCashier } from "src/cashiers";
import { Sale, SalesList } from "src/sales";
import { Reports } from "src/reports";
import { useUser } from "src/utils/useUser";

const NoRoleUser = () => {
  return (
    <>
      <h1>Usted no puede ingresar al sistema, consulte con el administrador</h1>
      <Link to="/login">Regresar al login</Link>
    </>
  );
};

export const AppRoutes = () => {
  const user = useUser();
  return (
    <Routes>
      <Route element={<PrivateRoutes allow={[ADMIN, STAFF]} />}>
        <Route element={<Products />} path="/products" exact />
        <Route element={<CreateEditProducts />} path="/products/new" exact />
        <Route element={<CreateEditProducts />} path="/products/:id" exact />
        <Route element={<Users />} path="/users" exact />
        <Route element={<CreateEditUser />} path="/users/new" exact />
        <Route element={<CreateEditUser />} path="/users/:id" exact />
        <Route element={<Cashier />} path="/cashiers" exact />
        <Route element={<CreateEditCashier />} path="/cashiers/new" exact />
        <Route element={<CreateEditCashier />} path="/cashiers/:id" exact />
        <Route element={<Reports />} path="/reports" exact />
      </Route>
      <Route element={<PrivateRoutes allow={[ADMIN, STAFF, CASHIER, INVENTORY, STORE]} />}>
        <Route element={<Home />} path="/" exact />
      </Route>
      <Route element={<PrivateRoutes allow={[ADMIN, STAFF, INVENTORY, STORE]} />}>
        <Route element={<Branches />} path="/branches" exact />
        <Route element={<BranchMenu />} path="/branches/:id" exact />
        <Route element={<CreateEditBranches />} path="/branches/new" exact />
        <Route element={<CreateEditBranches />} path="/branches/:id/edit" exact />
      </Route>
      <Route element={<PrivateRoutes allow={[ADMIN, STAFF, STORE]} />}>
        <Route element={<ProductsBranch />} path="/branches/:id/products" exact />
        <Route element={<CreateEditProductsBranch />} path="/branches/:id/products/new" exact />
      </Route>
      <Route element={<PrivateRoutes allow={[ADMIN, STAFF, INVENTORY]} />}>
        <Route element={<ProductShelves />} path="/branches/:id/products-shelves" exact />
        <Route element={<CreateEditProductsShelves />} path="/branches/:id/products-shelves/new" exact />
      </Route>
      <Route element={<NoRoleUser />} path="/norole" exact />
      <Route element={<PrivateRoutes allow={[ADMIN, STAFF, CASHIER]} />}>
        <Route element={<Customers />} path="/customers" exact />
        <Route element={<CreateEditCustomers />} path="/customers/new" exact />
        <Route element={<CreateEditCustomers />} path="/customers/:id" exact />
        <Route element={<SalesList />} path="/sales" exact />
      </Route>
      <Route element={<PrivateRoutes allow={[CASHIER]} />}>
        <Route element={<Sale />} path="/sales/new" exact />
      </Route>
      <Route element={user && user.token ? <Navigate to="/" /> : <Login />} path="/login" exact />
    </Routes >
  )
}