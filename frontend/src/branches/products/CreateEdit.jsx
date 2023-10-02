import { useState, useEffect, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router';
import { validate, validators } from 'validate-redux-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import Swal from 'sweetalert2';
import { SmallContainer } from 'src/components/Container';
import { InputNumberField, InputSelect } from 'src/components/AppInput';
import { useUser } from 'src/utils/useUser';
import { getProducts, createProductsStore } from 'src/config/api';


const validateForm = (values) => {
  return validate(values, {
    products: [{
      product: validators.exists()('Agregue un producto'),
      qty: validators.number({ min: 1 })('Al menos una unidad')
    }]

  });
};

export const CreateEdit = () => {
  const user = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const onSubmit = async (data) => {
    if (id) {
      try {
        await createProductsStore({ data, token: user.token, id });
        navigate(`/branches/${id}/products`);
        Swal.fire({
          icon: 'success',
          title: 'Productos agregados',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts(user.token);
        setProducts(response);
      } catch (error) {
        setProducts([]);
      }
    }
    fetchData();
  }, [user]);

  return (
    <SmallContainer className="mt-5 d-flex flex-column align-items-center justify-content-center">
      <h3 className="mokoto-font">Agregar producto</h3>
      <Form
        mutators={{
          ...arrayMutators
        }}
        validate={validateForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting }) => (
          <div className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-10 col-lg-8 mx-auto mt-2">
            <form onSubmit={handleSubmit} className="w-75">
              <FieldArray name="products">
                {({ fields, meta: { error } }) => (
                  <>
                    {/* <span className="invalid-feedback">{error}</span> */}
                    {fields.map((name, index) => (
                      <Fragment key={name}>
                        <div>
                          <span>#{index + 1}</span>
                          <Button className="p-1 ms-3" type="button" color="danger" onClick={() => fields.remove(index)}>
                            <i className="bi bi-x" />
                          </Button>
                        </div>
                        <div className="row mb-3">
                          <div className="col-5">
                            <Field
                              name={`${name}.product`}
                              render={InputSelect}
                              placeholder="Producto"
                              label="Producto"
                              options={products}
                              labelKey="name"
                              valueKey="id"
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={`${name}.qty`}
                              render={InputNumberField}
                              placeholder="2 unidades"
                              label="Cantidad"
                              suffix=" unidades"
                              allowNegative={false}
                              allowLeadingZeros={false}
                            />
                          </div>
                        </div>
                      </Fragment>
                    ))}
                    <Button
                      type="button"
                      color="dark"
                      className="mb-4"
                      onClick={() => fields.push({ qty: 1 })}
                    >
                      <i className="bi bi-plus-circle-dotted" />
                    </Button>
                  </>
                )}
              </FieldArray>


              <div className="d-flex align-items-center justify-content-center mokoto-font">
                <Button
                  color="dark"
                  type="submit"
                  disabled={submitting}
                  block
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>

        )
        }
      />
    </SmallContainer >
  );
};
