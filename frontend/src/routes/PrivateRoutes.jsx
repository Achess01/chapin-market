import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { roles } from 'src/utils/constants';
import { NavBar } from 'src/components/NavBar';

const checkRoles = (allow = [], user) => {
  return allow.some((role) => {
    const field = roles[role];
    console.log(field);
    return user[field];
  });
};

const PrivateRoutes = ({ allow = [] }) => {
  // const user = useSelector((state) => state.user.user);
  const user = {
    token: 'token',
    is_admin: true,
  }

  return (
    user && user.token && checkRoles(allow, user) ? (
      <>
        <NavBar />
        <Outlet />
      </>

    ) : <Navigate to="/login" />
  )
}

export default PrivateRoutes