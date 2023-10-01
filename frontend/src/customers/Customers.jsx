// YourMainComponent.js
import React from 'react';
import { SmallContainer } from 'src/components/Container';
import PaginatedTable from 'src/components/PaginatedTable';

export const Customers = () => {
  // Sample data for demonstration
  const data = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    // Add more data based on your models
  ];

  const fields = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    // Add more fields based on your models
  ];
  const handleEdit = (id) => {
    // Navigate to the edit page using React Router
    console.log(`Updating item with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement your custom delete logic here
    console.log(`Deleting item with ID: ${id}`);
  };

  return (
    <SmallContainer>
      <div className="mt-5">
        <h3 className="mokoto-font">Customers</h3>
        <PaginatedTable data={data} itemsPerPage={5} fields={fields} actions={true} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </SmallContainer>
  );
};


