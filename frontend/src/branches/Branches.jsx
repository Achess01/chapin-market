import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';
import { useUser } from 'src/utils/useUser';
import { getBranches, deleteBranch } from 'src/config/api';

export const Branches = () => {
  const navigate = useNavigate();
  const user = useUser();

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBranches(user.token);
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
    { label: 'Dirección', key: 'address' },
  ];

  const handleEdit = (id) => {
    navigate(`/branches/${id}`)
  };

  const handleDelete = async (id) => {
    try {
      await deleteBranch({ id, token: user.token });
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
        <h3 className="mokoto-font">Sucursales</h3>
        <Link to="/branches/new" className="btn btn-dark my-3">
          <i className="bi bi-plus-circle-fill" />
        </Link>
        <PaginatedTable data={data} itemsPerPage={5} fields={fields} actions={true} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </SmallContainer>
  );
};


