// PaginatedTable.js
import React, { useState } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';

const PaginatedTable = ({ data, fields, totalPages = 1, actions = false, onEdit = null, onDelete = null }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            {fields.map((field, index) => (
              <th key={index}>{field.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {fields.map((field, index) => (
                <td key={index}>{item[field.key]}</td>
              ))}
              {actions ? (
                <td style={{ width: "20%" }}>
                  <div className="d-flex align-items-centers justify-content-center">
                    {onEdit ? (
                      <Button size="sm" color="dark" className="me-2" onClick={() => onEdit(item.id)}>
                        <i className="bi bi-pencil-square" />
                      </Button>)
                      : null
                    }
                    {onDelete ? (
                      <Button size="sm" color="danger" className="me-2" onClick={() => onDelete(item.id)}>
                        <i className="bi bi-trash3-fill" />
                      </Button>)
                      : null
                    }
                  </div>
                </td>
              ) : null}

            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink previous onClick={() => handlePageClick(currentPage - 1)} />
        </PaginationItem>

        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index} active={index + 1 === currentPage}>
            <PaginationLink onClick={() => handlePageClick(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink next onClick={() => handlePageClick(currentPage + 1)} />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PaginatedTable;
