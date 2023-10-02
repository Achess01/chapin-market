import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';
import { useUser } from 'src/utils/useUser';
import { getSales } from 'src/config/api';
import { checkRoles } from 'src/utils/constants';
import { CASHIER } from 'src/utils/constants';

export const SalesList = () => {
  const user = useUser();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataResponse = await getSales({ token: user.token });
        const salesFormatted = dataResponse.map(s => ({ ...s, branch_name: s.branch.name }))
        setData(salesFormatted);
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
    fetchData();
  }, [user]);

  const fields = [
    { label: '#', key: 'invoice_no' },
    { label: 'Cliente (nit)', key: 'nit' },
    { label: 'Cliente', key: 'customer_name' },
    { label: 'Sucursal', key: 'branch_name' },
    { label: 'Total (Q)', key: 'total' },
  ];

  return (
    <SmallContainer loading={loading}>
      <div className="mt-5">
        <h3 className="mokoto-font">Ventas</h3>
        {checkRoles([CASHIER], user) ?
          (
            <Link to={`/sales/new`} className="btn btn-dark my-3">
              <i className="bi bi-plus-circle-fill" />
            </Link>
          ) : null
        }
        <PaginatedTable data={data} fields={fields} />
      </div>
    </SmallContainer>
  );
};


