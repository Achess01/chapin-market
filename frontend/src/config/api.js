import Axios from "axios";

const DOMAIN = "http://localhost:8000";
export const USERS = "users";
export const LOGIN = `${USERS}/login`;
export const INITIAL_PASSWORD = `${USERS}/initial_password`;
export const RESET_PASSWORD = `reset_password`;

export const getEndpoint = (path) => {
  return `${DOMAIN}/${path}/`;
};

export const signUpGeneric = async ({ data, token, path }) => {
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
  return await signUpGeneric({ data: {}, token, path });
};

export const signUpUser = async ({ data, token }) => {
  return await signUpGeneric({ data, token, path: USERS });
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
