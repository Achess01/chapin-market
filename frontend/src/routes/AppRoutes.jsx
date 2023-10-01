import { Routes, Route } from "react-router";
import { ADMIN, CASHIER, INVENTORY, STORE } from "src/utils/constants";
// Components
import PrivateRoutes from "./PrivateRoutes";
import { Login, Home } from "src/users";
import { Customers, CreateEdit as CreateEditCustomers } from "src/customers";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes allow={[ADMIN, CASHIER, INVENTORY, STORE]} />}>
        <Route element={<Home />} path="/" exact />
      </Route>
      <Route element={<PrivateRoutes allow={[ADMIN, CASHIER]} />}>
        <Route element={<Customers />} path="/customers" exact />
        <Route element={<CreateEditCustomers />} path="/customers/new" exact />
        <Route element={<CreateEditCustomers />} path="/customers/:id" exact />
      </Route>
      <Route element={<Login />} path="/login" exact />
    </Routes>
  )
}