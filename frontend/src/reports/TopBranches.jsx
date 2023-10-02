import { useEffect, useState } from 'react';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';
import { useUser } from 'src/utils/useUser';
import { getTopBranches } from 'src/config/api';

export const TopBranches = () => {
  const user = useUser();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataResponse = await getTopBranches({ token: user.token });
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
    { label: 'Dirección', key: 'address' },
    { label: 'Total(Q)', key: 'total_sales' },
  ];

  return (
    <SmallContainer loading={loading}>
      <div className="mt-5">
        <h3 className="mokoto-font">Top 3 sucursales</h3>
        <PaginatedTable data={data} fields={fields} />
      </div>
    </SmallContainer>
  );
};


