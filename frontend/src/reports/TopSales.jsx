import { useEffect, useState } from 'react';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';
import { useUser } from 'src/utils/useUser';
import { getTopSales } from 'src/config/api';

export const TopSales = () => {
  const user = useUser();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataResponse = await getTopSales({ token: user.token });
        const salesFormatted = dataResponse.map(s => ({ ...s, branch_name: s.branch.name }))
        setData(salesFormatted);
      } catch (error) {
        setData([]);
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
        <h3 className="mokoto-font">Top 10 ventas</h3>
        <PaginatedTable data={data} fields={fields} />
      </div>
    </SmallContainer>
  );
};


