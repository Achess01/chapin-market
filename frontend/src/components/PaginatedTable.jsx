// PaginatedTable.js
import React, { useState } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';

const PaginatedTable = ({ data, fields, actions = false, onEdit = null, onDelete = null }) => {

  const results = data || [];
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
          {results ? results.map((item, index) => (
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
          )) : null}
        </tbody>
      </Table>
    </div>
  );
};

export default PaginatedTable;
