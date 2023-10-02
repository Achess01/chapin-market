import { useState, useEffect, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from 'reactstrap';
import { validate, validators } from 'validate-redux-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { SmallContainer } from 'src/components/Container';
import { InputNumberField, InputSelect } from 'src/components/AppInput';


export const CreateEdit = () => {
  const [products, setProducts] = useState([{ id: 1, qty: 20, value: 1, label: 'tortrix' }, { id: 2, qty: 25, value: 2, label: 'tortrix2' }]);

  const onSubmit = async (values) => {
    console.log('create', values);
  };


  const validateForm = (values) => {
    return validate(values, {
      products: [{
        product: validators.exists()('Agregue un producto'),
        qty: validators.number({ min: 1 })('Al menos una unidad')
      }]

    });
  };

  return (
    <SmallContainer className="mt-5 d-flex flex-column align-items-center justify-content-center">
      <h3 className="mokoto-font">Agregar producto a pasillo</h3>
      <Form
        mutators={{
          ...arrayMutators
        }}
        validate={validateForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting }) => (
          <div className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-10 col-lg-8 mx-auto mt-2">
            <form onSubmit={handleSubmit} className="w-100">
              <FieldArray name="products">
                {({ fields }) => (
                  <>
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
                          <div className="col-3">
                            <Field
                              name={`${name}.hallway`}
                              render={InputNumberField}
                              placeholder="Pasillo 1"
                              label="Pasillo"
                              prefix="Pasillo "
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
