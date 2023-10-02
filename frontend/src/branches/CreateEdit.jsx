import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { validate, validators } from 'validate-redux-form';
import { InputField } from 'src/components/AppInput';
import { SmallContainer } from 'src/components/Container';
import { useUser } from 'src/utils/useUser';
import { getBranch, updateBranch, createBranch } from 'src/config/api';
import Swal from 'sweetalert2';

const validateForm = (values) => validate(values, {
  name: validators.exists()("Ingrese el nombre"),
  address: validators.length({ min: 5, max: 20 })("Dirección entre 5 y 20 caracteres"),
});

export const CreateEdit = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { id } = useParams(); // Get the ID parameter from the URL
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data = await getBranch({ id, token: user.token })
          setInitialValues(data);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
          setInitialValues({});
        }
      }
    };

    fetchData();
  }, [id, user]);

  const onSubmit = async (data) => {
    if (id) {
      try {
        await updateBranch({ id, token: user.token, data })
        Swal.fire({
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/branches')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      }
    } else {
      try {
        await createBranch({ token: user.token, data });
        Swal.fire({
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/branches')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      }
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
