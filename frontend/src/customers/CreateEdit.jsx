import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { validate, validators, combine } from 'validate-redux-form';
import { InputField, InputNumberField } from 'src/components/AppInput';
import { SmallContainer } from 'src/components/Container';


const validateForm = (values) => validate(values, {
  name: validators.exists()("Ingrese el nombre"),
  last_name: validators.exists()("Ingrese el nombre"),
  nit: combine(validators.exists()("Ingrese el nit"), validators.length({ min: 9, max: 9 })("El nit es un numero de 9 dígitos"))
});

export const CreateEdit = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [initialValues, setInitialValues] = useState({});

  // Fetch data based on ID when in edit mode
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Fetch your data based on the ID (assuming you have an API)
        const data = { title: "esto es un titulo", description: "Esta es una descripcion" }
        setInitialValues(data);
      }
    };

    fetchData();
  }, [id]);

  const onSubmit = async (values) => {
    // Handle form submission (create or update) based on whether there is an ID
    if (id) {
      // Update data using the ID
      console.log('edit', values);
    } else {
      // Create new data
      console.log('create', values);
    }

    // Handle success or redirection after form submission
  };

  // TODO: Agregar tarjeta (card)
  return (
    <SmallContainer className="mt-5 d-flex flex-column align-items-center justify-content-center">
      <h3 className="mokoto-font">{`${id ? "Editar" : "Crear"} cliente`} </h3>
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
                    name="nit"
                    render={InputField}
                    placeholder="123456789"
                    label="Nit"
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