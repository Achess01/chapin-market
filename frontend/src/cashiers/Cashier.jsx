import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';

export const Cashier = () => {
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/cashiers/${id}`)
    console.log(`Updating item with ID: ${id}`);
  };

  const handleDelete = (id) => {

    console.log(`Deleting item with ID: ${id}`);
  };

  return (
    <SmallContainer>
      <div className="mt-5">
        <h3 className="mokoto-font">Cajeros</h3>
        <Link to="/cashiers/new" className="btn btn-dark my-3">
          <i className="bi bi-plus-circle-fill" />
        </Link>
        <PaginatedTable data={data} itemsPerPage={5} fields={fields} actions={true} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </SmallContainer>
  );
};


