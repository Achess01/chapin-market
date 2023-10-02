import { useState, useEffect, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { Button, Badge } from 'reactstrap';
import { validate, validators } from 'validate-redux-form';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { SmallContainer } from 'src/components/Container';
import { InputField, InputNumberField, InputSelect } from 'src/components/AppInput';
import { useUser } from 'src/utils/useUser';
import { createSale, getProductsShelves, getCustomers } from 'src/config/api';


const validateForm = (values) => {
  return validate(values, {
    customer: validators.exists()('Campo requerido'),
    customer_name: validators.exists()('Campo requerido'),
    nit: validators.exists()('Campo requerido'),
    products: [{
      product: validators.exists()('Agregue un producto'),
      qty: validators.number({ min: 1 })('Al menos una unidad'),
    }]

  });
};

export const Sale = () => {
  const user = useUser();
  const profile = user.profile
  const branch = profile.branch ?? -1;

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const onSubmit = async (data) => {
    data.cashierStaff = profile.id;
    data.cashier = profile.cashier;
    data.branch = profile.branch;
    try {
      await createSale({ data, token: user.token });
      Swal.fire({
        icon: 'success',
        title: 'Venta echa',
        showConfirmButton: false,
        timer: 1000
      });
      navigate(`/sales`);
    } catch (error) {
      console.log(error);
      const response = error.response && error.response.data && error.response.data.non_field_errors ? error.response.data.non_field_errors : {}
      const errorMessage = response[0] || '';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage ? errorMessage : error,
      });
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductsShelves({ token: user.token, id: branch });
        setProducts(response);
        const responseCustomers = await getCustomers(user.token);
        const customersFormatted = responseCustomers.map((c) => ({ ...c, label: `${c.name} ${c.last_name}` }))
        setCustomers(customersFormatted);
      } catch (error) {
        setProducts([]);
        setCustomers([]);
      }
    }
    fetchData();
  }, [user, branch]);


  const getPrice = (id, products = []) => {
    console.log(id);
    const product = products.find(p => p.product === id);
    if (product) return product.price
    return 0;
  }

  const getField = (id, values = [], field) => {
    const value = values.find(p => p.id === id);
    if (value) return value[field]
    return null;
  }

  return (
    <SmallContainer className="mt-5 d-flex flex-column align-items-center justify-content-center">
      <h3 className="mokoto-font">Venta</h3>
      <Form
        mutators={{
          ...arrayMutators
        }}
        validate={validateForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, values }) => {
          const productsShelf = values.products || [];
          return (
            <div className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-10 col-lg-8 mx-auto mt-2">
              <form onSubmit={handleSubmit} className="w-100">
                <div className="row mb-3">
                  <div className="col-4">
                    <Field
                      name="customer"
                      render={InputSelect}
                      extraChange={(val) => {
                        const full_name = `${getField(val, customers, 'name')} ${getField(val, customers, 'last_name')}`;
                        form.change('customer_name', full_name);
                        form.change('nit', getField(val, customers, 'nit'));
                      }}
                      placeholder="Cliente"
                      label="Cliente"
                      options={customers}
                      labelKey="label"
                      valueKey="id"
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      name="customer_name"
                      render={InputField}
                      placeholder="Alexander"
                      label="Nombre"
                      readOnly={true}
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      name="nit"
                      render={InputField}
                      placeholder="Cliente"
                      label="Nit"
                      readOnly={true}
                    />
                  </div>
                </div>
                <FieldArray name="products">
                  {({ fields }) => {
                    return (
                      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                        <h3 className="mokoto-font">Productos</h3>
                        <div className="col-2 d-flex align-items-center justify-content-center w-50 mb-4">
                          <Button
                            type="button"
                            color="dark"
                            onClick={() => fields.push({ qty: 1 })}
                          >
                            <i className="bi bi-plus-circle-dotted" /> Agregar producto
                          </Button>
                        </div>
                        <div className="d-flex flex-column">
                          {fields.map((name, index) => (
                            <div className="row my-3" key={name}>
                              <span className="col-1 d-flex align-items-center justify-content-center fw-bold">#{index + 1}</span>
                              <div className="col-4">
                                <Field
                                  name={`${name}.product`}
                                  render={InputSelect}
                                  extraChange={(val) => form.change(`${name}.unit_price`, getPrice(val, products))}
                                  placeholder="Producto"
                                  label="Producto"
                                  options={products}
                                  labelKey="product_name"
                                  valueKey="product"
                                />
                              </div>
                              <div className="col-2">
                                <Field
                                  name={`${name}.qty`}
                                  render={InputNumberField}
                                  placeholder="2 uds."
                                  label="Cantidad"
                                  suffix=" uds."
                                  allowNegative={false}
                                  allowLeadingZeros={false}
                                />
                              </div>
                              <div className="col-2">
                                <Field
                                  name={`${name}.unit_price`}
                                  render={InputNumberField}
                                  decimalScale={2}
                                  placeholder="Q10.00"
                                  label="Precio"
                                  prefix="Q"
                                  allowNegative={false}
                                  readOnly={true}
                                />
                              </div>
                              <div className="col-2 d-flex align-items-end justify-content-center">
                                {productsShelf[index] && productsShelf[index].qty && productsShelf[index].unit_price ? (<strong className='mb-2'>Q{Number(Number(productsShelf[index].qty) * Number(productsShelf[index].unit_price)).toFixed(2)}</strong>) : null}
                              </div>
                              <div className="col-1 d-flex align-items-end justify-content-center">
                                <Button
                                  type="button"
                                  color="danger"
                                  outline
                                  onClick={() => fields.remove(index)}
                                >
                                  <i className="bi bi-dash-circle-fill" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }}
                </FieldArray>
                <div className="row mb-3">
                  <div className="col-9"></div>
                  <div className="col d-flex align-items-center justify-content-center w-100">
                    <strong className='mb-2'>Q{Number(productsShelf.reduce((previousValue, product) => {
                      if (product && product.qty && product.unit_price) {
                        return previousValue + Number(product.qty) * Number(product.unit_price)
                      }
                      return previousValue;
                    }, 0))}</strong>
                  </div>
                  <div className="col-1"></div>
                </div>
                <div className="mt-5 d-flex align-items-center justify-content-center mokoto-font">
                  <Button
                    color="dark"
                    type="submit"
                    disabled={submitting}
                  >
                    Cerrar ventar
                  </Button>
                </div>
              </form>
            </div>

          )
        }
        }
      />
    </SmallContainer >
  );
};
