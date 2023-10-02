import Axios from "axios";

const DOMAIN = "http://localhost:8000/api";
export const USERS = "users";
export const LOGIN = `${USERS}/login`;
export const INITIAL_PASSWORD = `${USERS}/initial_password`;
export const RESET_PASSWORD = `reset_password`;
export const CUSTOMERS = "customers";
export const PRODUCTS = "products";
export const BRANCHES = "branches";
export const CASHIERS = "cashiers";

export const getEndpoint = (path) => {
  return `${DOMAIN}/${path}/`;
};

export const postGeneric = async ({ data, token, path }) => {
  try {
    const endpoint = getEndpoint(path);
    const response = await Axios.post(endpoint, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteGeneric = async ({ id, token, path }) => {
  try {
    const endpoint = getEndpoint(path) + `${id}/`;
    const response = await Axios.delete(endpoint, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllGeneric = async ({ token, path }) => {
  try {
    const endpoint = getEndpoint(path);
    const response = await Axios.get(endpoint, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateGeneric = async ({ id, token, data, path }) => {
  try {
    const endpoint = `${getEndpoint(path)}${id}/`;
    const response = await Axios.patch(endpoint, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getGeneric = async ({ id, token, path }) => {
  try {
    const endpoint = `${getEndpoint(path)}${id}/`;
    const response = await Axios.get(endpoint, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const resetPassword = async ({ username, token }) => {
  const path = `${USERS}/${username}/${RESET_PASSWORD}`;
  return await postGeneric({ data: {}, token, path });
};

export const signUpUser = async ({ data, token }) => {
  return await postGeneric({ data, token, path: USERS });
};

export const changeInitialPassword = async (data) => {
  try {
    const response = await Axios.post(getEndpoint(INITIAL_PASSWORD), data);
    return response;
  } catch (e) {
    return null;
  }
};

export const getUsers = async (token) => {
  return await getAllGeneric({ token, path: USERS });
};

export const updateUser = async ({ username, token, data }) => {
  return await updateGeneric({ id: username, token, data, path: USERS });
};

export const getUser = async ({ username, token }) => {
  return await getGeneric({ id: username, token, path: USERS });
};

export const deleteUser = async ({ username, token }) => {
  return await deleteGeneric({ id: username, token, path: USERS });
};

// Customers
export const getCustomers = async (token) => {
  return await getAllGeneric({ token, path: CUSTOMERS });
};

export const getCustomer = async ({ id, token }) => {
  return await getGeneric({ id, token, path: CUSTOMERS });
};

export const updateCustomer = async ({ id, token, data }) => {
  return await updateGeneric({ id, token, data, path: CUSTOMERS });
};

export const createCustomer = async ({ data, token }) => {
  return await postGeneric({ data, token, path: CUSTOMERS });
};

export const deleteCustomer = async ({ id, token }) => {
  return await deleteGeneric({ id, token, path: CUSTOMERS });
};

// Products
export const getProducts = async (token) => {
  return await getAllGeneric({ token, path: PRODUCTS });
};

export const getProduct = async ({ id, token }) => {
  return await getGeneric({ id, token, path: PRODUCTS });
};

export const updateProduct = async ({ id, token, data }) => {
  return await updateGeneric({ id, token, data, path: PRODUCTS });
};

export const createProduct = async ({ data, token }) => {
  return await postGeneric({ data, token, path: PRODUCTS });
};

export const deleteProduct = async ({ id, token }) => {
  return await deleteGeneric({ id, token, path: PRODUCTS });
};

// Branches
export const getBranches = async (token) => {
  return await getAllGeneric({ token, path: BRANCHES });
};

export const getBranch = async ({ id, token }) => {
  return await getGeneric({ id, token, path: BRANCHES });
};

export const updateBranch = async ({ id, token, data }) => {
  return await updateGeneric({ id, token, data, path: BRANCHES });
};

export const createBranch = async ({ data, token }) => {
  return await postGeneric({ data, token, path: BRANCHES });
};

export const deleteBranch = async ({ id, token }) => {
  return await deleteGeneric({ id, token, path: BRANCHES });
};

// Cashiers
export const getCashiers = async (token) => {
  return await getAllGeneric({ token, path: CASHIERS });
};

export const getCashier = async ({ id, token }) => {
  return await getGeneric({ id, token, path: CASHIERS });
};

export const updateCashier = async ({ id, token, data }) => {
  return await updateGeneric({ id, token, data, path: CASHIERS });
};

export const createCashier = async ({ data, token }) => {
  return await postGeneric({ data, token, path: CASHIERS });
};

export const deleteCashier = async ({ id, token }) => {
  return await deleteGeneric({ id, token, path: CASHIERS });
};
