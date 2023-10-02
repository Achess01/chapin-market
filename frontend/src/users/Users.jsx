import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';
import { useUser } from 'src/utils/useUser';
import { getUsers, deleteUser } from 'src/config/api';

export const Users = () => {
  const navigate = useNavigate();
  const user = useUser();

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers(user.token);
        const formattedResponse = response.map((u) => {
          let role = "";
          if (u.is_admin) role = "Administrador"
          if (u.is_cashierman) role = "Cajero"
          if (u.is_storeman) role = "Bodeguero"
          if (u.is_inventory) role = "Inventario"
          return { ...u, role, branch: u.branch ? u.branch.name : '' }
        })
        setData(formattedResponse);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
        setData([]);
      }
    }
    fetchData();
  }, [update, user]);

  const fields = [
    { label: 'ID', key: 'id' },
    { label: 'Nit', key: 'username' },
    { label: 'Nombre', key: 'first_name' },
    { label: 'Apellido', key: 'last_name' },
    { label: 'Rol', key: 'role' },
    { label: 'Sucursal', key: 'branch' },
  ];

  const handleEdit = (id) => {
    navigate(`/users/${id}`)
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser({ id, token: user.token });
      setUpdate(value => !value);
      Swal.fire({
        icon: 'success',
        title: 'Eliminado con éxito',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      });
    }
  };

  return (
    <SmallContainer>
      <div className="mt-5">
        <h3 className="mokoto-font">Usuarios</h3>
        <Link to="/users/new" className="btn btn-dark my-3">
          <i className="bi bi-plus-circle-fill" />
        </Link>
        <PaginatedTable data={data} itemsPerPage={5} fields={fields} actions={true} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </SmallContainer>
  );
};


