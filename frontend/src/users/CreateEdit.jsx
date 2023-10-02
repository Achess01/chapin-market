import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { validate, validators, combine } from 'validate-redux-form';
import { InputField, InputNumberField, InputSelect } from 'src/components/AppInput';
import { SmallContainer } from 'src/components/Container';
import { ADMIN, STORE, INVENTORY, CASHIER } from 'src/utils/constants';


const validateForm = (values) => validate(values, {
  name: validators.exists()("Ingrese el nombre"),
  last_name: validators.exists()("Ingrese el nombre"),
  username: combine(validators.exists()("Ingrese el nit"), validators.length({ min: 9, max: 9 })("El nit es un numero de 9 dígitos")),
  dpi: combine(validators.exists()("Ingrese el dpi"), validators.length({ min: 13, max: 13 })("El nit es un numero de 13 dígitos")),
  date_of_birth: validators.exists()("Ingrese la fecha de nacimiento"),
  role: validators.exists()("Ingrese el nombre"),
  cashier: values && values.role === CASHIER ? validators.exists()("Campo requerido") : null,
});

export const CreateEdit = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const [cashiers, setCashiers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = { title: "esto es un titulo", description: "Esta es una descripcion" }
        setInitialValues(data);
      }
    };

    fetchData();
  }, [id]);

  const onSubmit = async (values) => {

    if (id) {

      console.log('edit', values);
    } else {

      console.log('create', values);
    }


  };

  return (
    <SmallContainer className="mt-5 d-flex flex-column align-items-center justify-content-center">
      <h3 className="mokoto-font">{`${id ? "Editar" : "Crear"} usuario`} </h3>
      <Form
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, values }) => (
          <div className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-10 col-lg-8 mx-auto mt-2">
            <form onSubmit={handleSubmit} className="w-50">
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="username"
                    render={InputNumberField}
                    type="text"
                    placeholder="123456789"
                    label="Usuario (nit)"
                    allowNegative={false}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="name"
                    render={InputField}
                    type="text"
                    placeholder="Alexander"
                    label="Nombre"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="last_name"
                    render={InputField}
                    type="text"
                    placeholder="Tzoc"
                    label="Apellido"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="date_of_birth"
                    render={InputField}
                    type="date"
                    label="Fecha de nacimiento"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="dpi"
                    render={InputNumberField}
                    type="text"
                    placeholder="3233723900801"
                    label="DPI"
                    allowNegative={false}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="role"
                    render={InputSelect}
                    placeholder="Tipo"
                    label="Tipo de usuario"
                    options={[{ value: ADMIN, label: 'Admin' }, { value: CASHIER, label: 'Cajero' }, { value: STORE, label: 'Bodega' }, { value: INVENTORY, label: 'Inventario' }]}
                  />
                </div>
              </div>
              {values.role === CASHIER ? (
                <div className="row mb-3">
                  <div className="col-12">
                    <Field
                      name="cashier"
                      render={InputSelect}
                      placeholder="Caja"
                      label="Caja"
                      options={cashiers}
                    />
                  </div>
                </div>
              ) : null}


              <div className="d-flex align-items-center justify-content-center mokoto-font">
                <Button
                  color="dark"
                  type="submit"
                  disabled={submitting}
                  block
                >
                  {id ? "Editar" : "Agregar"}
                </Button>
              </div>
            </form>
          </div>

        )}
      />
    </SmallContainer>
  );
};
