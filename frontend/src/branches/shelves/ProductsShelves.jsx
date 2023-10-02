import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';
import { useUser } from 'src/utils/useUser';
import { getBranch, getProductsShelves } from 'src/config/api';

export const ProductShelves = () => {
  const user = useUser();
  const { id } = useParams();
  const [branch, setBranch] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await getBranch({ id, token: user.token });
          const dataResponse = await getProductsShelves({ token: user.token, id });
          setBranch(response);
          setData(dataResponse);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });

        } finally {
          setLoading(false);
        }
      }

    }
    fetchData();
  }, [id, user]);

  const fields = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'product_name' },
    { label: 'Cantidad', key: 'qty' },
    { label: 'Pasillo', key: 'hallway' },
  ];

  return (
    <SmallContainer loading={loading}>
      <div className="mt-5">
        <h3 className="mokoto-font">Productos (Pasillos) {branch.name}</h3>
        <Link to={`/branches/${id}/products-shelves/new`} className="btn btn-dark my-3">
          <i className="bi bi-plus-circle-fill" />
        </Link>
        <PaginatedTable data={data} itemsPerPage={5} fields={fields} />
      </div>
    </SmallContainer>
  );
};


