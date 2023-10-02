import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';

export const Products = () => {
  const { id } = useParams();
  const [branch, setBranch] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = { id: 1, name: "Zona 1", address: "Zona 1, Quetzaltenango, Guatemala" }
        setBranch(data);
      }
    };

    fetchData();
  }, [id]);

  const data = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    // Add more data based on your models
  ];

  const fields = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
  ];

  return (
    <SmallContainer loading={loading}>
      <div className="mt-5">
        <h3 className="mokoto-font">Productos {branch.name}</h3>
        <Link to={`/branches/${id}/products/new`} className="btn btn-dark my-3">
          <i className="bi bi-plus-circle-fill" />
        </Link>
        <PaginatedTable data={data} itemsPerPage={5} fields={fields} />
      </div>
    </SmallContainer>
  );
};


