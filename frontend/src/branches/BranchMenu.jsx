import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SmallContainer } from "src/components/Container";

export const BranchMenu = () => {

  const { id } = useParams();
  const [branch, setBranch] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = { id: 1, name: "Zona 1", address: "Zona 1, Quetzaltenango, Guatemala" }
        setBranch(data);
      }
    };

    fetchData();
  }, [id]);
  return (
    <SmallContainer>
      <div className="mt-5 card w-50 mx-auto py-3">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h4 className="mokoto-font mb-1">
            <Link to={`/branches/${branch.id}/edit`} className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{branch.name} <i className="bi bi-pen-fill" /></Link>
          </h4>
          <small>{branch.address}</small>
        </div>
      </div>
    </SmallContainer>
  );
}