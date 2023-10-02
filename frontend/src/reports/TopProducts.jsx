import { useEffect, useState } from 'react';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';
import { useUser } from 'src/utils/useUser';
import { getTopProducts } from 'src/config/api';

export const TopProducts = () => {
  const user = useUser();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataResponse = await getTopProducts({ token: user.token });
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
    { label: 'Código de barras', key: 'barcode' },
    { label: 'Total(Q)', key: 'total_sales' },
  ];

  return (
    <SmallContainer loading={loading}>
      <div className="mt-5">
        <h3 className="mokoto-font">Top 10 productos</h3>
        <PaginatedTable data={data} fields={fields} />
      </div>
    </SmallContainer>
  );
};


