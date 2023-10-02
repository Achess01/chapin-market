import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SmallContainer } from "src/components/Container";
import { useUser } from "src/utils/useUser";
import { checkRoles } from "src/utils/constants";
import { ADMIN, STAFF, INVENTORY, STORE } from "src/utils/constants";
import { getBranch } from "src/config/api";

export const BranchMenu = () => {
  const user = useUser();
  const { id } = useParams();
  const [branch, setBranch] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await getBranch({ id, token: user.token })
          setBranch(response);
        } catch (error) {
          setBranch({});
        }
      }
    };

    fetchData();
  }, [id, user]);
  return (
    <SmallContainer className="d-flex align-items-center justify-content-center flex-column" loading={loading}>
      <div className="mt-5 card w-50 mx-auto py-3 mb-5 shadow">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h4 className="mokoto-font mb-1">
            {branch.name}
            {checkRoles([STAFF, ADMIN], user) ? <Link to={`/branches/${branch.id}/edit`} className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"> <i className="bi bi-pen-fill" /></Link> : null}
          </h4>
          <small>{branch.address}</small>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center w-50 flex-column">
        {checkRoles([STAFF, ADMIN, STORE], user) ? (
          <div
            className="col-6 px-md-3"
          >
            <Link
              to={`/branches/${branch.id}/products`}
              className="mokoto-font branch-cards border border-dark rounded text-decoration-none m-3 py-4 px-3 d-flex flex-column justify-content-center align-items-center"
            >
              <div style={{ height: "2.5rem" }}>
                <i className="bi bi-basket3-fill" />
              </div>
              <span className="mt-3">Productos</span>
            </Link>
          </div>
        ) : null
        }

        {checkRoles([ADMIN, STAFF, INVENTORY], user) ? (
          <div
            className="col-6 px-md-3"
          >
            <Link
              to={`/branches/${branch.id}/products-shelves`}
              className="mokoto-font branch-cards border border-dark rounded text-decoration-none m-3 py-4 px-3 d-flex flex-column justify-content-center align-items-center"
            >
              <div style={{ height: "2.5rem" }}>
                <i className="bi bi-shop" />
              </div>
              <span className="mt-3">Pasillos</span>
            </Link>
          </div>
        ) :
          null
        }


      </div>
    </SmallContainer>
  );
}