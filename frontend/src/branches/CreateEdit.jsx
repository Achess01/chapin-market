import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { validate, validators, combine } from 'validate-redux-form';
import { InputField, InputNumberField } from 'src/components/AppInput';
import { SmallContainer } from 'src/components/Container';


const validateForm = (values) => validate(values, {
  name: validators.exists()("Ingrese el nombre"),
  address: validators.exists()("Ingrese el nombre"),
});

export const CreateEdit = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = { name: "esto es un titulo", address: "Esta es una descripcion" }
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
      <h3 className="mokoto-font">{`${id ? "Editar" : "Crear"} Sucursal`} </h3>
      <Form
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting }) => (
          <div className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-10 col-lg-8 mx-auto mt-2">
            <form onSubmit={handleSubmit} className="w-50">
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="name"
                    render={InputField}
                    type="text"
                    placeholder="Zona 1"
                    label="Nombre"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Field
                    name="address"
                    type="text"
                    render={InputField}
                    placeholder="Zona 1, Quetzaltenango, Guatemala"
                    label="Dirección"
                  />
                </div>
              </div>
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
