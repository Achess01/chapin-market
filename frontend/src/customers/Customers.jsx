import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import PaginatedTable from 'src/components/PaginatedTable';
import Swal from 'sweetalert2';
import { SmallContainer } from 'src/components/Container';
import { getCustomers, deleteCustomer } from 'src/config/api';
import { useUser } from 'src/utils/useUser';

export const Customers = () => {
  const navigate = useNavigate();
  const user = useUser();

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCustomers(user.token);
        setData(response);

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
        setData({});
      }
    }
    fetchData();
  }, [update, user]);


  const fields = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'name' },
    { label: 'Apellido', key: 'last_name' },
    { label: 'Nit', key: 'nit' },
  ];
  const handleEdit = (id) => {
    navigate(`/customers/${id}`)
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer({ id, token: user.token });
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
        <h3 className="mokoto-font">Clientes</h3>
        <Link to="/customers/new" className="btn btn-dark my-3">
          <i className="bi bi-plus-circle-fill" />
        </Link>
        <PaginatedTable data={data} fields={fields} actions={true} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </SmallContainer>
  );
};


