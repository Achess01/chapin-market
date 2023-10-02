import { Outlet, Navigate } from 'react-router-dom'
import { NavBar } from 'src/components/NavBar';
import { useUser } from 'src/utils/useUser';
import { checkRoles } from 'src/utils/constants';


const PrivateRoutes = ({ allow = [] }) => {
  const user = useUser();

  if (!user || !user.token) return <Navigate to="/login" />
  if (!checkRoles([1, 2, 3, 4], user)) return <Navigate to="/norole" />

  return (
    checkRoles(allow, user) ? (
      <>
        <NavBar />
        <Outlet />
      </>

    ) : <Navigate to="/" />
  )
}

export default PrivateRoutes