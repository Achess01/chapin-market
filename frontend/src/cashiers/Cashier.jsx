import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';
import { useUser } from 'src/utils/useUser';
import { getCashiers, deleteCashier } from 'src/config/api';


export const Cashier = () => {
  const navigate = useNavigate();
  const user = useUser();

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCashiers(user.token);
        setData(response);
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
    { label: 'Número', key: 'number' },
    { label: 'Sucursal', key: 'branch_name' },
  ];

  const handleEdit = (id) => {
    navigate(`/cashiers/${id}`)
  };

  const handleDelete = async (id) => {
    try {
      await deleteCashier({ id, token: user.token });
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
        <h3 className="mokoto-font">Cajeros</h3>
        <Link to="/cashiers/new" className="btn btn-dark my-3">
          <i className="bi bi-plus-circle-fill" />
        </Link>
        <PaginatedTable data={data} fields={fields} actions={true} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </SmallContainer>
  );
};


