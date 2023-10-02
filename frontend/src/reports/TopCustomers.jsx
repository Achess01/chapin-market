import { useEffect, useState } from 'react';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';
import { useUser } from 'src/utils/useUser';
import { getTopCustomers } from 'src/config/api';

export const TopCustomers = () => {
  const user = useUser();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataResponse = await getTopCustomers({ token: user.token });
        setData(dataResponse);
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const fields = [
    { label: 'Nombre', key: 'name' },
    { label: 'Apellido', key: 'last_name' },
    { label: 'Total(Q)', key: 'total_purchases' },
  ];

  return (
    <SmallContainer loading={loading}>
      <div className="mt-5">
        <h3 className="mokoto-font">Top 10 clientes</h3>
        <PaginatedTable data={data} fields={fields} />
      </div>
    </SmallContainer>
  );
};


